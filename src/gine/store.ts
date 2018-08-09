import { ImageAsset, ImageOptions } from "./image";

export class Store {
  private database: { [key: string]: any } = [];

  constructor() {}

  store(key: string, val: any): void {
    this.database[key] = val;
  }

  get(key: string): any | undefined {
    return this.database[key];
  }

  image(key: string, src: string, options?: ImageOptions): void {
    const img = new ImageAsset(key, src, options);
    this.store(key, img);
  }
}
