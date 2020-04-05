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
              const dataCallbacked = boExtractHelpers.callbacksByKeys(
                dataQuery,
                dataFile.callbacks.byQueries
              );
              return dataCallbacked;
              // So... will need to go deeper baby..
              // apply assets callbacks / inner callbacks
            });
          });
          return Promise.all(promisesQueries).then(dataArrays => {
            // TODO: x?? :: option :: merge :: true/false
            function ff (acc, data) { return Object.assign(acc, data) }
            const data = dataArrays.reduce(ff, {});
            console.log('youhou')
            console.log(dataFile.callbacks.global)
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

  ttdownload(dataFileSrc, pathBases) {
    return new Promise((resolve, reject) => {
      const dataFile = assignDataFile(dataFileSrc);
      const callbacks = dataFile.callbacks;
      return boExtractHelpers
        .readAllQueries(pathBases.queries, dataFile.stringQueries)
        .then(queries => {
          return Promise.all(
            dataFile.arrayVariables.map(variables => {
              return Promise.all(
                queries.map(query => {
                  return this.client.request(query, variables);
                })
              ).then(arrayDatas => {
                // TODO: more flexible naming
                const name = variables.locale
                  ? variables.locale + dataFile.payload.filename
                  : dataFile.payload.filename;
                const data = Object.assign({}, ...arrayDatas);
                boCallbacks.execQueries(data, callbacks).then(newData => {
                  const finalData = dataFile.callbacks.global(newData);
                  boExtractHelpers
                    .saveFiles(name, dataFile, pathBases, finalData)
                    .then(res => {
                      resolve(finalData);
                    })
                    .catch(e => {
                      reject(e);
                    });
                });
              });
            })
          );
        });
    });
  }
}

export { Extractor };
