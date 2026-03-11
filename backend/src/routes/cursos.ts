import { Router, Request, Response } from "express"
import fs from "fs"
import path from "path"

const router = Router()

const filePath = path.join(__dirname, "../database/cursos.json")

router.get("/", (req: Request, res: Response) => {
  try {

    const data = fs.readFileSync(filePath, "utf-8")
    const cursos = JSON.parse(data)

    res.json(cursos)

  } catch (error) {

    res.status(500).json({
      mensagem: "Erro ao carregar cursos"
    })

  }
})

export default router