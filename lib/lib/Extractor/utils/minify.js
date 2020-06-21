import sharp from 'sharp'
import 'regenerator-runtime/runtime'

const minifyByExtensions = {
  svg: data => {
    return data
  },
  png: data => {
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

export { getMinify }
