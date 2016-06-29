"use strict";
var Sampler2D_1 = require("awayjs-core/lib/image/Sampler2D");
var Vector3D_1 = require("awayjs-core/lib/geom/Vector3D");
var URLLoader_1 = require("awayjs-core/lib/net/URLLoader");
var URLLoaderDataFormat_1 = require("awayjs-core/lib/net/URLLoaderDataFormat");
var URLRequest_1 = require("awayjs-core/lib/net/URLRequest");
var URLLoaderEvent_1 = require("awayjs-core/lib/events/URLLoaderEvent");
var ParserUtils_1 = require("awayjs-core/lib/parsers/ParserUtils");
var PerspectiveProjection_1 = require("awayjs-core/lib/projections/PerspectiveProjection");
var RequestAnimationFrame_1 = require("awayjs-core/lib/utils/RequestAnimationFrame");
var Debug_1 = require("awayjs-core/lib/utils/Debug");
var View_1 = require("awayjs-display/lib/View");
var DirectionalLight_1 = require("awayjs-display/lib/display/DirectionalLight");
var ElementsType_1 = require("awayjs-display/lib/graphics/ElementsType");
var StaticLightPicker_1 = require("awayjs-display/lib/materials/lightpickers/StaticLightPicker");
var PrimitiveTorusPrefab_1 = require("awayjs-display/lib/prefabs/PrimitiveTorusPrefab");
var DefaultRenderer_1 = require("awayjs-renderergl/lib/DefaultRenderer");
var MethodMaterial_1 = require("awayjs-methodmaterials/lib/MethodMaterial");
var TorusLight = (function () {
    function TorusLight() {
        Debug_1.Debug.THROW_ERRORS = false;
        Debug_1.Debug.ENABLE_LOG = false;
        Debug_1.Debug.LOG_PI_ERRORS = false;
        this._view = new View_1.View(new DefaultRenderer_1.DefaultRenderer());
        this._view.camera.projection = new PerspectiveProjection_1.PerspectiveProjection(60);
        this.loadResources();
    }
    TorusLight.prototype.loadResources = function () {
        var _this = this;
        var urlRequest = new URLRequest_1.URLRequest("assets/dots.png");
        var urlLoader = new URLLoader_1.URLLoader();
        urlLoader.dataFormat = URLLoaderDataFormat_1.URLLoaderDataFormat.BLOB;
        urlLoader.addEventListener(URLLoaderEvent_1.URLLoaderEvent.LOAD_COMPLETE, function (event) { return _this.imageCompleteHandler(event); });
        urlLoader.load(urlRequest);
    };
    TorusLight.prototype.imageCompleteHandler = function (event) {
        var _this = this;
        var imageLoader = event.target;
        this._image = ParserUtils_1.ParserUtils.blobToImage(imageLoader.data);
        this._image.onload = function (event) { return _this.onLoadComplete(event); };
    };
    TorusLight.prototype.onLoadComplete = function (event) {
        var _this = this;
        var light = new DirectionalLight_1.DirectionalLight();
        light.direction = new Vector3D_1.Vector3D(0, 0, 1);
        light.diffuse = .7;
        light.specular = 1;
        this._view.scene.addChild(light);
        var lightPicker = new StaticLightPicker_1.StaticLightPicker([light]);
        var matTx = new MethodMaterial_1.MethodMaterial(ParserUtils_1.ParserUtils.imageToBitmapImage2D(this._image));
        matTx.style.sampler = new Sampler2D_1.Sampler2D(true, true, true);
        matTx.lightPicker = lightPicker;
        var torus = new PrimitiveTorusPrefab_1.PrimitiveTorusPrefab(matTx, ElementsType_1.ElementsType.TRIANGLE, 220, 80, 32, 16, false);
        this._sprite = torus.getNewObject();
        this._view.scene.addChild(this._sprite);
        this._raf = new RequestAnimationFrame_1.RequestAnimationFrame(this.render, this);
        this._raf.start();
        window.onresize = function (event) { return _this.resize(event); };
        this.resize();
    };
    TorusLight.prototype.render = function (dt) {
        if (dt === void 0) { dt = null; }
        this._sprite.rotationY += 1;
        this._view.render();
    };
    TorusLight.prototype.resize = function (event) {
        if (event === void 0) { event = null; }
        this._view.y = 0;
        this._view.x = 0;
        this._view.width = window.innerWidth;
        this._view.height = window.innerHeight;
    };
    return TorusLight;
}());

