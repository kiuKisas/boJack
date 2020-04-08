import { newClient } from "../../utils/clients/default.js";
import { boPrinters } from "../../utils/printers";
import { assignDataFile } from "../../default/dataFile/default";
import { boExtractHelpers } from "./utils/helpers";
import { boCallbacks } from "./callbacks/callbacks.js";

class Extractor {
  constructor(api) {
    this.client = newClient(api.url, api.key);
  }

  launch(dataFiles = [{}], pathBases = {}) {
    return new Promise((resolve, reject) => {
      let count = 0;
      const total = dataFiles.length;
      boPrinters.info(`${count} / ${total}`);
      return Promise.all(
        dataFiles.map(dataFile => {
          boPrinters.info(`downloading ${dataFile.name}`);
          return this.download(dataFile, pathBases);
        })
      )
        .then(body => {
          boPrinters.success("Extractor :: DONE");
          resolve(body);
        })
        .catch(e => {
          boPrinters.error(`Extractor ::  ${count} / ${total}`, e);
          reject(e);
        });
    });
  }

  download(dataFileSrc, pathBases) {
    const dataFile = assignDataFile(dataFileSrc);
    return boExtractHelpers
      .allQueries(pathBases.queries, [], dataFile.stringQueries)
      .then(queries => {
        const promisesByVariables = dataFile.arrayVariables.map(variables => {
          const promisesQueries = queries.map(query => {
            // TODO: variables callback ?
            return this.client.request(query, variables).then(dataQuery => {
              const datasCallbacked = boExtractHelpers.callbacksByKeys(
                dataQuery,
                dataFile.callbacks.byQueries
              );
              return datasCallbacked
              // So... will need to go deeper baby..
              // apply assets callbacks / inner callbacks
            });
          });
          return Promise.all(promisesQueries).then(dataArrays => {
            // TODO: x?? :: option :: merge :: true/false
            // function ff (acc, data) { return Object.assign(acc, data) }
            const data = dataArrays.reduce(Object.assign, {});
            const finalData = dataFile.callbacks.global(data);
            return boExtractHelpers.saveFile(
              finalData,
              dataFile.payload,
              pathBases.payload
            );
          });
          return Promise.all(promisesByVariables);
        });
      })
      .catch(e => {
        boPrinters.error(e);
      });
  }

}

export { Extractor };
