import { DataStore } from './base/DataStore.js'
import { DownPencil } from './runtime/DownPencil.js'
import { UpPencil } from './runtime/UpPencil.js'

// 导演类，控制游戏的逻辑
export class Director {
  constructor() {
    this.dataStore = DataStore.getInstance()
    this.moveSpeed = 2
  }

  static getInstance() {
    if (!Director.instance) {
      Director.instance = new Director()
    }
    return Director.instance
  }

  createPencil() {
    // 随机化高度在[minTop, maxTop]之间
    let minTop = window.innerHeight / 8
    let maxTop = window.innerHeight / 2
    let top = minTop + Math.random() * (maxTop - minTop)
    this.dataStore.get('pencils').push(new UpPencil(top))
    this.dataStore.get('pencils').push(new DownPencil(top))
  }

  birdsEvent() {
    // 绑定事件，触摸一次，让小鸟往上飞一点
    for (let i = 0; i <= 2; i++) {
      this.dataStore.get('birds').y[i] = this.dataStore.get('birds').birdsY[i]
    }
    // 重置重力加速度
    this.dataStore.get('birds').time = 0
  }
  // 检测小鸟是否撞击到地板和铅笔
  check() {
    const birds = this.dataStore.get('birds')
    const land = this.dataStore.get('land')
    if (birds.birdsY[0] + birds.birdsHeight[0] >= land.y) {
      console.log('游戏结束了')
      this.isGameOver = true
      return
    }
  }

  run() {
    this.check()
    if (this.isGameOver) {
      cancelAnimationFrame(this.dataStore.get('timer'))
      this.dataStore.destroy()
    } else {
      this.dataStore.get('background').draw()
      const pencils = this.dataStore.get('pencils')

      // 第一组铅笔移除屏幕左边界
      if (pencils[0].x + pencils[0].width <= 0 && pencils.length === 4) {
        pencils.shift()
        pencils.shift()
      }

      // 创建第二组铅笔, 当一组铅笔的 x 坐标 小于 (屏幕-铅笔宽度) 的一半时
      if (
        pencils[0].x < (window.innerWidth - pencils[0].width) / 2 &&
        pencils.length === 2
      ) {
        this.createPencil()
      }

      this.dataStore.get('pencils').forEach((pencil) => pencil.draw())
      this.dataStore.get('land').draw()
      this.dataStore.get('birds').draw()
      const timer = requestAnimationFrame(() => this.run())
      this.dataStore.put('timer', timer)
    }
  }
}
