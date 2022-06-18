import { Resources } from './Resources.js'

// 资源加载器
export class ResourcesLoader {
  constructor() {
    this.resources = new Map(Resources)
    for (let [key, val] of this.resources) {
      let image = new Image()
      image.src = val
      this.resources.set(key, image)
    }
  }

  onLoaded(callback) {
    let loadedCount = 0
    for (let val of this.resources.values()) {
      val.onload = () => {
        loadedCount++
        if (loadedCount >= this.resources.size) {
          callback(this.resources)
        }
      }
    }
  }

  static create() {
    return new ResourcesLoader()
  }
}
