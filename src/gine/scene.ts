export interface Scene {
  [key: string]: any
  tick(): void
  frame(): void
  second?(): void
  init?(): void
  destroy(): string | void
}

export const SCENE_EMPTY: Scene = {
  tick(): void {},
  frame(): void {},
  second(): void {},
  destroy(): void {},
}
