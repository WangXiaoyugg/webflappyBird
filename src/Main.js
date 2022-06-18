import { DataStore } from './js/base/DataStore.js'
import { ResourcesLoader } from './js/base/ResourcesLoader.js'
import { Director } from './js/Director.js'
import { Background } from './js/runtime/Background.js'
export class Main {
  constructor() {
    this.canvas = document.querySelector('#game')
    this.ctx = this.canvas.getContext('2d')
    const loader = ResourcesLoader.create()
    this.dataStore = DataStore.getInstance()
    loader.onLoaded((resources) => this.onResourcesLoadedFirst(resources))
  }

  onResourcesLoadedFirst(resources) {
    // console.log('resources: ', resources)
    this.dataStore.ctx = this.ctx
    this.dataStore.resources = resources
    this.init()

    // let background = new Background(this.ctx, resources.get('background'))
    // background.draw()
  }

  init() {
    this.dataStore.put(
      'background',
      new Background(
        this.dataStore.ctx,
        this.dataStore.resources.get('background')
      )
    )
    Director.getInstance().run()
  }
}
