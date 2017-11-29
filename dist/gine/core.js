define(["require", "exports", "./text", "./canvas", "./config", "rxjs/Observable", "rxjs/add/operator/map", "rxjs/add/observable/merge", "rxjs/add/observable/interval", "rxjs/add/operator/share"], function (require, exports, text_1, canvas_1, config_1, Observable_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Core = (function () {
        function Core(config) {
            this.config = config;
            this.fps = 0;
            this.frameCount = 0;
            this.delta = 0;
            this.tickrate = 0;
            this.tickNr = 0;
            this.then = performance.now();
            this.second = performance.now();
            this.canvas = new canvas_1.Canvas(document.getElementById(this.config.canvasId));
            this.handle = this.canvas.handle;
            this.fpsMs = 1000 / this.config.maxFps;
            this.tickMs = 1000 / this.config.tickRate;
            this.canvas.handle.setFont(new text_1.Font('Helvetica', 16));
            this.canvas.handle.setColor(0, 0, 0, 0.8);
            var ticks = Observable_1.Observable.interval(this.tickMs).map(function () { return 'tick'; });
            var frames = Observable_1.Observable.interval(this.fpsMs).map(function () { return 'frame'; });
            var seconds = Observable_1.Observable.interval(1000).map(function () { return 'second'; });
            this.update$ = Observable_1.Observable.merge(ticks, frames, seconds)
                .share();
        }
        Core.prototype.start = function () {
            var _this = this;
            this.updateSubscription = this.update$.subscribe(function (t) { return _this.fn(t); });
        };
        Core.prototype.stop = function () {
            this.updateSubscription.unsubscribe();
        };
        Core.prototype.fn = function (type) {
            if (type === 'frame')
                this.frame();
            if (type === 'tick')
                this.tick();
            if (type === 'second') {
                this.fps = this.frameCount;
                this.tickrate = this.tickNr;
                this.frameCount = 0;
                this.tickNr = 0;
            }
        };
        Core.prototype.frame = function () {
            this.handle.clear();
            this.handle.setColor(0, 0, 0);
            this.handle.handle.fillRect(1, 1, config_1.CONFIG.width - 2, config_1.CONFIG.height - 2);
            this.handle.setFont(new text_1.Font('Helvetica', 10));
            this.handle.setColor(0, 255, 0);
            this.handle.text("" + this.fps + 'fps', 5, 16);
            this.handle.text("" + this.tickrate + ' tickrate', 5, 40);
            this.frameCount++;
            window.requestAnimationFrame(function () { });
        };
        Core.prototype.tick = function () {
            this.tickNr++;
            this.delta = (performance.now() - this.then) / 1000;
            this.then = performance.now();
        };
        return Core;
    }());
    exports.Core = Core;
});
//# sourceMappingURL=core.js.map