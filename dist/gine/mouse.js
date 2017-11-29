define(["require", "exports", "rxjs/Observable", "rxjs/add/observable/fromEvent", "rxjs/add/observable/merge"], function (require, exports, Observable_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Mouse = (function () {
        function Mouse(canvas) {
            var _this = this;
            this.canvas = canvas;
            var mousedown = Observable_1.Observable.fromEvent(this.canvas, 'mousedown');
            var mouseup = Observable_1.Observable.fromEvent(this.canvas, 'mouseup');
            this.mouse$ = Observable_1.Observable.merge(mousedown, mouseup)
                .map(function (ev) {
                _this.lastPosition = _this.getMousePosition(ev);
                return _this.lastPosition;
            });
        }
        Mouse.prototype.getPosition = function () {
            return this.lastPosition;
        };
        Mouse.prototype.getMousePosition = function (ev) {
            return {
                x: Math.round((ev.clientX)),
                y: Math.round((ev.clientY)),
                button: ev.button,
                type: ev.type
            };
        };
        return Mouse;
    }());
    exports.Mouse = Mouse;
});
//# sourceMappingURL=mouse.js.map