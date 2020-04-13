const extension = url => {
  const urlArray = url.split('.')
  return urlArray[urlArray.length - 1]
}

const extensionCb = (callbacks, cbKeys, url, data) => {
  return boExtractHelpers.callbackByKey(extension(url), { url, data }, callbacks, cbKeys)
}

const boAssets = {
  makeCallback: dataAssets => {
    const ret = {}
    const extKeys = Object.keys(dataAssets.extensions)
    ret[dataAssets.key] = extensionCb.bind(dataAssets.extensions).bind(extKeys)
    return ret
  },
}

export boAssets
