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
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = require("fs/promises");
const _1 = require(".");
const image_1 = require("../utils/image");
const currentImage = null;
_1.router.get("/display", (req, res) => {
    return res.status(501).send();
});
_1.router.post("/display", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.query.name) {
        return res.status(400).send();
    }
    try {
        yield (0, promises_1.access)(`src/images/${req.query.name}`);
    }
    catch (e) {
        return res.status(404).send();
    }
    const gif = yield (0, image_1.loadPng)(`src/images/${req.query.name}`);
    console.log(gif);
    return res.status(501).send();
}));
