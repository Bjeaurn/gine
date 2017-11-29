define(["require", "exports", "rxjs/Observable", "rxjs/add/operator/filter"], function (require, exports, Observable_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Keyboard = (function () {
        function Keyboard(canvas) {
            var _this = this;
            this.canvas = canvas;
            this.pressed = [];
            var keydown = Observable_1.Observable.fromEvent(document, 'keydown')
                .filter(function (ev) { return !_this.pressed[ev.keyCode]; })
                .map(function (ev) {
                _this.pressed[ev.keyCode] = true;
                return ev;
            });
            var keyup = Observable_1.Observable.fromEvent(document, 'keyup')
                .map(function (ev) {
                _this.pressed[ev.keyCode] = false;
                return ev;
            });
            this.key$ = Observable_1.Observable.merge(keyup, keydown)
                .map(function (ev) {
                return { key: ev.key, type: ev.type };
            });
        }
        return Keyboard;
    }());
    exports.Keyboard = Keyboard;
});
//# sourceMappingURL=keyboard.js.map