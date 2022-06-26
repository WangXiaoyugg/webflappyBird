/**
 * 处理全局性和游戏一次性的逻辑
 */

import { DataStore } from './js/base/DataStore.js'
import { ResourcesLoader } from './js/base/ResourcesLoader.js'
import { Director } from './js/Director.js'
import { Birds } from './js/player/Birds.js'
import { Score } from './js/player/Score.js'
import { StartButton } from './js/player/StartButton.js'
import { Background } from './js/runtime/Background.js'
import { Land } from './js/runtime/Land.js'
export class Main {
  constructor() {
    this.canvas = wx.createCanvas()
    this.ctx = this.canvas.getContext('2d')
    const loader = ResourcesLoader.create()
    this.dataStore = DataStore.getInstance()
    this.director = Director.getInstance()
    loader.onLoaded((resources) => this.onResourcesLoadedFirst(resources))
  }

  onResourcesLoadedFirst(resources) {
    this.dataStore.canvas = this.canvas;
    this.dataStore.ctx = this.ctx
    this.dataStore.resources = resources
    this.createBackgroundMusic()
    this.init()
  }

  init() {
    // 游戏是否结束
    this.director.isGameOver = false

    this.dataStore
      .put('pencils', [])
      .put('background', Background)
      .put('land', Land)
      .put('birds', Birds)
      .put('startButton', StartButton)
      .put('score', Score)
    // 注册事件监听
    this.registerEvent()

    this.director.createPencil()
    this.director.run()
  }

  // 创建背景音乐
  createBackgroundMusic() {
    const bgm = wx.createInnerAudioContext()
    bgm.src = '/audio/bgm.mp3'
    bgm.play();
  }

  registerEvent() {
  
    wx.onTouchStart((result) => {
      if (this.director.isGameOver) {
        console.log('重新开始！')
        this.init()
      } else {
        // 执行鸟儿事件
        this.director.birdsEvent()
      }
    })
  }
}
