// #region imports
import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import morgan from 'morgan'
import { router } from './routes/mainRouter.js'
import { createServer } from "http"
import { Server } from 'socket.io'
// #endregion imports

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000'
  }
});

io.on('connection', (socket) => {
  console.log(socket.id)

  let timer = null

  socket.on('runTimer', (arg) => {
    console.log('id: ', { arg })

    //socket.join(arg.id)

    // const created = new Date(arg.created).getTime()

    // console.log('created: ', created)
    // const timeLeft = arg.time * 60 * 60 * 1000
    // console.log('left: ', timeLeft)
    // const now = new Date().getTime()
    // const deadline = created + timeLeft - now
    // console.log('deadline: ', deadline)

    // if (deadline < 0) return

    // timer = setInterval(function () {
    //   const t = deadline
    //   let d = Math.floor(t / (1000 * 60 * 60 * 24))
    //   let h = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    //   let m = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60))
    //   let s = Math.floor((t % (1000 * 60)) / 1000)

    //   socket.emit('timer', { d, h, m, s })

    //   console.log('wtf: ?', { d, h, m, s })

    //   if (t < 0) {
    //     clearInterval(timer)
    //   }
    // }, 1000)
  })

  // const demoDate = new Date()
  // const demoHours = 48

  // const created = demoDate.getTime()
  // const hoursToMillis = demoHours * 60 * 60 * 1000
  // const deadline = created + hoursToMillis

  // const timer = setInterval(function () {
  //   const now = new Date().getTime()
  //   const t = deadline - now
  //   let d = Math.floor(t / (1000 * 60 * 60 * 24))
  //   let h = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  //   let m = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60))
  //   let s = Math.floor((t % (1000 * 60)) / 1000)

  //   socket.emit('timer', { d, h, m, s })

  //   if (t < 0) {
  //     clearInterval(timer)
  //   }
  // }, 1000)

  socket.on('disconnect', () => {
    //clearInterval(timer)
    console.log('ondisconnect connection')
  })
});

httpServer.listen(5001);

// #region middleware
app.use(morgan('dev'));
app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000'
}));
app.use(express.json());
app.use(cookieParser())
// #endregion middleware

const port = process.env.PORT || 3000;

// #region hello from server
app.get('/', (req, res) => {
  res.send('Helliiooouuuu');
});
// #endregion hello from server

// #region Routers
app.use('/', router);

// #endregion Routers

// #region app listener
app.listen(port, () => { console.log('Server online. Port: ', port); });
// #endregion app listener
