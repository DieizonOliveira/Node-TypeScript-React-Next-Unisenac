import express from 'express'
import cors from 'cors'
import especiesRoutes from './routes/especies'
import animaisRoutes from './routes/animais'
import fotosRoutes from './routes/fotos'
import adotatesRoutes from './routes/adotantes'

const app = express()
const port = 3004

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())
app.use("/especies", especiesRoutes)
app.use("/animais", animaisRoutes)
app.use("/fotos", fotosRoutes)
app.use("/adotantes", adotatesRoutes)



app.get('/', (req, res) => {
  res.send('API: Sistema de Canil')
})

app.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}`)
})