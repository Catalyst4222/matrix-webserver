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
const multer_1 = __importDefault(require("multer"));
const sharp_multer_1 = __importDefault(require("sharp-multer"));
const promises_1 = require("fs/promises");
const _1 = require(".");
const storage = (0, sharp_multer_1.default)({
    destination: function (req, file, cb) {
        cb(null, "src/images"); // Specify the destination folder for uploaded files
    },
    filename: function (name, options, req) {
        var _a, _b, _c;
        // console.log(req.query, cb);
        return ((_c = (_b = (_a = req.query) === null || _a === void 0 ? void 0 : _a.name) === null || _b === void 0 ? void 0 : _b.toString) === null || _c === void 0 ? void 0 : _c.call(_b)) || name;
    },
    imageOptions: {
        fileFormat: "png",
        resize: {
            height: 32,
            width: 64,
            resizeMode: "inside"
        }
    }
});
const upload = (0, multer_1.default)({ storage: storage });
/* Get all image names */
_1.router.get("/images", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const files = yield (0, promises_1.readdir)("src/images");
    res.json(files);
}));
/* Get an image by its name */
_1.router.get("/image", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.query.name) {
        return res.status(404).send();
    }
    res.sendFile(`${req.query.name}`, { root: "src/images" });
}));
/* Upload a new file */
_1.router.post("/image", upload.single("file"), (req, res) => {
    if (!req.file) {
        return res.status(400).send();
    }
    res.status(201).send();
});
// TODO remove file
