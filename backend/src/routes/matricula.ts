import { Router, Request, Response } from "express"
import fs from "fs"
import path from "path"
import { Matricula } from "../models/Matricula"

const router = Router()

// caminho do arquivo JSON
const filePath = path.join(__dirname, "../database/matriculas.json")

router.post("/", (req: Request, res: Response) => {

  console.log("BODY RECEBIDO:", req.body)

  const { nome, email, curso }: Matricula = req.body

  // validação de campos obrigatórios
  if (!nome || !email || !curso) {
    return res.status(400).json({
      mensagem: "Todos os campos são obrigatórios"
    })
  }

  // regex para nome (apenas letras e espaço)
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

    // salva no JSON
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

export default router