import 'regenerator-runtime/runtime'

const assets = {
  // key detection, containing the asset url
  key: 'url',
  download: false,
  directory: '.',
  save: {
    file: {
      forceDownload: false,
      keepUrlPath: true,
      replaceUrl: true,
      replaceCallback: async data => { return data }
    },
    payload: false
  },
  extensions: {
    js: {
      minify: true,
      path: './js/',
      // callback :: (data, minifier) -> access to minifier
      callback: async data => {
        return data
      }
    },
    svg: {
      minify: true,
      path: './img/',
      callback: undefined
    },
    jpg: {
      minify: true,
      path: './img'
    }
  }
}

export { assets }
