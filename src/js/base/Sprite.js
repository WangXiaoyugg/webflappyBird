import { DataStore } from './DataStore.js'

// 精灵的基类， 页面初始化精灵的资源和大小及位置
export class Sprite {
  constructor(img = null, srcX, srcY, srcW, srcH, x, y, width, height) {
    this.dataStore = DataStore.getInstance()
    this.ctx = this.dataStore.ctx
    this.img = img
    this.srcX = srcX
    this.srcY = srcY
    this.srcW = srcW
    this.srcH = srcH
    this.x = x
    this.y = y
    this.width = width
    this.height = height
  }

  static getImage(key) {
    return DataStore.getInstance().resources.get(key)
  }

  draw(
    img = this.img,
    srcX = this.srcX,
    srcY = this.srcY,
    srcW = this.srcW,
    srcH = this.srcH,
    x = this.x,
    y = this.y,
    width = this.width,
    height = this.height
  ) {
    this.ctx.drawImage(img, srcX, srcY, srcW, srcH, x, y, width, height)
  }
}
