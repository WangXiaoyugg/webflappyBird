import { Sprite } from '../base/Sprite.js'
import { Pencil } from './Pencil.js'
import { DataStore } from '../base/DataStore.js'

export class UpPencil extends Pencil {
  constructor(top) {
    const img = Sprite.getImage('pencilUp')
    super(img, top)
  }

  draw() {
    this.y = this.top - this.height
    super.draw()
  }
}
