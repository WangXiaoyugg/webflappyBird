import { ResourcesLoader } from './js/base/ResourcesLoader.js'
export class Main {
  constructor() {
    this.canvas = document.getElementById('game')
    this.ctx = this.canvas.getContext('2d')
    this.resourcesLoader = ResourcesLoader.create()
    this.resourcesLoader.onLoaded((resources) =>
      this.onResourcesLoadedFirst(resources)
    )
  }

  onResourcesLoadedFirst(resources) {
    console.log('resources: ', resources)
  }
}
