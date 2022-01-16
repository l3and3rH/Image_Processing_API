import express from 'express';
import * as fs from 'fs/promises';
import { constants } from 'fs';
import resizeImage from '../../helpers/processingHelper';
import { checkFormat } from '../../helpers/processingHelper';

const processing = express.Router();

processing.get('/:fileName', (req, res) =>{
    const height =  parseInt(req.query.height + '') 
    const width = parseInt(req.query.width + '')
    const fileName = req.params.fileName + '.jpg';
    console.log('Anfrage: ' + height + '   w:   ' + width )
    // check if file already exists 
        const imageCheck = async () => {
            try {
                await fs.access(('./src/assets/rezised/' + fileName), constants.R_OK);
            } catch (error) {
                res.status(400).send('Sorry, there is no file with date name in the correct directory!')
            }
            try { const check = await fs.access(('./src/assets/rezised/' + fileName), constants.R_OK);
                if(check === undefined) { 
                    // check format and resize image if needed
                        await checkFormat(fileName, height, width)
                        console.log('Hier wurde gerade der resizecheck ausgeführt' )
                        res.status(200).sendFile('/src/assets/rezised/' + fileName , { root: '.' })
                        
                }
            } catch (error) {
                console.log('file doesnt exist yet')
                // resize image and create
                const rz = await resizeImage(fileName, height, width)
                console.log(rz)
                console.log('Image created')
                // respond with resized image     
                res.status(200).sendFile('/src/assets/rezised/' + fileName , { root: '.' });  
            }
        }
        imageCheck();

})

export default processing; 