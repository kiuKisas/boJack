import 'regenerator-runtime/runtime'

const assets = {
  // key detection, containing the asset url
  key: 'url',
  download: false,
  directory: '.',
  // TODO: separate replace Value and File save 
  // TODO
  // Manage save assets and value replacements. Let's see with a third options how we can managed
  // that, options to replaces with everything;
  // e.g.: 
  // {
  //  url: {
  //   file: filepath,
  //   content: Buffer,
  //   s3: s3URL
  //  }
  // }
  save: {
    file: {
      forceDownload: false,
      keepUrlPath: true,
      replaceUrl: true,
      // TODO: replaceCallback, should be general ?
      replaceCallback: async data => { return data }
    },
    payload: false,
  },
  // if filepath and doesn't save file, keep it as it
  // if several value, make an object
  // ['all']
  replaceValue: ['filepath', 'content'],
  //
  // EXTENSIONS
  //
  ignoreExtensions: ['avi', 'pdf'],
  multiplesExtensions: [
    {
      extensions: [ 'mp4', 'mp3' ],
      options: {
        minify: true, // per extensions
        path: 'others',
        // ...
      }
    }
  ],
  extensions: {
    js: {
      minify: true,
      path: './js/',
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
