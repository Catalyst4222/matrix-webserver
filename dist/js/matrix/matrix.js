"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.matrix = void 0;
const rpi_led_matrix_1 = require("rpi-led-matrix");
const options = Object.assign(Object.assign({}, rpi_led_matrix_1.LedMatrix.defaultMatrixOptions()), { rows: 32, cols: 64 });
function drawImage() {
}
const matrix = new rpi_led_matrix_1.LedMatrix(options, rpi_led_matrix_1.LedMatrix.defaultRuntimeOptions());
exports.matrix = matrix;
matrix.drawImage = drawImage;
