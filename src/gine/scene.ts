export interface IScene {
  [key: string]: any
  tick(): void
  frame(): void
  second?(): void
  init?(): void
  destroy(): string | void
}

export const SCENE_EMPTY: IScene = {
  tick(): void {},
  frame(): void {},
  second(): void {},
  destroy(): void {},
}
