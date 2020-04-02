// Data Formatter
// Format data and call apropriate parser conditionnaly

const baseUrl = 'https://www.datocms-assets.com'
const imagePath = '/image/dato'
const jsPath = '/js'
// Parser
// { condition, action } --> both methods taking data to parse
//

function arrayParsing(data) {
  return data.map(elem => {
    return dataFormatter(elem)
  })
}

function objectParsing(data) {
  const ret = {}
  // TODO: Refacto, same models as parsers
  // condition by keys ?
  if (data.url) {
    data = urlParsing(data)
  }
  // should always going back through it
  for (const key in data) {
    ret[key] = dataFormatter(data[key], key)
  }
  return ret
}

// here, we're sure that data is an object and data.url exist
function urlParsing(data) {
  // TODO: Refacto, same as
  let url = ''
  if (data.format && data.format === 'js') {
    url = data.url.replace(baseUrl, jsPath)
  } else {
    url = data.url.replace(baseUrl, imagePath)
  }
  return Object.assign(data, { url })
}

// key should not be undefined
// Action according to key, dynamic
function stringParsing(data, key) {
  if (!key || !data) return ''
  return data
  // TODO: Refacto I guess to a more generic way
}

//  Parsers
// :: Array of parsers
//
//
const parsers = [
  {
    cond: data => {
      return Array.isArray(data)
    },
    action: arrayParsing
  },
  {
    cond: data => {
      return typeof data === 'object'
    },
    action: objectParsing
  },
  {
    cond: data => {
      return typeof data === 'string'
    },
    action: stringParsing
  }
]

// TODO: Make an objet with state for each ref
function dataFormatter(data, key = undefined) {
  // TODO: refacto with proper methods
  return parsers.forEach(parser => {
    if (parser.cond(data)) return parser.parse(data, key)
  })
}
