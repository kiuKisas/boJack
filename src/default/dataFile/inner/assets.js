const assets = {
  // key detection, containing the asset url
  key: "url",
  download: true,
  // replace url by
  // Example:
  //   https://dev.io/path/script.js
  //     -->
  //   path/to/assets/path/script.js
  //
  replaceUrl: true,
  keepPath: true,
  // not implemented yet
  minify: ["js", "svg"],
  paths: {
    // default './'
    js: "./js/"
  },
  extensions: {
    js: (url, data) => { url, data },
    svg: (url, data) => { url, data }
  }
};

export { assets };
