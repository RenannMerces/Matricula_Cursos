import { Router, Request, Response } from "express"
import fs from "fs"
import path from "path"
import { Matricula } from "../models/Matricula"

const router = Router()
const filePath = path.join(__dirname, "../database/matriculas.json")

// ----------------------------------- POST ------------------------------------

router.post("/", (req: Request, res: Response) => {

  console.log("Testando Body:", req.body)

  const { nome, email, curso }: Matricula = req.body

    if (nome.length > 50) {
    return res.status(400).json({
      mensagem: "O nome deve ter no máximo 100 caracteres"
    })
  }

  if (email.length > 50) {
    return res.status(400).json({
      mensagem: "O email deve ter no máximo 150 caracteres"
    })
  }

  if (!nome || !email || !curso) {
    return res.status(400).json({
      mensagem: "Todos os campos são obrigatórios"
    })
  }

  const nomeRegex = /^[A-Za-zÀ-ÿ\s]+$/

  if (!nomeRegex.test(nome)) {
    return res.status(400).json({
      mensagem: "O nome deve conter apenas letras"
    })
  }

  // regex para email válido
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!emailRegex.test(email)) {
    return res.status(400).json({
      mensagem: "Email inválido"
    })
  }

  // sanitização dos dados
  const nomeTratado = nome.trim()
  const emailTratado = email.trim().toLowerCase()

  try {

    // lê arquivo
    const data = fs.readFileSync(filePath, "utf-8")

    // se estiver vazio retorna array
    const matriculas: Matricula[] = data ? JSON.parse(data) : []

    const novaMatricula = {
      id: matriculas.length + 1,
      nome: nomeTratado,
      email: emailTratado,
      curso
    }

    // adiciona nova matrícula
    matriculas.push(novaMatricula)
    fs.writeFileSync(filePath, JSON.stringify(matriculas, null, 2))

    return res.status(201).json({
      mensagem: "Matrícula realizada com sucesso",
      data: novaMatricula
    })

  } catch (error) {
    console.error(error)
    return res.status(500).json({
      mensagem: "Erro ao salvar matrícula"
    })
  }

})

// ----------------------------------- GET ------------------------------------

router.get("/", (req: Request, res: Response) => {

  try {

    const data = fs.readFileSync(filePath, "utf-8")
    const matriculas = data ? JSON.parse(data) : []

    return res.status(200).json(matriculas)

  } catch (error) {

    console.error(error)

    return res.status(500).json({
      mensagem: "Erro ao buscar matrículas"
    })

  }

})

// ----------------------------------- DELETE ------------------------------------

router.delete("/:id", (req: Request, res: Response) => {

  const id = Number(req.params.id)

  try {

    const data = fs.readFileSync(filePath, "utf-8")
    const matriculas = JSON.parse(data)

    const novasMatriculas = matriculas.filter((m: any) => m.id !== id)

    fs.writeFileSync(filePath, JSON.stringify(novasMatriculas, null, 2))

    return res.status(200).json({
      mensagem: "Matrícula removida com sucesso"
    })

  } catch (error) {

    return res.status(500).json({
      mensagem: "Erro ao excluir matrícula"
    })

  }

})

export default router