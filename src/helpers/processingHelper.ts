import sharp from 'sharp';


const resizeImage =  async (input: string, height: number, width: number) => {
  try {
    
    const file = await sharp('./src/assets/full/' + input)
    .resize({
      width: width,
      height: height
    })
    .jpeg({ mozjpeg: true })
    .toFile('./src/assets/rezised/' + input);
    return file;

  } catch (error) {
    console.log(error)
    return error;
  }

}

export const checkFormat = async (input: string, height: number, width: number): Promise<unknown> => {
  const metadata =  await sharp('./src/assets/rezised/' + input).metadata();
  console.log('checkFormat wurde aufgerufen mit')
  console.log('resizescheck: ' + (metadata.height !== height || metadata.width !== width))
 
  if(metadata.height !== height || metadata.width !== width){
    const rz = await resizeImage(input, height, width);
    console.log('Image resized')
    return rz
  } 
  
}

export default resizeImage;