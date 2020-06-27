import mailConfig from '../config/mail'
import nodemailer from 'nodemailer';

export default {
    key: "RegisterMail",
    async handle(name: string, username: string, email: string) {
        const transport = nodemailer.createTransport(mailConfig)

        await transport.sendMail({
            from: `Teste <queue@testqueue.com>`,
            to: `${name} <${email}>`,
            subject: "Cadastro bem sucedido",
            text: `Cadastro bem sucedido, seu usuário é ${username}`
        })
    }
}
