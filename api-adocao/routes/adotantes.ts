import { PrismaClient } from "@prisma/client"
import { Router } from "express"
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()
const router = Router()

router.get("/", async (req, res) => {
  try {
    const adotantes = await prisma.adotante.findMany()
    res.status(200).json(adotantes)
  } catch (error) {
    res.status(400).json(error)
  }
})

function validaSenha(senha: string) {

  const mensa: string[] = []

  // .length: retorna o tamanho da string (da senha)
  if (senha.length < 8) {
    mensa.push("Erro... senha deve possuir, no mínimo, 8 caracteres")
  }

  // contadores
  let pequenas = 0
  let grandes = 0
  let numeros = 0
  let simbolos = 0

  // senha = "abc123"
  // letra = "a"

  // percorre as letras da variável senha
  for (const letra of senha) {
    // expressão regular
    if ((/[a-z]/).test(letra)) {
      pequenas++
    }
    else if ((/[A-Z]/).test(letra)) {
      grandes++
    }
    else if ((/[0-9]/).test(letra)) {
      numeros++
    } else {
      simbolos++
    }
  }

  if (pequenas == 0 || grandes == 0 || numeros == 0 || simbolos == 0) {
    mensa.push("Erro... senha deve possuir letras minúsculas, maiúsculas, números e símbolos")
  }

  return mensa
}

router.post("/", async (req, res) => {
  const { nome, fone, endereco, email, senha } = req.body

  if (!nome || !fone || !endereco || !email || !senha) {
    res.status(400).json({ erro: "Informe nome, fone, endereco, email e senha" })
    return
  }

  const erros = validaSenha(senha)
  if (erros.length > 0) {
    res.status(400).json({ erro: erros.join("; ") })
    return
  }

  // 12 é o número de voltas (repetições) que o algoritmo faz
  // para gerar o salt (sal/tempero)
  const salt = bcrypt.genSaltSync(12)
  // gera o hash da senha acrescida do salt
  const hash = bcrypt.hashSync(senha, salt)

  // para o campo senha, atribui o hash gerado
  try {
    const adotante = await prisma.adotante.create({
      data: { nome, fone, endereco, email, senha: hash }
    })
    res.status(201).json(adotante)
  } catch (error) {
    res.status(400).json(error)
  }
})

router.post("/login", async (req, res) => {
    const { email, senha } = req.body
  
    // em termos de segurança, o recomendado é exibir uma mensagem padrão
    // a fim de evitar de dar "dicas" sobre o processo de login para hackers
    const mensaPadrao = "Login ou senha incorretos"
  
    if (!email || !senha) {
      // res.status(400).json({ erro: "Informe e-mail e senha do usuário" })
      res.status(400).json({ erro: mensaPadrao })
      return
    }
  
    try {
      const adotante = await prisma.adotante.findUnique({
        where: { email }
      })
  
      if (adotante == null) {
        // res.status(400).json({ erro: "E-mail inválido" })
        res.status(400).json({ erro: mensaPadrao })
        return
      }
  
      // se o e-mail existe, faz-se a comparação dos hashs
      if (bcrypt.compareSync(senha, adotante.senha)) {
        
  
        res.status(200).json({
          id: adotante.id,
          nome: adotante.nome,
          email: adotante.email
        })

      } else {
        // res.status(400).json({ erro: "Senha incorreta" })
  
        res.status(400).json({ erro: mensaPadrao })
      }
    } catch (error) {
      res.status(400).json(error)
    }
  })

router.get("/:id", async (req, res) => {
    const { id } = req.params
  
    // em termos de segurança, o recomendado é exibir uma mensagem padrão
    // a fim de evitar de dar "dicas" sobre o processo de login para hackers
    const mensaPadrao = "Login ou senha incorretos"
  
    try {
      const adotante = await prisma.adotante.findUnique({
        where: { id }
      })
  
      if (adotante == null) {
        res.status(400).json({ erro: "Não cadastrado!" })
        return
      }else{
        res.status(200).json({
            id: adotante.id,
            nome: adotante.nome,
            email: adotante.email
          })
      }
  
    } catch (error) {
      res.status(400).json(error)
    }
  })

export default router