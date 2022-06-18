import { ResourcesLoader } from './js/base/ResourcesLoader.js'
import { Background } from './js/runtime/Background.js'
export class Main {
  constructor() {
    this.canvas = document.querySelector('#game')
    this.ctx = this.canvas.getContext('2d')
    const loader = ResourcesLoader.create()
    loader.onLoaded((resources) => this.onResourcesLoadedFirst(resources))
  }

  onResourcesLoadedFirst(resources) {
    // console.log('resources: ', resources)
    let background = new Background(this.ctx, resources.get('background'))
    background.draw()
  }
}
