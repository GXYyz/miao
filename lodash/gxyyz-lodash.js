var gxyyz = {
  // base function
  baseIteratee: (value, returnType = 'boolean') => {
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
      if (returnType === 'boolean') {
        return (obj) => {
          if (obj[value]) return true
          return false
        }
      } else if (returnType === 'beKey') {
        return (obj) => obj[value]
      } else if (returnType === 'run') {
        return (obj) => eval(`'${obj}'.${value}`)
      }
    }
  },
  baseObjectPush: (obj, key, val, type = 'val') => {
    if (type === 'array') {
      if (!obj[key]) {
        obj[key] = [val]
      } else obj[key].push(val)
    } else if (type === 'count') {
      if (!obj[key]) {
        obj[key] = 1
      } else obj[key]++
    } else {
      obj[key] = val
    }
  },
  // base function

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
      let help = new Set(values.map((item) => this.baseIteratee(iteratee, 'beKey')(item)))
      return arr.filter((item) => !help.has(this.baseIteratee(iteratee, 'beKey')(item)))
    } else {
      return this.difference(arr, ...args)
    }
  },
  differenceWith: function (arr, ...args) {
    let comparator = args.pop()
    args = args.flat()
    return arr.filter((item) => !args.reduce((state, arg) => state || comparator(item, arg)), false)
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
  pullAll: (arr, vals) => gxyyz.pull(arr, ...vals),
  pullAllBy: function (arr, vals, iteratee) {
    let set = new Set(vals.map((item) => this.baseIteratee(iteratee, 'beKey')(item)))
    for (let i = 0; i < arr.length; i++) {
      if (set.has(this.baseIteratee(iteratee, 'beKey')(arr[i]))) {
        arr.splice(i, 1)
        i--
      }
    }
    return arr
  },
  pullAllWith: function (arr, vals, comparator) {
    for (let i = 0; i < arr.length; i++) {
      if (vals.reduce((state, item) => state || comparator(item, arr[i]), false)) {
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
  },
  intersectionBy: function (...args) {
    let iteratee = args.pop()
    let result = args[0]
    for (let i = 1; i < args.length; i++) {
      let set = new Set(args[i].map((item) => this.baseIteratee(iteratee, 'beKey')(item)))
      result = result.filter((item) => set.has(this.baseIteratee(iteratee, 'beKey')(item)))
    }
    return result
  },
  intersectionWith: function (...args) {
    let iteratee = args.pop()
    let compare = args.pop()
    return this.flatten(args.map((item) => item.filter((item1) => compare.reduce((state, item2) => state || iteratee(item1, item2), false))))
  },
  nth: (arr, n = 0) => (n < 0 ? arr[arr.length + n] : arr[n]),
  countBy: function (...args) {
    let iteratee = args.pop()
    let result = {}
    args.flat().forEach((item) => {
      this.baseObjectPush(result, this.baseIteratee(iteratee, 'run')(item), null, 'count')
    })
    return result
  },
  groupBy: function (...args) {
    let iteratee = args.pop()
    let result = {}
    args.flat().forEach((item) => {
      this.baseObjectPush(result, this.baseIteratee(iteratee, 'run')(item), item, 'array')
    })
    return result
  },
  keyBy: function (collection, iteratee) {
    let result = {}
    for (let item in collection) {
      this.baseObjectPush(result, this.baseIteratee(iteratee, 'beKey')(collection[item]), Array.isArray(collection) ? collection[item] : { item: collection[item] })
    }
    return result
  },
  forEach: function (collection, iteratee = (val) => val) {
    for (let item in collection) {
      iteratee(collection[item], item, collection)
    }
  },
  map: function (collection, iteratee = (val) => val) {
    let result = []
    for (let item in collection) {
      result.push(this.baseIteratee(iteratee, 'beKey')(collection[item]))
    }
    return result
  },
  filter: function (collection, predicate = (val) => val) {
    let result = []
    for (let item in collection) {
      if (this.baseIteratee(predicate)(collection[item])) result.push(collection[item])
    }
    return result
  },
  reduce: function (collection, iteratee = (val) => val, accumulator) {
    let initialVal = accumulator === undefined ? this.head(Object.values(collection)) : accumulator
    for (let item in collection) {
      initialVal = iteratee(initialVal, collection[item], item)
    }
    return initialVal
  },
  reduceRight: function (collection, iteratee = (val) => val, accumulator) {
    let initialVal = accumulator === undefined ? this.last(Object.values(collection)) : accumulator
    let keys = this.reverse(Object.keys(collection))
    this.forEach(keys, (item) => {
      initialVal = iteratee(initialVal, collection[item], item)
    })
    return initialVal
  },
  sortedIndex: (array, value) => {
    let start = 0
    let end = array.length
    let index
    let sub
    while (true) {
      // 区间没有变化时停止循环
      if (end - start == sub) break
      sub = end - start
      index = (sub >> 1) + start
      if (array[index] < value) {
        start = index
      } else {
        end = index
      }
    }

    if (array[index] < value) {
      return index + 1
    } else {
      return index
    }
  },
  sortedIndexBy: function (array, value, iteratee = (it) => it) {
    iteratee = this.baseIteratee(iteratee, 'beKey')
    let start = 0
    let end = array.length
    let index
    let sub
    while (true) {
      if (end - start == sub) break
      sub = end - start
      index = (sub >> 1) + start
      if (iteratee(array[index]) < iteratee(value)) {
        start = index
      } else {
        end = index
      }
    }

    if (iteratee(array[index]) < iteratee(value)) {
      return index + 1
    } else {
      return index
    }
  },
  sortedIndexOf: function (array, value) {
    let index = this.sortedIndex(array, value)
    if (array[index] == value) return index
    return -1
  },
  sortedLastIndex: (array, value) => {
    let start = 0
    let end = array.length
    let index
    let sub
    while (true) {
      if (end - start == sub) break
      sub = end - start
      index = (sub >> 1) + start
      if (array[index] > value) {
        end = index
      } else {
        start = index
      }
    }

    if (array[index] > value) {
      return index
    } else {
      return index + 1
    }
  },
  sortedLastIndexBy: function (array, value, iteratee = (it) => it) {
    iteratee = this.baseIteratee(iteratee, 'beKey')
    let start = 0
    let end = array.length
    let index
    let sub
    while (true) {
      if (end - start == sub) break
      sub = end - start
      index = (sub >> 1) + start
      if (iteratee(array[index]) > iteratee(value)) {
        end = index
      } else {
        start = index
      }
    }

    if (iteratee(array[index]) > iteratee(value)) {
      return index
    } else {
      return index + 1
    }
  },
  sortedLastIndexOf: function (array, value) {
    let index = this.sortedLastIndex(array, value) - 1
    if (array[index] == value) return index
    return -1
  },
  sortedUniq: (array) => {
    return Array.from(new Set(array))
  },
  sortedUniqBy: function (array, iteratee = (it) => it) {
    iteratee = this.baseIteratee(iteratee)
    let result = []
    let set = new Set()
    for (let item of array) {
      let val = iteratee(item)
      if (!set.has(val)) {
        set.add(val)
        result.push(item)
      }
    }
    return result
  },
  tail: (array) => {
    return array.slice(1)
  },
  take: (array, n = 1) => {
    return array.slice(0, n)
  },
  takeRight: (array, n = 1) => {
    return array.slice(array.length - n < 0 ? 0 : array.length - n)
  },
  takeRightWhile: function (array, predicate = (it) => it) {
    return array.slice(array.findLastIndex((item) => !this.baseIteratee(predicate)(item)) + 1)
  },
  takeWhile: function (array, predicate = (it) => it) {
    return array.slice(
      0,
      array.findIndex((item) => !this.baseIteratee(predicate)(item))
    )
  },
  union: function (...args) {
    return Array.from(new Set(this.flattenDeep(args)))
  },
  unionBy: function (...args) {
    let iteratee = this.baseIteratee(args.pop(), 'beKey')
    let set = new Set()
    let result = []
    args = this.flattenDeep(args)
    for (let item of args) {
      let p = iteratee(item)
      if (!set.has(p)) {
        set.add(p)
        result.push(item)
      }
    }
    return result
  },
  unionWith: function (...args) {
    let comparator = args.pop()
    let result = args[0]
    for (let i = 1; i < args.length; i++) {
      let arr = args[i]
      result.push(...arr.filter((item) => !result.reduce((state, arg) => state || comparator(item, arg), false)))
    }
    return result
  },
  uniq: (arr) => Array.from(new Set(arr)),
  uniqBy: function (arr, iteratee = (it) => it) {
    let iterator = this.baseIteratee(iteratee)
    let result = []
    let set = new Set()
    for (let item of arr) {
      let arg = iterator(item, 'beKey')
      if (!set.has(arg)) {
        set.add(arg)
        result.push(item)
      }
    }
    return result
  },
  uniqWith: function (arr, comparator) {
    let result = arr.slice(0, 1)
    for (let i = 1; i < arr.length; i++) {
      if (!result.reduce((state, arg) => state || comparator(arr[i], arg), false)) {
        result.push(arr[i])
      }
    }
    return result
  },
  unzip: (arr) => {
    let result = Array(arr[0].length)
      .fill([])
      .map((item) => item.slice())
    for (let i = 0; i < result.length; i++) {
      for (let j = 0; j < arr.length; j++) {
        result[i].push(arr[j][i])
      }
    }
    return result
  },
  unzipWith: (arr, iteratee) => {
    let result = []
    for (let i = 0; i < arr[0].length; i++) {
      let item = []
      for (let j = 0; j < arr.length; j++) {
        item.push(arr[j][i])
      }
      result.push(iteratee(...item))
    }
    return result
  },
  parseJSON: function (str) {
    let i = 0
    return parseValue()

    function parseValue() {
      if (str[i] === '{') {
        return parseObject()
      }
      if (str[i] === '[') {
        return parseArray()
      }
      if (!isNaN(Number(str[i]))) {
        return parseNumber()
      }
      if (str[i] === '"') {
        return parseString()
      }
      if (str[i] === 't') {
        i += 4
        return true
      }
      if (str[i] === 'f') {
        i += 5
        return false
      }
      if (str[i] === 'n') {
        i += 4
        return null
      }
    }
    function parseObject() {
      let obj = {}
      i++ // 跳过{
      while (true) {
        let key = parseString()
        i += 2 // 跳过"和:
        let val = parseValue()
        obj[key] = val
        if (str[i] === ',') {
          i++
          continue // 如果是逗号,忽略本次循环
        }
        if (str[i] === '}') {
          i++
          break // 如果是},结束循环
        }
      }
      return obj
    }
    function parseArray() {
      let arr = []
      i++ //
      while (true) {
        let item = parseValue()
        arr.push(item)
        if (str[i] === ',') {
          i++
          continue // 如果是逗号,忽略本次循环
        }
        if (str[i] === ']') {
          i++
          break // 如果是},结束循环
        }
      }
      return arr
    }
    function parseString() {
      i++ //跳过"
      let start = i
      while (true) {
        // 需要报错
        if (str[i] === '"') break
        i++
      }
      return str.slice(start, i)
    }
    function parseNumber() {
      let start = i
      while (true) {
        i++
        if (isNaN(Number(str[i])) && str[i] !== '.') break
      }
      return Number(str.slice(start, i))
    }
  }
}
