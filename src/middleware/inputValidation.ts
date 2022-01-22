import express from 'express'

const validateInput = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
): void => {
    const width = Number(req.query.width) || null
    const height = Number(req.query.height) || null

    if (!height || !width) {
        res.status(400).send('Missing parameter')
        return
    } else if (height <= 0 || width <= 0) {
        res.status(400).send('Parameters must be number above 0')
        return
    }
    next()
}
export default validateInput
