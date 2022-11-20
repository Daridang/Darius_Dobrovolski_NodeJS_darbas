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
// const httpServer = createServer(app);
// const io = new Server(httpServer, { /* options */ });

// io.on("connection", (socket) => {
//   console.log(socket.client)
// });

// httpServer.listen(5001);

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
