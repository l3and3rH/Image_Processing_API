import express from 'express'
import processing from './processing/processing'

const router = express.Router()

router.get('/', (req, res) => {
    const targetUrl =
        req.originalUrl + '/processing/FILENAME?height=200&width=300'
    res.send(
        `Please select: localhost:3000${targetUrl} to resize an Image. Make sure the file exists in the full folder`
    )
})

router.use('/processing', processing)

export default router
