import { boExtractHelpers } from './helpers'

const boDig = {
  array: data => {
    return data.map(d => {
      return parser(d);
    });
  },
  object: (data, callbacks = {}) => {
    return boExtractHelpers.callbackByKeys(data, callbacks)
  },
  // string: (data, callback) => {
  //  return data;
  //}
};

// TODO: If needed, merge boDig with user callbacks
// TODO: Multi-thread :: should we add a mulitthread option for parsing ? 
const parser = (data, callbacks) => {
  switch (data) {
    case Array.isArray(data):
      return boDig.array(dat);
      break;
    case typeof data === "object":
      return boDig.object(data, callbacks.objet);
      break;
   // case typeof data === "string":
   //   return boDig.string(data, callbacks.string);
   //   break;
    default:
      return data;
  }
};
const defaultCallbacks = { object: {} };

const boRecDeeper = {
  deeper: (data, callbacks = defaultCallbacks) => {
    return parser(data);
  }
};

export { boRecDeeper };
