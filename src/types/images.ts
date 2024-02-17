type Pixel = {
    red: number,
    green: number,
    blue: number,
    alpha: unknown
}

type PNG = Buffer

type Frame = {
    data: PNG
    delay: number
}

type GIF = {
    frames: Frame[]
}

export { PNG, GIF, Frame, Pixel };