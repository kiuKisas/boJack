import * as xa from 'xa'

const watermark = 'BoJack :: '

const boPrinters = {
  info: content => {
    xa.info(watermark + content)
  },
  success: content => {
    xa.success(watermark + content)
  },
  error: (msg, err) => {
    xa.error(watermark + msg + err)
  }
}

export { boPrinters }
