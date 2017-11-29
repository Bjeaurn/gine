define(["require", "exports", "./handle", "./config"], function (require, exports, handle_1, config_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Canvas = (function () {
        function Canvas(canvas) {
            var _this = this;
            this.scale = 0;
            window.addEventListener('resize', function (listener) {
                _this.resize();
            });
            this.canvas = canvas;
            this.canvas.oncontextmenu = function () {
                return false;
            };
            this.canvas.onselectstart = function () { return false; };
            this.canvas.onmousedown = function () { return false; };
            this.canvas.width = config_1.CONFIG.width;
            this.canvas.height = config_1.CONFIG.height;
            this.width = config_1.CONFIG.width;
            this.height = config_1.CONFIG.height;
            if (config_1.CONFIG.usesTiles) {
                this.tilesX = Math.round(this.width / config_1.CONFIG.tileSize);
                this.tilesY = Math.round(this.height / config_1.CONFIG.tileSize);
            }
            this._handle = new handle_1.Handle(this.canvas.getContext("2d"));
            this.resize();
        }
        Object.defineProperty(Canvas.prototype, "handle", {
            get: function () {
                return this._handle;
            },
            enumerable: true,
            configurable: true
        });
        Canvas.prototype.clear = function () {
            this.handle.clear();
        };
        Canvas.prototype.resize = function () {
            var width = window.innerWidth;
            var height = window.innerHeight;
            this.scale = Math.min(width / config_1.CONFIG.width, height / config_1.CONFIG.height);
            this.canvas.width = width;
            this.canvas.height = height;
            this.handle.scale(this.scale);
        };
        return Canvas;
    }());
    exports.Canvas = Canvas;
});
//# sourceMappingURL=canvas.js.map