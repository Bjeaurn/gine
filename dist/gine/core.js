define(["require", "exports", "./text", "./handle", "./canvas", "./config", "rxjs/Observable", "rxjs/add/operator/map", "rxjs/add/observable/merge", "rxjs/add/observable/interval", "rxjs/add/operator/share"], function (require, exports, text_1, handle_1, canvas_1, config_1, Observable_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Gine = (function () {
        function Gine(config) {
            this.config = config;
            this.fps = 0;
            this.frameCount = 0;
            this.delta = 0;
            this.tickrate = 0;
            this.tickNr = 0;
            this.then = performance.now();
            this.second = performance.now();
            if (this.config.canvas === null) {
                throw new Error("No canvas given!");
            }
            Gine.canvas = new canvas_1.Canvas(this.config.canvas);
            Gine.handle = new handle_1.Handle(Gine.canvas.canvasElm);
            this.fpsMs = 1000 / this.config.maxFps;
            this.tickMs = 1000 / this.config.tickRate;
            Gine.handle.setFont(new text_1.Font('Helvetica', 16));
            Gine.handle.setColor(0, 0, 0, 0.8);
            var ticks = Observable_1.Observable.interval(this.tickMs).map(function () { return 'tick'; });
            var frames = Observable_1.Observable.interval(this.fpsMs).map(function () { return 'frame'; });
            var seconds = Observable_1.Observable.interval(1000).map(function () { return 'second'; });
            this.update$ = Observable_1.Observable.merge(ticks, frames, seconds)
                .share();
        }
        Gine.prototype.start = function () {
            var _this = this;
            this.updateSubscription = this.update$.subscribe(function (t) { return _this.fn(t); });
        };
        Gine.prototype.stop = function () {
            this.updateSubscription.unsubscribe();
        };
        Gine.prototype.fn = function (type) {
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
        Gine.prototype.frame = function () {
            Gine.handle.clear();
            Gine.handle.setColor(0, 0, 0);
            Gine.handle.handle.fillRect(1, 1, config_1.CONFIG.width - 2, config_1.CONFIG.height - 2);
            Gine.handle.setFont(new text_1.Font('Helvetica', 10));
            Gine.handle.setColor(0, 255, 0);
            Gine.handle.text("" + this.fps + 'fps', 5, 16);
            Gine.handle.text("" + this.tickrate + ' tickrate', 5, 40);
            this.frameCount++;
            window.requestAnimationFrame(function () { });
        };
        Gine.prototype.tick = function () {
            this.tickNr++;
            this.delta = (performance.now() - this.then) / 1000;
            this.then = performance.now();
        };
        return Gine;
    }());
    exports.Gine = Gine;
});
//# sourceMappingURL=core.js.map