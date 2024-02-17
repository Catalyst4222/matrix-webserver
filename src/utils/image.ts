import getPixels from "get-pixels";
import gifFrames from "gif-frames";

import { GIF, PNG, Frame } from "../types/images";


// Just make your stuff async grr grr grr
async function _getPixelsAsync(path: string): Promise<Parameters<Parameters<typeof getPixels>[2]>[1]> {
    return new Promise((resolve, reject) => {
        getPixels(path, (err, res) => {
            if (err) reject(err);
            else resolve(res);
        });
    });
}


async function loadGif(path: string): Promise<GIF> {
    const data = await _getPixelsAsync(path);
    const frames: Frame[] = [];

    (await gifFrames({url: path, frames: "all"})).map(gifFrame => {
        frames[gifFrame.frameIndex] = {
            delay: gifFrame.frameInfo.delay,
            data: Buffer.of()
        };

        const frame: PNG = frames[gifFrame.frameIndex].data; 

        for (let i = 0; i < data.shape[1]; i++) {
            const column = data.pick(1, i);

            for (let j = 0; j < data.shape[2]; j++) {
                const pixel = column.pick(j);
                
                frame.writeUInt8(pixel.get(0));
                frame.writeUInt8(pixel.get(1));
                frame.writeUInt8(pixel.get(2));
            }
        }
    });

    return {frames} satisfies GIF;
}


async function loadPng(path: string): Promise<PNG> {
    const data = await _getPixelsAsync(path);

    if (data.shape.length == 4) {
        throw new Error(`${path} is a gif, not a png!`);
    }

    const png: PNG = Buffer.of();

    for (let i = 0; i < data.shape[0]; i++) {
        const column = data.pick(i);

        for (let j = 0; j < data.shape[1]; j++) {
            const pixel = column.pick(j);

            png.writeUInt8(pixel.get(0));
            png.writeUInt8(pixel.get(1));
            png.writeUInt8(pixel.get(2));
        }
    }

    return png;
}


export { loadGif, loadPng };