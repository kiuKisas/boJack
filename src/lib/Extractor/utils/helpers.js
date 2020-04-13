import path from "path";

import { boPrinters } from "../../../utils/printers.js";
import { boHelpers } from "../../../utils/helpers.js";
import { boFiles } from "../../../utils/files.js";

const boExtractHelpers = {
  readQuery: (pathBaseQueries, queryPath) => {
    const filepath = path.join(pathBaseQueries, queryPath);
    boPrinters.info(`reading ${filepath}`);
    return boFiles.read(filepath);
  },
  saveFile: (data, dataPayload, pathBase) => {
    // Your callback, your responsability
    const filename = dataPayload.nameCallback(dataPayload, data)
    const payloadPath = path.join(pathBase, dataPayload.directory, filename)
    return boFiles.write(payloadPath, JSON.stringify(data))
  },

  allQueries(pathBasesQueries, stringQueries, filesQueries) {
    return boHelpers.arrayValidator(filesQueries).then(validatedQueries => {
      const queriesPromises = validatedQueries.map(stringQuery => {
        return boExtractHelpers.readQuery(pathBasesQueries, stringQuery);
      });
      return Promise.all(queriesPromises).then(newQueries => {
        return stringQueries.concat(newQueries);
      });
    })
  },
  // More general.. should move to root helper
  callbackByKey(key, data, callbacks = {}, cbKeys = []) {
    if (cbKeys.includes(key)) {
      return callbacks[key](data);
    } else return data
  },
  callbacksByKeys(data, callbacks = {}) {
    // Your callbacks is your responsability.
    const keys = Object.keys(data);
    const cbKeys = Object.keys(callbacks)
    const dataCallbacked = {};
    keys.forEach(key => {
      if (cbKeys.includes(key)) {
        dataCallbacked[key] = callbacks[key](data[key]);
      }
    });
    // Board effect, if we need a clean data, don't hesitate to use:
    // return Object.assign({}, data, dataCallbacked)
    // Cheers :)
    return Object.assign(data, dataCallbacked);
  }
};

export { boExtractHelpers };
