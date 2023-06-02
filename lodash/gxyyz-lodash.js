var gxyyz = {
  chunk: function (arr, length) {
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
  }
}
