import { Sprite } from '../base/Sprite.js'
import { DataStore } from '../base/DataStore.js'
export class Pencil extends Sprite {
  constructor(img, top) {
    super(
      img,
      0,
      0,
      img.width,
      img.height,
      DataStore.getInstance().canvas.width,
      0,
      img.width,
      img.height
    )
    this.top = top
    this.moveSpeed = 2
  }

  draw() {
    this.x = this.x - this.moveSpeed
    super.draw(
      this.img,
      0,
      0,
      this.img.width,
      this.img.height,
      this.x,
      this.y,
      this.width,
      this.height
    )
  }
}
