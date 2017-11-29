define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Text = (function () {
        function Text(handle, text, font) {
            this.handle = handle;
            this.text = text;
            this.font = font;
        }
        return Text;
    }());
    exports.Text = Text;
    var Font = (function () {
        function Font(fontFamily, fontSize) {
            this.fontFamily = fontFamily;
            this.fontSize = fontSize;
            if (!this.fontFamily)
                this.fontFamily = 'Helvetica';
            if (!this.fontSize)
                this.fontSize = 12;
        }
        Font.prototype.toString = function () {
            return this.fontSize + 'px ' + this.fontFamily;
        };
        return Font;
    }());
    exports.Font = Font;
    exports.fontDefault = new Font();
});
//# sourceMappingURL=text.js.map