//# sourceMappingURL=data:application/json;base64,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QU0sRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFHTSwyQkFBTSxHQUFiLFVBQWMsS0FBb0I7UUFBcEIscUJBQW9CLEdBQXBCLFlBQW9CO1FBRWpDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNqQixJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFakIsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQztRQUNyQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDO0lBQ3hDLENBQUM7SUFDRixpQkFBQztBQUFELENBbEZBLEFBa0ZDLElBQUEiLCJmaWxlIjoibGlnaHRzL1RvcnVzTGlnaHQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1NhbXBsZXIyRH1cdFx0XHRcdFx0ZnJvbSBcImF3YXlqcy1jb3JlL2xpYi9pbWFnZS9TYW1wbGVyMkRcIjtcbmltcG9ydCB7VmVjdG9yM0R9XHRcdFx0XHRcdFx0ZnJvbSBcImF3YXlqcy1jb3JlL2xpYi9nZW9tL1ZlY3RvcjNEXCI7XG5pbXBvcnQge1VSTExvYWRlcn1cdFx0XHRcdFx0ZnJvbSBcImF3YXlqcy1jb3JlL2xpYi9uZXQvVVJMTG9hZGVyXCI7XG5pbXBvcnQge1VSTExvYWRlckRhdGFGb3JtYXR9XHRcdFx0ZnJvbSBcImF3YXlqcy1jb3JlL2xpYi9uZXQvVVJMTG9hZGVyRGF0YUZvcm1hdFwiO1xuaW1wb3J0IHtVUkxSZXF1ZXN0fVx0XHRcdFx0XHRmcm9tIFwiYXdheWpzLWNvcmUvbGliL25ldC9VUkxSZXF1ZXN0XCI7XG5pbXBvcnQge1VSTExvYWRlckV2ZW50fVx0XHRcdFx0ZnJvbSBcImF3YXlqcy1jb3JlL2xpYi9ldmVudHMvVVJMTG9hZGVyRXZlbnRcIjtcbmltcG9ydCB7UGFyc2VyVXRpbHN9XHRcdFx0XHRcdGZyb20gXCJhd2F5anMtY29yZS9saWIvcGFyc2Vycy9QYXJzZXJVdGlsc1wiO1xuaW1wb3J0IHtQZXJzcGVjdGl2ZVByb2plY3Rpb259XHRcdGZyb20gXCJhd2F5anMtY29yZS9saWIvcHJvamVjdGlvbnMvUGVyc3BlY3RpdmVQcm9qZWN0aW9uXCI7XG5pbXBvcnQge1JlcXVlc3RBbmltYXRpb25GcmFtZX1cdFx0ZnJvbSBcImF3YXlqcy1jb3JlL2xpYi91dGlscy9SZXF1ZXN0QW5pbWF0aW9uRnJhbWVcIjtcbmltcG9ydCB7RGVidWd9XHRcdFx0XHRcdFx0ZnJvbSBcImF3YXlqcy1jb3JlL2xpYi91dGlscy9EZWJ1Z1wiO1xuXG5pbXBvcnQge1ZpZXd9XHRcdFx0XHRcdFx0XHRmcm9tIFwiYXdheWpzLWRpc3BsYXkvbGliL1ZpZXdcIjtcbmltcG9ydCB7U3ByaXRlfVx0XHRcdFx0XHRcdGZyb20gXCJhd2F5anMtZGlzcGxheS9saWIvZGlzcGxheS9TcHJpdGVcIjtcbmltcG9ydCB7RGlyZWN0aW9uYWxMaWdodH1cdFx0XHRcdGZyb20gXCJhd2F5anMtZGlzcGxheS9saWIvZGlzcGxheS9EaXJlY3Rpb25hbExpZ2h0XCI7XG5pbXBvcnQge0VsZW1lbnRzVHlwZX1cdFx0XHRcdFx0ZnJvbSBcImF3YXlqcy1kaXNwbGF5L2xpYi9ncmFwaGljcy9FbGVtZW50c1R5cGVcIjtcbmltcG9ydCB7U3RhdGljTGlnaHRQaWNrZXJ9XHRcdFx0ZnJvbSBcImF3YXlqcy1kaXNwbGF5L2xpYi9tYXRlcmlhbHMvbGlnaHRwaWNrZXJzL1N0YXRpY0xpZ2h0UGlja2VyXCI7XG5pbXBvcnQge1ByaW1pdGl2ZVRvcnVzUHJlZmFifVx0XHRcdGZyb20gXCJhd2F5anMtZGlzcGxheS9saWIvcHJlZmFicy9QcmltaXRpdmVUb3J1c1ByZWZhYlwiO1xuXG5pbXBvcnQge0RlZmF1bHRSZW5kZXJlcn1cdFx0XHRcdGZyb20gXCJhd2F5anMtcmVuZGVyZXJnbC9saWIvRGVmYXVsdFJlbmRlcmVyXCI7XG5cbmltcG9ydCB7TWV0aG9kTWF0ZXJpYWx9XHRcdFx0XHRmcm9tIFwiYXdheWpzLW1ldGhvZG1hdGVyaWFscy9saWIvTWV0aG9kTWF0ZXJpYWxcIjtcblxuY2xhc3MgVG9ydXNMaWdodFxue1xuXHRwcml2YXRlIF92aWV3OlZpZXc7XG5cdHByaXZhdGUgX3Nwcml0ZTpTcHJpdGU7XG5cdHByaXZhdGUgX3JhZjpSZXF1ZXN0QW5pbWF0aW9uRnJhbWU7XG5cdHByaXZhdGUgX2ltYWdlOkhUTUxJbWFnZUVsZW1lbnQ7XG5cblx0Y29uc3RydWN0b3IoKVxuXHR7XG5cdFx0RGVidWcuVEhST1dfRVJST1JTID0gZmFsc2U7XG5cdFx0RGVidWcuRU5BQkxFX0xPRyA9IGZhbHNlO1xuXHRcdERlYnVnLkxPR19QSV9FUlJPUlMgPSBmYWxzZTtcblxuXHRcdHRoaXMuX3ZpZXcgPSBuZXcgVmlldyhuZXcgRGVmYXVsdFJlbmRlcmVyKCkpO1xuXHRcdHRoaXMuX3ZpZXcuY2FtZXJhLnByb2plY3Rpb24gPSBuZXcgUGVyc3BlY3RpdmVQcm9qZWN0aW9uKDYwKTtcblxuXHRcdHRoaXMubG9hZFJlc291cmNlcygpO1xuXHR9XG5cblx0cHJpdmF0ZSBsb2FkUmVzb3VyY2VzKClcblx0e1xuXHRcdHZhciB1cmxSZXF1ZXN0OlVSTFJlcXVlc3QgPSBuZXcgVVJMUmVxdWVzdChcImFzc2V0cy9kb3RzLnBuZ1wiKTtcblxuXHRcdHZhciB1cmxMb2FkZXI6VVJMTG9hZGVyID0gbmV3IFVSTExvYWRlcigpO1xuXHRcdHVybExvYWRlci5kYXRhRm9ybWF0ID0gVVJMTG9hZGVyRGF0YUZvcm1hdC5CTE9CO1xuXHRcdHVybExvYWRlci5hZGRFdmVudExpc3RlbmVyKFVSTExvYWRlckV2ZW50LkxPQURfQ09NUExFVEUsIChldmVudDpVUkxMb2FkZXJFdmVudCkgPT4gdGhpcy5pbWFnZUNvbXBsZXRlSGFuZGxlcihldmVudCkpO1xuXHRcdHVybExvYWRlci5sb2FkKHVybFJlcXVlc3QpO1xuXHR9XG5cblx0cHJpdmF0ZSBpbWFnZUNvbXBsZXRlSGFuZGxlcihldmVudDpVUkxMb2FkZXJFdmVudClcblx0e1xuXHRcdHZhciBpbWFnZUxvYWRlcjpVUkxMb2FkZXIgPSBldmVudC50YXJnZXQ7XG5cblx0XHR0aGlzLl9pbWFnZSA9IFBhcnNlclV0aWxzLmJsb2JUb0ltYWdlKGltYWdlTG9hZGVyLmRhdGEpO1xuXHRcdHRoaXMuX2ltYWdlLm9ubG9hZCA9IChldmVudDpFdmVudCkgPT4gdGhpcy5vbkxvYWRDb21wbGV0ZShldmVudCk7XG5cdH1cblxuXHRwcml2YXRlIG9uTG9hZENvbXBsZXRlKGV2ZW50OkV2ZW50KVxuXHR7XG5cdFx0dmFyIGxpZ2h0OkRpcmVjdGlvbmFsTGlnaHQgPSBuZXcgRGlyZWN0aW9uYWxMaWdodCgpO1xuXHRcdGxpZ2h0LmRpcmVjdGlvbiA9IG5ldyBWZWN0b3IzRCgwLCAwLCAxKTtcblx0XHRsaWdodC5kaWZmdXNlID0gLjc7XG5cdFx0bGlnaHQuc3BlY3VsYXIgPSAxO1xuXG5cdFx0dGhpcy5fdmlldy5zY2VuZS5hZGRDaGlsZChsaWdodCk7XG5cblx0XHR2YXIgbGlnaHRQaWNrZXI6U3RhdGljTGlnaHRQaWNrZXIgPSBuZXcgU3RhdGljTGlnaHRQaWNrZXIoW2xpZ2h0XSk7XG5cblx0XHR2YXIgbWF0VHg6TWV0aG9kTWF0ZXJpYWwgPSBuZXcgTWV0aG9kTWF0ZXJpYWwoUGFyc2VyVXRpbHMuaW1hZ2VUb0JpdG1hcEltYWdlMkQodGhpcy5faW1hZ2UpKTtcblx0XHRtYXRUeC5zdHlsZS5zYW1wbGVyID0gbmV3IFNhbXBsZXIyRCh0cnVlLCB0cnVlLCB0cnVlKTtcblx0XHRtYXRUeC5saWdodFBpY2tlciA9IGxpZ2h0UGlja2VyO1xuXG5cdFx0dmFyIHRvcnVzOlByaW1pdGl2ZVRvcnVzUHJlZmFiID0gbmV3IFByaW1pdGl2ZVRvcnVzUHJlZmFiKG1hdFR4LCBFbGVtZW50c1R5cGUuVFJJQU5HTEUsIDIyMCwgODAsIDMyLCAxNiwgZmFsc2UpO1xuXG5cdFx0dGhpcy5fc3ByaXRlID0gPFNwcml0ZT4gdG9ydXMuZ2V0TmV3T2JqZWN0KCk7XG5cblx0XHR0aGlzLl92aWV3LnNjZW5lLmFkZENoaWxkKHRoaXMuX3Nwcml0ZSk7XG5cblx0XHR0aGlzLl9yYWYgPSBuZXcgUmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMucmVuZGVyICwgdGhpcyk7XG5cdFx0dGhpcy5fcmFmLnN0YXJ0KCk7XG5cblx0XHR3aW5kb3cub25yZXNpemUgPSAoZXZlbnQ6VUlFdmVudCkgPT4gdGhpcy5yZXNpemUoZXZlbnQpO1xuXG5cdFx0dGhpcy5yZXNpemUoKTtcblx0fVxuXG5cblx0cHVibGljIHJlbmRlcihkdDpudW1iZXIgPSBudWxsKTp2b2lkXG5cdHtcblx0XHR0aGlzLl9zcHJpdGUucm90YXRpb25ZICs9IDE7XG5cdFx0dGhpcy5fdmlldy5yZW5kZXIoKTtcblx0fVxuXG5cblx0cHVibGljIHJlc2l6ZShldmVudDpVSUV2ZW50ID0gbnVsbClcblx0e1xuXHRcdHRoaXMuX3ZpZXcueSA9IDA7XG5cdFx0dGhpcy5fdmlldy54ID0gMDtcblxuXHRcdHRoaXMuX3ZpZXcud2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcblx0XHR0aGlzLl92aWV3LmhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcblx0fVxufSJdLCJzb3VyY2VSb290IjoiLi90ZXN0cyJ9