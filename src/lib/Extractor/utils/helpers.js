import path from 'path'

import { boPrinters } from '../../../utils/printers.js'
import { boExtractModes } from '../modes/mode.js'
import { boFiles } from '../../../utils/files.js'

const boExtractHelpers = {
  readQuery: (pathBaseQueries, queryPath) => {
    const filepath = path.join(pathBaseQueries, queryPath)
    boPrinters.info(`reading ${filepath}`)
    return boFiles.read(filepath)
  },
  readAllQueries: (pathBaseQueries, queries) => {
    return Promise.all(
      queries.map(queryPath => {
        return boExtractHelpers.readQuery(pathBaseQueries, queryPath)
      })
    )
  },
  saveFiles: (name, dataFile, pathBases, data) => {
    return Promise.all(
      dataFile.save.map(mode => {
        return boExtractModes.call(mode).then(modeCallback => {
          return modeCallback(name, dataFile, pathBases, JSON.stringify(data))
        })
      })
    )
  }
}

export { boExtractHelpers }
