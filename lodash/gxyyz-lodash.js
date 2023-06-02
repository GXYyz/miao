var gxyyz = {
  chunk: (arr, length) => {
    let result = []
    for (let i = 0; i < arr.length; i += length) {
      let help = []
      for (let j = 0; j < length; j++) {
        if (!arr[i + j]) break
        help.push(arr[i + j])
      }
      result.push(help)
    }
    return result
  },
  compact: (arr) => {
    let result = []
    arr.forEach((item) => {
      if (item) result.push(item)
    })
    return result
  },
  concat: (arr, ...args) => {
    let result = arr
    for (let item of args) {
      if (Array.isArray(item)) {
        result.concat(item)
      } else {
        result.push(item)
      }
    }
    return result
  }
}
