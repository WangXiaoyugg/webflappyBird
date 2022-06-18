import { ResourcesLoader } from './js/base/ResourcesLoader.js'
export class Main {
  constructor() {
    this.canvas = document.querySelector('#game')
    this.ctx = this.canvas.getContext('2d')
    const loader = ResourcesLoader.create()
    loader.onLoaded((resources) => this.onResourcesLoadedFirst(resources))

    let image = new Image()
    image.src = './res/background.png'
    image.onload = () => {
      this.ctx.drawImage(
        image,
        400,
        300,
        image.width,
        image.height,
        0,
        300,
        image.width,
        image.height
      )
    }
  }

  onResourcesLoadedFirst(resources) {
    console.log('resources: ', resources)
  }
}
