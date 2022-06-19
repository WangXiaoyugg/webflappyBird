import { Sprite } from '../base/Sprite.js'
import { Director } from '../Director.js'
export class Pencil extends Sprite {
  constructor(img, top) {
    super(
      img,
      0,
      0,
      img.width,
      img.height,
      window.innerWidth,
      0,
      img.width,
      img.height
    )
    this.top = top
  }

  draw() {
    this.x = this.x - Director.getInstance().moveSpeed
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
