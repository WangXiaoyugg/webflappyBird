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

  // 检测小鸟模型和 铅笔模型是否碰撞
  static isStrike(bird, pencil) {
    let isHit = false

    // 反逻辑， 在正常区域内默认未碰撞
    if (
      bird.top > pencil.bottom ||
      bird.bottom < pencil.top ||
      bird.left > pencil.right ||
      bird.right < pencil.left
    ) {
      isHit = true
    }
    return !isHit
  }

  // 检测小鸟是否撞击到地板和铅笔
  check() {
    const birds = this.dataStore.get('birds')
    const land = this.dataStore.get('land')
    const pencils = this.dataStore.get('pencils')
    const score = this.dataStore.get('score')

    // 撞到地板了
    if (birds.birdsY[0] + birds.birdsHeight[0] >= land.y) {
      console.log('游戏结束了')
      this.isGameOver = true
      return
    }

    // 撞到水管了
    // 小鸟边框模型
    const birdsBorder = {
      top: birds.y[0],
      bottom: birds.birdsY[0] + birds.birdsHeight[0],
      left: birds.birdsX[0],
      right: birds.birdsX[0] + birds.birdsWidth[0],
    }

    const length = pencils.length
    for (let i = 0; i < length; i++) {
      const pencil = pencils[i]
      const pencilBorder = {
        top: pencil.y,
        bottom: pencil.y + pencil.height,
        left: pencil.x,
        right: pencil.x + pencil.width,
      }

      if (Director.isStrike(birdsBorder, pencilBorder)) {
        console.log('撞到水管了')
        this.isGameOver = true
        return
      }
    }

    // 加分逻辑
    if (birds.birdsX[0] > pencils[0].x + pencils[0].width && score.isScore) {
      score.isScore = false
      score.scoreNumber++
    }
  }

  run() {
    this.check()
    if (this.isGameOver) {
      this.dataStore.get('startButton').draw()
      cancelAnimationFrame(this.dataStore.get('timer'))
      this.dataStore.destroy()
    } else {
      this.dataStore.get('background').draw()
      const pencils = this.dataStore.get('pencils')

      // 第一组铅笔移除屏幕左边界
      if (pencils[0].x + pencils[0].width <= 0 && pencils.length === 4) {
        pencils.shift()
        pencils.shift()
        this.dataStore.get('score').isScore = true
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
      this.dataStore.get('score').draw()

      const timer = requestAnimationFrame(() => this.run())
      this.dataStore.put('timer', timer)
    }
  }
}
