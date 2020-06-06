import fs from 'fs'
import * as fse from 'fs-extra'
import { boPrinters } from './printers.js'

// TODO: Do we need this ?

const boFiles = {
  read: filePath => {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, 'utf-8', (err, contents) => {
        if (err) reject(err)
        else resolve(contents)
      })
    })
  },
  write: (filePath, fileData) => {
    return new Promise((resolve, reject) => {
      fse.outputFile(filePath, fileData, err => {
        if (err) reject(err)
        else {
          boPrinters.success(`${filePath} saved`)
          resolve({
            path: filePath,
            content: fileData
          })
        }
      })
    })
  }
}

export { boFiles }
