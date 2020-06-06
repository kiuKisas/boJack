////////////////////////////////
//    CALLBACKS              //
// interact and edit data   //
/////////////////////////////
//
// Global: final callback
// ByQueries: by key matching callbacks in response
// InnerKey: by key matching callbacks recursively in resonse

const defaultCallbacks = {
  global: data => {
    return data
  },
  byQueries: {},
  innerKey: {}
}

const assignCallbacks = (callbacks = {}) => {
  return Object.assign({}, defaultCallbacks, callbacks)
}
export { assignCallbacks }
