import { ResourcesLoader } from './js/base/ResourcesLoader.js'
import { Director } from './js/Director.js'
export class Main {
  constructor() {
    this.canvas = document.querySelector('#game')
    this.ctx = this.canvas.getContext('2d')
    const loader = ResourcesLoader.create()
    loader.onLoaded((resources) => this.onResourcesLoadedFirst(resources))

    Director.getInstance()
    Director.getInstance()
    Director.getInstance()
  }

  onResourcesLoadedFirst(resources) {
    console.log('resources: ', resources)
  }
}
