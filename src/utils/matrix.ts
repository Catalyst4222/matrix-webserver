import { LedMatrix, MatrixOptions } from "rpi-led-matrix";
import type { LedMatrixInstance } from "rpi-led-matrix";
import { PNG } from "../types/images";

const options: MatrixOptions = {
    ...LedMatrix.defaultMatrixOptions(),
    rows: 32,
    cols: 64,
};



interface Matrix extends LedMatrixInstance {
    drawImage: typeof drawImage;

}

function drawImage(this: Matrix, png: PNG) {
    /* fucking
    figure out how to use drawBuffer
    convert code to use buffers 
    use drawBuffer
    complain even more about the wrapper not having any good way to show images
     */



    // png.forEach((row, i) => {
    //     row.forEach((pixel, j) => {
    //         if (pixel.aplha) {
    //             this.fgColor({
    //                 r: pixel.red,
    //                 g: pixel.green,
    //                 b: pixel.blue
    //             }).setPixel(i, j);
    //         }
    //     });
    // });

    // this.map((coords) => {
    //     const pixel = png[coords[0]][coords[1]];

    //     if (pixel.aplha) {
    //         // The one case where you don't return a Color
    //         return pixel.red << 16 | pixel.blue << 8 | pixel.green;
    //     }

    //     const oldPixel = this.drawBuffer
    // });

    this.drawBuffer(png);

    this.sync();
    // this.map();
}


const matrix = new LedMatrix(
    options, LedMatrix.defaultRuntimeOptions()
) as Matrix;

matrix.drawImage = drawImage;


export {matrix};
