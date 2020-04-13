////////////////////////////////
//    CALLBACKS              //
// interact and edit data   //
/////////////////////////////
//
// Global: final callback
// ByQueries: by key matching callbacks in response
// InnerKey: by key matching callbacks recursively in resonse
// Assets: check for asset recursively, check ./assets.js

import { assets } from "./assets";

const defaultCallbacks = {
  global: data => {
    return data;
  },
  byQueries: {},
  innerKey: {}
  // assets
};

const assignCallbacks = callbacks => {
  const newAssets = Object.assign({}, assets, callbacks.assets);
  return Object.assign({}, defaultCallbacks, callbacks, { assets: newAssets });
};
export { assignCallbacks };
