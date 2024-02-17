"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.matrix = void 0;
const rpi_led_matrix_1 = require("rpi-led-matrix");
const options = Object.assign(Object.assign({}, rpi_led_matrix_1.LedMatrix.defaultMatrixOptions()), { rows: 32, cols: 64 });
function drawImage(png) {
    /* fucking
    figure out how to use drawBuffer
    convert code to use buffers
    use drawBuffer
    complain even more about the wrapper not having any good way to show images
     */
    png.forEach((row, i) => {
        row.forEach((pixel, j) => {
            if (pixel.aplha) {
                this.fgColor({
                    r: pixel.red,
                    g: pixel.green,
                    b: pixel.blue
                }).setPixel(i, j);
            }
        });
    });
    this.map((coords) => {
        const pixel = png[coords[0]][coords[1]];
        if (pixel.aplha) {
            // The one case where you don't return a Color
            return pixel.red << 16 | pixel.blue << 8 | pixel.green;
        }
        const oldPixel = this.drawBuffer;
    });
    this.sync();
    // this.map();
}
const matrix = new rpi_led_matrix_1.LedMatrix(options, rpi_led_matrix_1.LedMatrix.defaultRuntimeOptions());
exports.matrix = matrix;
matrix.drawImage = drawImage;
