define(["require", "exports", "./config"], function (require, exports, config_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Handle = (function () {
        function Handle(handle) {
            this.handle = handle;
        }
        Handle.prototype.clear = function () {
            this.handle.clearRect(0, 0, config_1.CONFIG.width, config_1.CONFIG.height);
        };
        Handle.prototype.text = function (value, x, y) {
            this.handle.fillText(value, x, y);
        };
        Handle.prototype.setFont = function (font) {
            this.handle.font = font.toString();
        };
        Handle.prototype.setColor = function (red, green, blue, alpha) {
            if (!alpha)
                alpha = 1.0;
            this.handle.fillStyle = 'rgba(' + red + ',' + green + ',' + blue + ',' + alpha + ')';
        };
        Handle.prototype.draw = function (image, x, y) {
            this.handle.drawImage(image, x, y);
        };
        Handle.prototype.rotateImage = function (image, degrees) {
            if (!degrees)
                degrees = 0;
            var radians = degrees * Math.PI / 180;
        };
        Handle.prototype.resetColor = function () {
            this.setColor(0, 0, 0);
        };
        Handle.prototype.scale = function (scale) {
            this.handle.scale(scale, scale);
        };
        return Handle;
    }());
    exports.Handle = Handle;
});
//# sourceMappingURL=handle.js.map