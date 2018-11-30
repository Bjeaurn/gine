import { Gine } from './core'

export interface IScene {
  tick(delta?: number): void
  frame(): void
  second?(): void
  init?(): void
  destroy(): string | void
}

export class Scene implements IScene {
  static DESTROY_CURRENT_SCENE = 'DESTROY_CURRENT_SCENE'

  constructor() {}

  tick(delta?: number) {}
  frame() {}
  destroy() {
    Gine.sendEvent(Scene.DESTROY_CURRENT_SCENE)
  }
}

export const EMPTY_SCENE: Scene = new Scene()
