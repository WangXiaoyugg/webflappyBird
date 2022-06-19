import { Sprite } from '../base/Sprite.js'

// 小鸟类，循环的渲染三只小鸟
// 其实是循环渲染图片的三个部分
export class Birds extends Sprite {
  constructor() {
    const img = Sprite.getImage('birds')
    super(img, 0, 0, img.width, img.height, 0, 0, img.width, img.height)
  }
}
