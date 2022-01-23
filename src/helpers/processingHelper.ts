import sharp from 'sharp';
import path from 'path';

const resizeImage = async (
    input: string,
    height: number,
    width: number
): Promise<unknown> => {
    try {
        const assetsPath = path.join(__dirname , '..', '..', 'assets' )
        console.log('look here now    ' + input)
        console.log(path.join(assetsPath, 'full' , input))
        const file = await sharp(path.join(assetsPath, 'full' , input + '.jpg'))
            .resize({
                width: width,
                height: height,
            })
            .jpeg({ mozjpeg: true })
            .toFile(path.join(assetsPath, 'rezised' , input + '_' + height + 'x' + width + '.jpg'))
        return file
    } catch (error) {
        console.log(error)
        const err = Error(error as string)
        return err
    }
}

export default resizeImage
