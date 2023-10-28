import cors from 'cors'
import express, { Application, Request, Response } from 'express'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import { productRoutes } from './app/modules/products/products.route'

const app: Application = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1/products', productRoutes)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})
// global error handler
app.use(globalErrorHandler)

export default app
