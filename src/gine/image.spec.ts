import { SpriteAsset } from './image'

describe('SpriteAsset', () => {
    it('should use SpriteOptions config to set the sizeX and sizeY', () => {
        const spriteAsset = new SpriteAsset('test', '', { widthPerImage: 40, heightPerImage: 20 })
        expect(spriteAsset.sizeX).toBe(40)
        expect(spriteAsset.sizeY).toBe(20)
    })
    it('should default the sizeX and sizeY to 0 when no SpriteOptions config', () => {
        const spriteAsset = new SpriteAsset('test', '')
        expect(spriteAsset.sizeX).toBe(0)
        expect(spriteAsset.sizeY).toBe(0)
    })
})
