import sharp from 'sharp'
import 'regenerator-runtime/runtime'

const minifyLibs = { sharp }

const minifyByExtensions = {
  svg: async data => {
    return data
  },
  png: async data => {
    return data
  },
  jpg: data => {
    return sharp(data)
      .toFormat('jpeg', {
        progressive: true,
        quality: 80,
        optimiseScans: true,
        overshootDeringing: true
      })
      .toBuffer()
  }
}

const emptyMinify = async data => { return data }

function getMinify(extensions) {
  const keys = Object.keys(minifyByExtensions)
  if (!keys.includes(extensions)) {
    return emptyMinify
  }
  return minifyByExtensions[extensions]
}

export { getMinify, minifyLibs }
