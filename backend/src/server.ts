import express from "express"
import cors from "cors"


import cursosRoutes from "./routes/cursos"
import matriculaRoutes from "./routes/matricula"

const app = express()

app.use(cors())
app.use(express.json())

app.use("/cursos", cursosRoutes)
app.use("/matricula", matriculaRoutes)

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000")
})