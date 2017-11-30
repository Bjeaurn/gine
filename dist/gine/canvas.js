define(["require", "exports", "./config"], function (require, exports, config_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Canvas = (function () {
        function Canvas(canvas) {
            var _this = this;
            this.scale = 0;
            window.addEventListener('resize', function (listener) {
                _this.resize();
            });
            this.canvasElm = canvas;
            this.canvasElm.oncontextmenu = function () {
                return false;
            };
            this.canvasElm.onselectstart = function () { return false; };
            this.canvasElm.onmousedown = function () { return false; };
            this.canvasElm.width = config_1.CONFIG.width;
            this.canvasElm.height = config_1.CONFIG.height;
            this.width = config_1.CONFIG.width;
            this.height = config_1.CONFIG.height;
            if (config_1.CONFIG.usesTiles) {
                this.tilesX = Math.round(this.width / config_1.CONFIG.tileSize);
                this.tilesY = Math.round(this.height / config_1.CONFIG.tileSize);
            }
            this.resize();
        }
        Canvas.prototype.resize = function () {
            var width = window.innerWidth;
            var height = window.innerHeight;
            this.scale = Math.min(width / config_1.CONFIG.width, height / config_1.CONFIG.height);
            this.canvasElm.width = width;
            this.canvasElm.height = height;
        };
        return Canvas;
    }());
    exports.Canvas = Canvas;
});
//# sourceMappingURL=canvas.js.map