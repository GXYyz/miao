class Vector {
  constructor(x, y) {
    this.x = x
    this.y = y
  }
  plus(vector) {
    let x = this.x + vector.x
    let y = this.y + vector.y
    return new Vector(x, y)
  }
  minus(vector) {
    let x = this.x - vector.x
    let y = this.y - vector.y
    return new Vector(x, y)
  }
  get length() {
    return Math.sqrt(this.x ** 2 + this.y ** 2)
  }
}

class Complex {
  constructor(real, imag) {
    this.real = real
    this.imag = imag
  }
  static plus(a, b) {
    let real = a.real + b.real
    let imag = a.imag + b.imag

    return new Complex(real, imag)
  }
  static minus(a, b) {
    let real = a.real - b.real
    let imag = a.imag - b.imag

    return new Complex(real, imag)
  }
  static mul(a, b) {
    let real = a.real * b.real - a.imag * b.imag
    let imag = a.real * b.imag + a.imag * b.real

    return new Complex(real, imag)
  }
  static div(a, b) {
    let helper = new Complex(b.real, -b.imag)
    let up = Complex.mul(a, helper)
    let down = Complex.mul(b, helper)
    let real = up.real / down.real
    let imag = up.imag / down.real

    return new Complex(real, imag)
  }
  plus(c) {
    let real = this.real + c.real
    let imag = this.imag + c.imag
    return new Complex(real, imag)
  }
  minus(c) {
    let real = this.real - c.real
    let imag = this.imag - c.imag
    return new Complex(real, imag)
  }
  mul(c) {
    let real = this.real * c.real - this.imag * c.imag
    let imag = this.real * c.imag + this.imag * c.real
    return new Complex(real, imag)
  }
  div(c) {
    let helper = new Complex(c.real, -c.imag)
    let up = this.mul(helper)
    let down = c.mul(helper) // down的虚部应该是0
    let real = up.real / down.real
    let imag = up.imag / down.real
    return new Complex(real, imag)
  }
}

class LinkedList {
  #length = 0
  constructor(...initVals) {
    this.head = null
    this.tail = null
    for (let item of initVals) {
      this.append(item)
    }
  }
  // 尾增
  append(val) {
    let node = { val, next: null }
    if (!this.head) {
      this.head = this.tail = node
      this.#length++
      return
    } else {
      this.tail.next = node
      this.tail = node
      this.#length++
      return
    }
  }
  // 尾减
  pop() {
    if (!this.tail) return false
    if (this.head === this.tail) {
      this.head = this.tail = null
      this.#length--
      return true
    }
    let dummy = this.head
    while (dummy.next) {
      if (!dummy.next.next) {
        dummy.next = null
        this.tail = dummy
        this.#length--
        return true
      }
      dummy = dummy.next
    }
  }
  // 头增
  prepend(val) {
    let node = { val, next: this.head }
    this.head = node
    this.#length++
    return
  }
  // 头减
  shift() {
    if (!this.tail) return false
    if (this.head === this.tail) {
      this.head = this.tail = null
      this.#length--
      return true
    }
    let dummy = this.head.next
    this.head.next = null
    this.head = dummy
    this.#length--
    return true
  }
  at(idx) {
    if (idx > this.#length - 1) return
    let p = this.head
    while (idx > 0) {
      p = p.next
      idx--
    }
    return p.val
  }
  get size() {
    return this.#length
  }
}

class Stack {
  #size = 0
  constructor() {
    this.stack = new LinkedList()
  }
  push(val) {
    this.stack.append(val)
    this.#size++
    return this
  }
  pop() {
    let tailVal = this.stack.tail.val
    if (this.stack.pop()) {
      this.#size--
      return tailVal
    }
    return false
  }
  get size() {
    return this.#size
  }
}

class Queue {
  #size = 0
  constructor() {
    this.queue = new LinkedList()
  }
  add(val) {
    this.queue.append(val)
    this.#size++
    return this
  }
  pop() {
    let headVal = this.queue.head.val
    if (this.queue.shift()) {
      this.#size--
      return headVal
    }
    return false
  }
  get size() {
    return this.#size
  }
}

class MyMap {
  #keys = []
  #vals = []
  set(key, val) {
    let keyIdx = this.#keys.indexOf(key)
    if (keyIdx === -1) {
      this.#keys.push(key)
      this.#vals.push(val)
    } else {
      this.#vals[keyIdx] = val
    }
    return this
  }
  get(key) {
    let keyIdx = this.#keys.indexOf(key)
    if (keyIdx !== -1) {
      return this.#vals[keyIdx]
    }
    return
  }
  has(key) {
    return this.#keys.includes(key)
  }
  delete(key) {
    let keyIdx = this.#keys.indexOf(key)
    if (keyIdx === -1) return false
    this.#keys.splice(keyIdx, 1)
    this.#vals.splice(keyIdx, 1)
    return true
  }
  get size() {
    return this.#keys.length
  }
}

class MySet {
  constructor() {
    this.set = new MyMap()
  }
  add(val) {
    this.set.set(val, val)
  }
  remove(val) {
    this.set.delete(val)
  }
  has(val) {
    return this.set.has(val)
  }
  delete(val) {
    return this.set.delete(val)
  }
  get size() {
    return this.set.size
  }
}

class PriorityQueue {
  constructor(initials = [], predicate = (it) => it) {
    if (typeof predicate !== 'function') {
      throw new TypeError('predicate must be a function, got: ' + predicate)
    }

    this.heap = []
    this._predicate = predicate

    for (let item of initials) {
      this.push(item)
    }
  }

