// EXAMPLE
const assets = {
  // key detection, containing the asset url
  key: 'url',
  download: false,
  forceDownload: false,
  keepPath: true,
  replaceUrl: true,
  extensions: {
    js: {
      minify: true,
      path: './js/',
      dataCb: data => { return data },
      sharp: sh => { return sh }
    },
    svg: {
      minify: true,
      path: './img/',
      dataCb: data => { return data },
    },
    jpg: {
      minify: true,
      path: './img',
      dataCb: data => { return data }
    }
  }
}

// TODO: should we add global data for all extensions ? Probably
export { assets }
