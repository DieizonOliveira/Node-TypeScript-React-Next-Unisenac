import express from 'express'
import cors from 'cors'
import especiesRoutes from './routes/especies'
import animaisRoutes from './routes/animais'
const app = express()
const port = 3004

app.use(express.json())
app.use(cors())
app.use("/especies", especiesRoutes)
app.use("/animais", animaisRoutes)

app.get('/', (req, res) => {
  res.send('API: Sistema de Canil')
})

app.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}`)
})