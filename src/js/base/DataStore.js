// 数据管理器， 方便在不同的类和方法中访问数据
export class DataStore {
  static getInstance() {
    if (!DataStore.instance) {
      DataStore.instance = new DataStore()
    }
    return DataStore.instance
  }

  constructor() {
    this.dataStore = new Map()
  }

  put(key, val) {
    this.dataStore.set(key, val)
    return this
  }

  get(key) {
    return this.dataStore.get(key)
  }

  destroy() {
    for (let val of this.dataStore.values()) {
      val = null
    }
  }
}
