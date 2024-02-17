"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadPng = exports.loadGif = void 0;
const get_pixels_1 = __importDefault(require("get-pixels"));
const gif_frames_1 = __importDefault(require("gif-frames"));
// Just make your stuff async grr grr grr
function _getPixelsAsync(path) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            (0, get_pixels_1.default)(path, (err, res) => {
                if (err)
                    reject(err);
                else
                    resolve(res);
            });
        });
    });
}
function loadGif(path) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield _getPixelsAsync(path);
        const frames = [];
        (yield (0, gif_frames_1.default)({ url: path, frames: "all" })).map(frame => {
            frames[frame.frameIndex] = {
                delay: frame.frameInfo.delay,
                data: []
            };
            const rows = frames[frame.frameIndex].data;
            for (let i = 0; i < data.shape[1]; i++) {
                const columns = rows[i] = [];
                for (let j = 0; j < data.shape[2]; j++) {
                    const pixel = data.pick(frame.frameIndex, i, j);
                    columns[j] = {
                        red: Number(pixel.pick(0)),
                        green: Number(pixel.pick(1)),
                        blue: Number(pixel.pick(2)),
                        aplha: Number(pixel.pick(3)),
                    };
                }
            }
        });
        console.log(frames[0].data[199]);
        return { frames };
    });
}
exports.loadGif = loadGif;
function loadPng(path) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield _getPixelsAsync(path);
        if (data.shape.length == 4) {
            throw new Error(`${path} is a gif, not a png!`);
        }
        const png = [];
        for (let i = 0; i < data.shape[0]; i++) {
            png[i] = [];
            for (let j = 0; j < data.shape[1]; j++) {
                const pixel = data.pick(i, j);
                png[i][j] = {
                    red: Number(pixel.pick(0)),
                    green: Number(pixel.pick(1)),
                    blue: Number(pixel.pick(2)),
                    aplha: Number(pixel.pick(3))
                };
            }
        }
        return png;
    });
}
exports.loadPng = loadPng;
