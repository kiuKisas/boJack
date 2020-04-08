const assets = {
  key: 'url',
  download: true,
  replaceUrl: true,
  keepPath: true,
  skipMinify: ['png'],
  paths: {
    // default './'
    js: './js/'
  },
  callbacks: {
    default: () , 
    extensions: {}
  }
}

export { assets }
