// 精灵的基类， 页面初始化精灵的资源和大小及位置
export class Sprite {
  constructor(
    ctx = null,
    img = null,
    srcX,
    srcY,
    srcW,
    srcH,
    x,
    y,
    width,
    height
  ) {
    this.ctx = ctx
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

  draw() {
    this.ctx.drawImage(
      this.img,
      this.srcX,
      this.srcY,
      this.srcW,
      this.srcH,
      this.x,
      this.y,
      this.width,
      this.height
    )
  }
}
