import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import crypto from 'crypto';
import nodemailer from 'nodemailer';

const router = Router();
const prisma = new PrismaClient();

router.post("/", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ erro: "Informe o e-mail do adotante." });
  }

  try {
    const adotante = await prisma.adotante.findUnique({ where: { email } });

    if (!adotante) {
      return res.status(400).json({ erro: "E-mail não encontrado." });
    }

    const recoveryCode = crypto.randomBytes(4).toString('hex');

    await prisma.adotante.update({
      where: { email },
      data: { recoveryCode }
    });

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'seu-email@gmail.com',
        pass: 'sua-senha'
      }
    });

    await transporter.sendMail({
      from: '"Adocao App" <seu-email@gmail.com>',
      to: email,
      subject: "Código de Recuperação de Senha",
      text: `Seu código de recuperação é: ${recoveryCode}`
    });

    res.status(200).json({ mensagem: "Código de recuperação enviado ao e-mail." });
  } catch (error: any) { // Aqui está a alteração
    console.error("Erro ao gerar código de recuperação:", error);
    
    if (error.code === 'ENOTFOUND') {
      return res.status(500).json({ erro: "Erro de conexão com o servidor de e-mail." });
    }

    res.status(500).json({ erro: "Erro ao gerar código de recuperação." });
  }
});

export default router;
