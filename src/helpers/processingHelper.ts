import sharp from 'sharp'

const resizeImage = async (input: string, height: number, width: number) => {
  console.log(input)
    try {
        const file = await sharp('./src/assets/full/' + input)
            .resize({
                width: width,
                height: height,
            })
            .jpeg({ mozjpeg: true })
            .toFile('./src/assets/rezised/' + input)
        return file
    } catch (error) {
        console.log(error)
        const err = Error(error as string)
        return err
    }
}

export const checkFormat = async (
    input: string,
    height: number,
    width: number
): Promise<boolean> => {
    const metadata = await sharp('./src/assets/rezised/' + input).metadata()
    console.log('checkFormat wurde aufgerufen mit')
    console.log(
        'resizescheck: ' +
            (metadata.height !== height || metadata.width !== width)
    )

    return metadata.height !== height || metadata.width !== width
}

export default resizeImage
