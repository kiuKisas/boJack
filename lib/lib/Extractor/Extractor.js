import { newClient } from '../../utils/clients/default.js'
import { boPrinters } from '../../utils/printers'
import { assignOutputConfig } from '../../default/outputConfig/default'
import { boExtractHelpers } from './utils/helpers'
import { getAssetCallback } from './utils/assets'
import { recDeeper } from './utils/deeper'

import 'regenerator-runtime/runtime'

// TODO: are we sure about a class here ?

function makeInnerCallback(innerCb, assets, pathBases) {
  const assetsCb = getAssetCallback(assets, pathBases.assets)
  return Object.assign({}, innerCb, assetsCb)
}

class Extractor {
  constructor(api) {
    this.client = newClient(api.url, api.key)
  }

  async launch(outputConfigs = [{}], pathBases = {}) {
    const downloads = outputConfigs.map(outputConfig => {
      return this.download(outputConfig, pathBases)
    })
    return Promise.all(downloads).catch(e => {
      boPrinters.error(`Extractor::`, e)
    })
  }

  async download(outputConfigSrc, pathBases) {
    const outputConfig = assignOutputConfig(outputConfigSrc)
    const innerCallback = makeInnerCallback(
      outputConfig.callbacks.innerCallback,
      outputConfig.assets,
      pathBases
    )
    return boExtractHelpers
      .allQueries(pathBases.queries, [], outputConfig.stringQueries)
      .then(queries => {
        const promisesByVariables = outputConfig.arrayVariables.map(async variables => {
          const promisesQueries = queries.map(async query => {
            // TODO: variables callback ?
            return this.client.request(query, variables).then(async dataQuery => {
              // TODO: too much for nothing
              const data = boExtractHelpers.callbacksByKeys(
                dataQuery,
                outputConfig.callbacks.byQueries
              )
              const doRec = Object.keys(innerCallback).length > 0
              return doRec ? await recDeeper(innerCallback, data) : data
            })
          })
          return Promise.all(promisesQueries).then(dataArrays => {
            const data = boExtractHelpers.arraysToObj(dataArrays)
            const finalData = outputConfig.callbacks.global(data)
            if (outputConfig.payload.save.includes('variables')) {
              return boExtractHelpers.saveFile(finalData, outputConfig.payload, pathBases.payload, variables).then(res => {
                return { path: res.path, content: finalData}
              })
            } else {
              return finalData
            }
          })
        })
        return Promise.all(promisesByVariables).then(allData => {
          if (outputConfig.payload.save.includes('all')) {
            const lastCbData = outputConfig.callbacks.afterVariables(allData)
            const fullData = boExtractHelpers.arraysToObj(lastCbData)
            return boExtractHelpers.saveFile(fullData, outputConfig.payload, pathBases.payload).then(res => {
              return { path: res.path, content: fullData }
            })
          }
          return allData
        })
      })
      .catch(e => {
        boPrinters.error(e)
      })
  }
}

export { Extractor }
