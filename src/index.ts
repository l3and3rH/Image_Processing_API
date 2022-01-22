import express from 'express'
import router from './router/index'
import validateInput from './middleware/inputValidation'

const app = express()
const port = 3000

app.use('/image', router)
app.use(validateInput)

app.listen(port, () => {
    console.log(`Up and running on localhost:3000`)
})

export default app
