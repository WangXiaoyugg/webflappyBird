// 导演类，控制游戏的逻辑
export class Director {
  constructor() {
    console.log('Director init...!')
  }

  static getInstance() {
    if (!Director.instance) {
      Director.instance = new Director()
    }
    return Director.instance
  }
}
