import sharp from 'sharp'

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

function getMinify(extensions) {
  const keys = Object.keys(minifyByExtensions)
  if (!keys.includes(extensions))
    // bad boy
    return d => {
      new Promise((resolve, reject) => {
        resolve(d)
      })
    }
  return minifyByExtensions[extensions]
}

export { getMinify }
