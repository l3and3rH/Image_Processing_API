import express from 'express'
import * as fs from 'fs/promises'
import { constants } from 'fs'
import resizeImage from '../../helpers/processingHelper'
import { checkFormat } from '../../helpers/processingHelper'

const processing = express.Router()

processing.get('/:fileName', (req, res) => {
    const height = parseInt(req.query.height + '')
    const width = parseInt(req.query.width + '')
    const fileName = req.params.fileName + '.jpg'

    const imageCheck = async () => {
        //check if there is a file ind the /full folder that could be resized
        try {
            await fs.access('./src/assets/rezised/' + fileName, constants.R_OK)
        } catch (error) {
            res.status(400).send(
                'Sorry, there is no file with date name in the correct directory!'
            )
        }

        // check if file is already resized
        try {
            const check = await fs.access(
                './src/assets/rezised/' + fileName,
                constants.R_OK
            )
            if (check === undefined) {
                // check if format is as different - if true resizees it
                if (await checkFormat(fileName, height, width)) {
                    const rz = await resizeImage(fileName, height, width)
                    if (rz instanceof Error) {
                        res.status(500).send('Could not process the file')
                    }
                }
                // sends correct file to client
                res.status(200).sendFile('/src/assets/rezised/' + fileName, {
                    root: '.',
                })
            }

            // creates new file
        } catch (error) {
            console.log('file doesnt exist yet')
            // resize image and create
            const rz = await resizeImage(fileName, height, width)
            if (rz instanceof Error) {
                res.status(500).send('Could not process the file')
            }
            console.log('Image created')
            // respond with resized image
            res.status(200).sendFile('/src/assets/rezised/' + fileName, {
                root: '.',
            })
        }
    }
    imageCheck()
})

export default processing
