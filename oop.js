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
