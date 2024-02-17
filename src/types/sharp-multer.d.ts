

declare module "sharp-multer" {
    import { StorageEngine, DiskStorageOptions } from "multer";

    interface ImageOptions {
        fileFormat?: "jpg" | "png" | "webp",
        resize?: {
            width: number,
            height: number,
            resizeMode?: "cover" | "contains" | "fill" | "inside" | "outside"
        },
        quality?: number,
        useTimestamp?: boolean,
        watermarkOptions?: {
            input: string,
            location: "center" | "top-left" | "top-right" | "bottom-left" | "bottom-right",
            opacity: number
        }
    }

    // For some reason, the SharpMulter storage doesn't follow the same format as multer
    interface Options {
        filename?(name: string, options: ImageOptions, req: Parameters<
                NonNullable<DiskStorageOptions["filename"]>  // I shouldn't need to do this
                >[0]
            ): string,
        destination: DiskStorageOptions["destination"]  // Somewhat better
        imageOptions: ImageOptions
    }

    export default function SharpMulter(options: Options): StorageEngine;
}