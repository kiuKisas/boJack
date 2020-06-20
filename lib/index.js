import { boHelpers } from './utils/helpers.js'
import { defaultConfig } from './default/config.js'
import { Extractor } from './lib/Extractor/Extractor.js'

// TODO: should even not be a class, let's see how things going on..
class BoJack {
  constructor(api, config = {}) {
    this.config = Object.assign(defaultConfig, config)
    this.extractor = new Extractor(api)
  }

  async start(outputConfigs) {
    return boHelpers.arrayValidator(outputConfigs).then(datas => {
      const config = boHelpers.parsePathBases(this.config)
      return this.extractor.launch(datas, config)
    })
  }
}

export default BoJack
