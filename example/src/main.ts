import {
  Gine,
  Config,
  GineAsset,
  Scene,
  DEFAULT_CONFIG,
  IConfigArguments,
  SpriteOptions
} from 'gine'
import { LoadingScene } from './scenes/loading'
import { MainScene } from './scenes/main'
import { filter } from 'rxjs/operators'

const cfg: Config = new Config(
  document.querySelector('#game') as HTMLCanvasElement,
  Object.assign(DEFAULT_CONFIG, {
    width: 600,
    height: 400,
    tickRate: 120
  } as IConfigArguments)
)

const game = new Gine(cfg)

const assets: any[] = [{ name: 'logo', src: 'logo.png' }]
assets.forEach(d => {
  Gine.store.image(d.name, d.src)
})
Gine.store.sprite('player', 'spritesheet-example.png', {
  widthPerImage: 64,
  heightPerImage: 64,
  imagesPerRow: 5,
  numberOfFrames: 9,
  ticksPerFrame: 24
} as SpriteOptions)

const loadingScene = new LoadingScene()
game.changeScene(loadingScene)
game.start()
const mainScene = new MainScene()

Gine.events
  .pipe(filter(ev => ev === Scene.DESTROY_CURRENT_SCENE))
  .subscribe(ev => {
    game.changeScene(mainScene)
  })

Gine.events.subscribe(ev => console.log(ev))
