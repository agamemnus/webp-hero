"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var Dwebp = require("../dist/dwebp");
function loadBinaryData(url) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    var xhr = new XMLHttpRequest();
                    xhr.open("GET", url);
                    xhr.responseType = "arraybuffer";
                    xhr.onerror = function (error) { reject(error); };
                    xhr.onreadystatechange = function () {
                        if (xhr.readyState == 4 && xhr.status == 200) {
                            resolve(new Uint8Array(xhr.response));
                        }
                    };
                    xhr.send();
                })];
        });
    });
}
function detectWebpSupport() {
    return __awaiter(this, void 0, void 0, function () {
        var testImageSources, testImage, results;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    testImageSources = [
                        "data:image/webp;base64,UklGRjIAAABXRUJQVlA4ICYAAACyAgCdASoCAAEALmk0mk0iIiIiIgBoSygABc6zbAAA/v56QAAAAA==",
                        "data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAQAAAAfQ//73v/+BiOh/AAA="
                    ];
                    testImage = function (src) {
                        return new Promise(function (resolve, reject) {
                            var img = document.createElement("img");
                            img.onerror = function (error) { return resolve(false); };
                            img.onload = function () { return resolve(true); };
                            img.src = src;
                        });
                    };
                    return [4 /*yield*/, Promise.all(testImageSources.map(testImage))];
                case 1:
                    results = _a.sent();
                    return [2 /*return*/, results.every(function (result) { return !!result; })];
            }
        });
    });
}
var relax = function () { return new Promise(function (resolve, reject) { return requestAnimationFrame(resolve); }); };
var WebpHero = /** @class */ (function () {
    function WebpHero(_a) {
        var _b = (_a === void 0 ? {} : _a).dwebp, dwebp = _b === void 0 ? new Dwebp() : _b;
        this.busy = false;
        this.dwebp = dwebp;
    }
    WebpHero.prototype.decode = function (webpdata) {
        return __awaiter(this, void 0, void 0, function () {
            var canvas, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.busy)
                            throw new Error("cannot decode when dwebp is already busy");
                        this.busy = true;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, relax()];
                    case 2:
                        _a.sent();
                        canvas = document.createElement("canvas");
                        this.dwebp.setCanvas(canvas);
                        this.dwebp.webpToSdl(webpdata, webpdata.length);
                        this.busy = false;
                        return [2 /*return*/, canvas.toDataURL()];
                    case 3:
                        error_1 = _a.sent();
                        this.busy = false;
                        throw error_1;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    WebpHero.prototype.polyfill = function (_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.document, document = _c === void 0 ? window.document : _c, _d = _b.force, force = _d === void 0 ? false : _d;
        return __awaiter(this, void 0, void 0, function () {
            var _e, _i, _f, image, src, webpdata, pngdata, error_2;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        _e = !force;
                        if (!_e) return [3 /*break*/, 2];
                        return [4 /*yield*/, detectWebpSupport()];
                    case 1:
                        _e = (_g.sent());
                        _g.label = 2;
                    case 2:
                        if (_e)
                            return [2 /*return*/, undefined];
                        _i = 0, _f = Array.from(document.querySelectorAll("img"));
                        _g.label = 3;
                    case 3:
                        if (!(_i < _f.length)) return [3 /*break*/, 9];
                        image = _f[_i];
                        src = image.src;
                        if (!/.webp$/.test(src)) return [3 /*break*/, 8];
                        _g.label = 4;
                    case 4:
                        _g.trys.push([4, 7, , 8]);
                        return [4 /*yield*/, loadBinaryData(src)];
                    case 5:
                        webpdata = _g.sent();
                        return [4 /*yield*/, this.decode(webpdata)];
                    case 6:
                        pngdata = _g.sent();
                        image.src = pngdata;
                        return [3 /*break*/, 8];
                    case 7:
                        error_2 = _g.sent();
                        console.error("error decoding webp image \"" + src + "\"", error_2);
                        throw error_2;
                    case 8:
                        _i++;
                        return [3 /*break*/, 3];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    return WebpHero;
}());
exports.default = WebpHero;
//# sourceMappingURL=webp-hero.js.map