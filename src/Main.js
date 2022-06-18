import { DataStore } from './js/base/DataStore.js'
import { ResourcesLoader } from './js/base/ResourcesLoader.js'
import { Director } from './js/Director.js'
import { Background } from './js/runtime/Background.js'
import { Land } from './js/runtime/Land.js'
export class Main {
  constructor() {
    this.canvas = document.querySelector('#game')
    this.ctx = this.canvas.getContext('2d')
    const loader = ResourcesLoader.create()
    this.dataStore = DataStore.getInstance()
    loader.onLoaded((resources) => this.onResourcesLoadedFirst(resources))
  }

  onResourcesLoadedFirst(resources) {
    this.dataStore.ctx = this.ctx
    this.dataStore.resources = resources
    this.init()
  }

  init() {
    this.dataStore.put('background', Background).put('land', Land)

    Director.getInstance().run()
  }
}
