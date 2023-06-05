var gxyyz = {
  baseIteratee: (value) => {
    if (typeof value === 'function') {
      return value
    }
    if (typeof value === 'object') {
      if (Array.isArray(value)) {
        let key = value[0]
        let val = value[1]
        return (obj) => {
          if (typeof obj !== 'object') throw 'formal parameter must be object'
          let state = false
          for (let item in obj) {
            if (item === key && obj[item] === val) state = true
          }
          return state
        }
      } else {
        return (obj) => {
          if (typeof obj !== 'object') throw 'formal parameter must be object'
          let state = true
          for (let [key, val] of Object.entries(value)) {
            if (obj[key] !== val) {
              state = false
              break
            }
          }
          return state
        }
      }
    }
    if (typeof value === 'string') {
      return (obj) => {
        // let set = new Set(Object.keys(obj))
        // if (set.has(value)) return true
        if (obj[value]) return true
        return false
      }
    }
  },
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
        result.push(...item)
      } else {
        result.push(item)
      }
    }
    return result
  },
  difference: (arr, ...args) => {
    let help = new Set(args.flat())
    return arr.filter((item) => !help.has(item))
  },
  differenceBy: function (arr, ...args) {
    if (!Array.isArray(this.last(args))) {
      let iteratee = args.pop()
      let values = args.flat()
      if (typeof iteratee === 'string') {
        let help = new Set(values.map((item) => item[iteratee]))
        return arr.filter((item) => !help.has(item[iteratee]))
      }
      let help = new Set(values.map(iteratee))
      return arr.filter((item) => !help.has(iteratee(item)))
    } else {
      return this.difference(arr, ...args)
    }
  },
  differenceWith: function (arr, ...args) {
    if (!Array.isArray(this.last(args))) {
      let comparator = args.pop()
      args = args.flat()
      return arr.filter((item) => args.reduce((state, arg) => state || comparator(item, arg)), false)
    } else {
      return this.difference(arr, ...args)
    }
  },
  fill: (arr, val, start = 0, end = arr.length) => {
    for (let i = start; i < end; i++) {
      arr.splice(i, 1, val)
    }
    return arr
  },
  drop: (arr, n = 1) => {
    arr.splice(0, n)
    return arr
  },
  dropRight: (arr, n = 1) => {
    arr.splice(-n, n)
    return arr
  },
  dropRightWhile: function (arr, predicate = (val) => val) {
    let count = arr.length - 1
    while (count >= 0) {
      if (!this.baseIteratee(predicate)(arr[count])) break
      count--
    }
    arr.splice(count + 1)
    return arr
  },
  dropWhile: function (arr, predicate = (val) => val) {
    let booleanMap = arr.map((item) => this.baseIteratee(predicate)(item))
    let count = this.findIndex(booleanMap, (val) => !val)
    return this.drop(arr, count)
  },
  findIndex: function (arr, predicate = (val) => val, fromIndex = 0) {
    for (let i = fromIndex; i < arr.length; i++) {
      if (this.baseIteratee(predicate)(arr[i])) return i
    }
    return -1
  },
  findLastIndex: function (arr, predicate = (val) => val, fromIndex = arr.length - 1) {
    for (let i = fromIndex; i >= 0; i--) {
      if (this.baseIteratee(predicate)(arr[i])) return i
    }
    return -1
  },
  flatten: (arr) => arr.flat(),
  flattenDeep: function (arr) {
    let result = []
    arr.forEach((item) => {
      result.push(...(Array.isArray(item) ? this.flattenDeep(item) : [item]))
    })
    return result
  },
  flattenDepth: function (arr, depth = 1) {
    if (depth <= 0) return arr
    let result = []
    arr.forEach((item) => {
      result.push(...(Array.isArray(item) ? this.flattenDepth(item, depth - 1) : [item]))
    })
    return result
  },
  toPairs: (obj) => {
    if (obj instanceof Map || obj instanceof Set) return [...obj.entries()]
    return Object.entries(obj)
  },
  fromPairs: (pairs) =>
    pairs.reduce((result, item) => {
      result[item[0]] = item[1]
      return result
    }, {}),
  head: (arr) => arr[0],
  indexOf: (arr, val, fromIndex = 0) => {
    for (let i = fromIndex < 0 ? arr.length + fromIndex : fromIndex; i < arr.length; i++) {
      if (arr[i] === val) return i
    }
    return -1
  },
  lastIndexOf: (arr, val, fromIndex = arr.length - 1) => {
    for (let i = fromIndex < 0 ? arr.length + fromIndex : fromIndex; i >= 0; i--) {
      if (arr[i] === val) return i
    }
    return -1
  },
  initial: (arr) => {
    if (!arr.length) return arr
    arr.length = arr.length - 1
    return arr
  },
  join: (arr, separator = ',') => arr.reduce((result, item, idx) => (idx == 0 ? result + item : result + separator + item), ''),
  last: (arr) => arr[arr.length - 1],
  pull: (arr, ...args) => {
    let set = new Set(args)
    for (let i = 0; i < arr.length; i++) {
      if (set.has(arr[i])) {
        arr.splice(i, 1)
        i--
      }
    }
    return arr
  },
  reverse: (arr) => {
    let help = arr,
      len = help.length
    arr = []
    for (let i = 0; i < len; i++) {
      arr.push(help.pop())
    }
    return arr
  },
  every: function (arr, foo = (it) => it) {
    let state = true
    for (let item of arr) {
      if (!this.baseIteratee(foo)(item)) state = false
    }
    return state
  },
  some: function (arr, foo = (it) => it) {
    if (this.findIndex(arr, foo) === -1) return false
    return true
  },
  intersection: function (...args) {
    let result = args[0]
    for (let i = 1; i < args.length; i++) {
      let set = new Set(args[i])
      result = result.filter((item) => set.has(item))
    }
    return result
  }
}
