import cors from 'cors'
import express, { Application, Request, Response } from 'express'
import globalErrorHandler from './app/Error/global__Error'
import notfound from './app/Error/not__found'
import router from './app/router'
const app: Application = express()

// parser
app.use(express.json())
app.use(
  cors({
    origin: [
      'https://location-track-frontend.vercel.app',
      'http://localhost:5173',
    ], // Allow only your frontend
    credentials: true, // If you need cookies or authentication
  }),
)

// router
app.use('/api', router)

app.get('/', (req: Request, res: Response) => {
  res.send('server is running ...!')
})

app.use(globalErrorHandler)
app.use(notfound)

export default app
