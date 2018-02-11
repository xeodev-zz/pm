export default {
  fireParserArray (object) {
    let items = []
    if (typeof object === 'undefined') return items
    let keys = Object.keys(object)
    keys.forEach((key) => {
      let item = object[key]
      item['.key'] = key
      items.push(item)
    })
    return items
  }
}
