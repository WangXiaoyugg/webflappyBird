// 计分器类
import { DataStore } from '../base/DataStore.js'
export class Score {
  constructor() {
    this.ctx = DataStore.getInstance().ctx
    this.scoreNumber = 0
    // canvas 的刷新频率很快，需要一个标志位控制是否可以加分
    this.isScore = true
  }

  draw() {
    this.ctx.font = '25px Arial'
    this.ctx.fillStyle = '#ffcbca'
    this.ctx.fillText(
      this.scoreNumber,
      window.innerWidth / 2,
      window.innerHeight / 18,
      1000
    )
  }
}
