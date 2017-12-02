var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var assetFolder = 'assets';
    var Asset = (function () {
        function Asset(name, src) {
            var _this = this;
            this.type = 'Asset';
            this.imageLoaded = false;
            this.image = new Image();
            this.image.src = assetFolder + '/' + src;
            this.image.onload = function () {
                _this.imageLoaded = true;
                _this.width = _this.image.width;
                _this.height = _this.image.height;
            };
        }
        Asset.prototype.draw = function () { };
        Asset.prototype.update = function () { };
        return Asset;
    }());
    exports.Asset = Asset;
    var ImageAsset = (function (_super) {
        __extends(ImageAsset, _super);
        function ImageAsset(name, src, options) {
            var _this = _super.call(this, name, src) || this;
            _this.type = 'Image';
            return _this;
        }
        ImageAsset.prototype.draw = function () { };
        ImageAsset.prototype.update = function () { };
        return ImageAsset;
    }(Asset));
    exports.ImageAsset = ImageAsset;
    var SpriteAsset = (function (_super) {
        __extends(SpriteAsset, _super);
        function SpriteAsset(name, src, options) {
            var _this = _super.call(this, name, src) || this;
            _this.type = 'Sprite';
            _this.numberOfFrames = 1;
            _this.ticksPerFrame = 0;
            _this.frameIndex = 0;
            _this.numberOfFrames = options.numberOfFrames || 1;
            _this.ticksPerFrame = options.ticksPerFrame || 0;
            _this.frameIndex = options.frameIndex || 0;
            return _this;
        }
        SpriteAsset.prototype.draw = function () {
        };
        SpriteAsset.prototype.update = function () { };
        return SpriteAsset;
    }(Asset));
    exports.SpriteAsset = SpriteAsset;
    var ImageOptions = (function () {
        function ImageOptions() {
        }
        return ImageOptions;
    }());
    exports.ImageOptions = ImageOptions;
    var SpriteOptions = (function (_super) {
        __extends(SpriteOptions, _super);
        function SpriteOptions(widthPerImage, heightPerImage, numberOfFrames, ticksPerFrame, frameIndex) {
            var _this = _super.call(this) || this;
            _this.widthPerImage = widthPerImage;
            _this.heightPerImage = heightPerImage;
            _this.numberOfFrames = numberOfFrames;
            _this.ticksPerFrame = ticksPerFrame;
            _this.frameIndex = frameIndex;
            return _this;
        }
        return SpriteOptions;
    }(ImageOptions));
    exports.SpriteOptions = SpriteOptions;
});
//# sourceMappingURL=image.js.map