  push(val) {
    this.heap.push(val)
    this._heapUp(this.heap.length - 1)
    return this.heap
  }
  pop() {
    if (this.heap.length === 0) return undefined
    if (this.heap.length === 1) return this.heap.pop()

    let result = this.heap[0]
    let item = this.heap.pop()
    this.heap[0] = item
    this._heapDown(0)

    return result
  }
  // 查看堆顶元素
  peek() {
    return this.heap[0]
  }
  get size() {
    return this.heap.length
  }

  _swap(i, j) {
    let p = this.heap[i]
    this.heap[i] = this.heap[j]
    this.heap[j] = p
  }
  _heapDown(pos) {
    // let predicate = this._predicate
    let predicate = (it) => it
    let position = pos
    let leftPos = pos * 2 + 1
    let rightPos = pos * 2 + 2

    if (leftPos < this.heap.length && predicate(this.heap[position]) < predicate(this.heap[leftPos])) {
      position = leftPos
    }
    if (rightPos < this.heap.length && predicate(this.heap[position]) < predicate(this.heap[rightPos])) {
      position = rightPos
    }

    if (position !== pos) {
      this._swap(pos, position)
      this._heapDown(position)
    }
  }
  _heapUp(pos) {
    if (pos === 0) return
    let predicate = this._predicate
    let parentPos = (pos - 1) >> 1
    if (predicate(this.heap[pos]) > predicate(this.heap[parentPos])) {
      this._swap(pos, parentPos)
      this._heapUp(parentPos)
    }
  }

  static heapDown(heap, pos, stop = heap.length) {
    while (true) {
      let position = pos
      let leftPos = position * 2 + 1
      let rightPos = position * 2 + 2
      if (leftPos < stop && heap[position] < heap[leftPos]) {
        position = leftPos
      }
      if (rightPos < stop && heap[position] < heap[rightPos]) {
        position = rightPos
      }
      if (position !== pos) {
        let p = heap[position]
        heap[position] = heap[pos]
        heap[pos] = p
        pos = position
      } else break
    }
  }
  // 堆排序
  static heapSort(array) {
    let heap = new PriorityQueue()
    for (let item of array) {
      heap.push(item)
    }
    let result = []
    while (heap.size > 0) {
      result.push(heap.pop())
    }
    return result
  }
  // 乱序数组堆化
  static heapify(array) {
    let heapDown = PriorityQueue.heapDown
    let start = (array.length - 1) >> 1
    for (let i = start; i >= 0; i--) {
      heapDown(array, i)
    }
    return array
  }
  // 就地数组堆排序
  static heapSortLoc(array) {
    PriorityQueue.heapify(array)

    let heapDown = PriorityQueue.heapDown
    for (let i = array.length - 1; i > 0; i--) {
      let p = array[i]
      array[i] = array[0]
      array[0] = p
      heapDown(array, 0, i)
    }
    return array
  }
}
