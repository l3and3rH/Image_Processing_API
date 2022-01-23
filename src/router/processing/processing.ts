import express from 'express'
import * as fs from 'fs/promises'
import { constants } from 'fs'
import resizeImage from '../../helpers/processingHelper'
import validateInput from '../../middleware/inputValidation' 
import path from 'path'

const processing = express.Router()

processing.get('/:fileName', validateInput, (req: express.Request, res: express.Response): void => {

    try {
        const height = parseInt(req.query.height + '')
        const width = parseInt(req.query.width + '')
        let fileName: string;
        if(req.params.fileName.includes('.jpg')){
            fileName = req.params.fileName;
            fileName = fileName.slice(0, fileName.length - 4)

        } else {
            fileName = req.params.fileName 

        } 
        const imageCheck = async (): Promise<void> => {
            //check if there is a file ind the /full folder that could be resized
            const assetsPath = path.join(__dirname + '..', '..', '..', '..', 'assets' )
            try {
                await fs.access(
                    path.join(assetsPath, 'full' ,fileName + '.jpg'),
                    constants.R_OK
                )
            } catch (error) {
                res.status(400).send(
                    'Sorry, there is no file with date name in the correct directory!'
                )
                return
            }

            // check if file is already resized
            try {
          
                const check = await fs.access(
                    path.join(assetsPath, 'rezised' ,fileName + '_' + height + 'x' + width + '.jpg'),
                    constants.R_OK
                )
                if (check === undefined) {
                    // sends correct file to client
                    res.status(200).sendFile(
                        path.join(assetsPath, 'rezised' ,fileName + '_' + height + 'x' + width + '.jpg'))
                    return
                }

                // creates new file
            } catch (error) {
                // resize image and create
                const rz = await resizeImage(fileName, height, width)
                if (rz instanceof Error) {
                    res.status(500).send('Could not process the file')
                }
                // respond with resized image
                res.status(200).sendFile(path.join(assetsPath, 'rezised' ,fileName + '_' + height + 'x' + width + '.jpg'))
                return
            }
        }

        imageCheck()
    } catch (error) {
        res.status(403).send('Input incorrect')
        return
    }
})

export default processing
