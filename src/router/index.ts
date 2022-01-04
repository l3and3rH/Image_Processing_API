import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    console.log(req.ip)
    res.send('Image is processing')
} )

export default router;