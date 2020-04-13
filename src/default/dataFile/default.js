// DataFile
// -------
//
// Content all data and options for one payload file
//

import { payload } from "./inner/payload";
import { assignCallbacks } from "./inner/callbacks";

const defaultDataFile = {
  name: "undefined",
  // Queries to Fetch
  stringQueries: [],
  // Variables for each queries
  arrayVariables: [{}]
  // payload,
  // callbacks,
};

const assignDataFile = dataFileSrc => {
  const newPayload = Object.assign({}, payload, dataFileSrc.payload);
  const newCallbacks = assignCallbacks(dataFileSrc.callbacks);
  return Object.assign({}, defaultDataFile, dataFileSrc, {
    callbacks: newCallbacks,
    payload: newPayload
  });
};

export { assignDataFile };
