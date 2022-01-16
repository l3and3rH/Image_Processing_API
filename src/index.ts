import express from 'express';
import router from './router/index'

const app = express();
const port = 3000;

app.use('/image', router)
app.use(express.static('/assets'));

app.listen(port, () => {
  console.log(`Up and running`)
})