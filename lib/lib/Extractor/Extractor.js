import { newClient } from '../../utils/clients/default.js'
import { boPrinters } from '../../utils/printers'
import { assignOutputConfig } from '../../default/outputConfig/default'
import { boExtractHelpers } from './utils/helpers'
import { getAssetCallback } from './utils/assets'
import { recDeeper } from './utils/deeper'
import fetch from 'node-fetch'

import 'regenerator-runtime/runtime'

// TODO: are we sure about a class here ?

function makeInnerCallback(innerCb, assets, pathBases) {
  const assetsCb = getAssetCallback(assets, pathBases.assets)
  return Object.assign({}, innerCb, assetsCb)
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

class Extractor {
  constructor(api) {
    this.client = newClient(api.url, api.key)
    this.url = api.url
  }

  async gqlFetch(query, variables, callbacks, innerCallback, retry = 0) {
    // TODO: variables callback ?
    return this.client
      .request(query, variables)
      .then(async (dataQuery) => {
        // TODO: too much for nothing
        const data = boExtractHelpers.callbacksByKeys(dataQuery, callbacks)
        const doRec = Object.keys(innerCallback).length > 0
        return doRec ? await recDeeper(innerCallback, data) : data
      })
      .catch(async (error) => {
        if (retry < 10 && error.response.status === 429) {
          console.log('ERORR 429 !! Dirty Fix incoming..')
          await delay(10000)
          return this.gqlFetch(
            query,
            variables,
            callbacks,
            innerCallback,
            retry + 1
          )
        } else {
          return error
        }
      })
  }

  async launch(outputConfigs = [{}], pathBases = {}) {
    const downloads = outputConfigs.map((outputConfig) => {
      return this.download(outputConfig, pathBases)
    })
    return Promise.all(downloads).catch((e) => {
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
      .then((queries) => {
        const promisesByVariables = outputConfig.arrayVariables.map(
          async (variables) => {
            let promisesQueries = []
            if (outputConfig.type === 'gql') {
              const promiseQuery = async (query) =>
                this.gqlFetch(
                  query,
                  variables,
                  outputConfig.callbacks.byQueries,
                  innerCallback
                )
              promisesQueries = queries.map(promiseQuery)
            } else if (outputConfig.type === 'get') {
              promisesQueries = [
                fetch(this.url + variables.url, { method: 'GET' })
                  .then((res) => res.json())
                  .then(async (json) => {
                    const data = boExtractHelpers.callbacksByKeys(
                      json,
                      outputConfig.callbacks.byQueries
                    )
                    const doRec = Object.keys(innerCallback).length > 0
                    return doRec ? await recDeeper(innerCallback, data) : data
                  }),
              ]
            }
            return Promise.all(promisesQueries).then((dataArrays) => {
              const data = boExtractHelpers.arraysToObj(dataArrays)
              const finalData = outputConfig.callbacks.global(data)
              if (outputConfig.payload.save.includes('variables')) {
                // TODO: rename and make it clearer
                const splitted =
                  outputConfig.payload.callbacks.split !== undefined
                    ? // TODO: reverses variables and finalData
                      outputConfig.payload.callbacks.split(finalData, variables)
                    : [{ data: finalData, variables }]
                return Promise.all(
                  splitted.map(async (split) => {
                    return boExtractHelpers
                      .saveFile(
                        split.data,
                        outputConfig.payload,
                        pathBases.payload,
                        split.variables
                      )
                      .then((res) => {
                        return { path: res.path, content: finalData }
                      })
                  })
                )
              } else {
                return [finalData]
              }
            })
          }
        )
        return Promise.all(promisesByVariables).then((allData) => {
          const flatData = allData.flat()
          if (outputConfig.payload.save.includes('all')) {
            const lastCbData = outputConfig.callbacks.afterVariables(flatData)
            const fullData = boExtractHelpers.arraysToObj(lastCbData)
            return boExtractHelpers
              .saveFile(fullData, outputConfig.payload, pathBases.payload)
              .then((res) => {
                return { path: res.path, content: fullData }
              })
          }
          return flatData
        })
      })
      .catch((e) => {
        boPrinters.error(e)
      })
  }
}

export { Extractor }
