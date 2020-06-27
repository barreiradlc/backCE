import nodemailer from 'nodemailer';
import mailConfig from '../config/mail'
import dotenv from 'dotenv'

dotenv.config()

class Mailer {

    async handleMailSend(name: string, username: string, email: string){
        const transport = nodemailer.createTransport(mailConfig)

        const mailOptions = {            
            from: `Cadastro bem sucedido! <augustodasilva53@gmail.com>`,
            to: email,
            subject: "Cadastro bem sucedido",
            text: `Cadastro bem sucedido, seja bem vindo ${name}`,
            html: `<h2>Seu usuário foi cadastrado com sucesso, seu usuário é <b>${username}</b>, guarde-o com segurança <br>Pois é com ele que irá acessar sua conta. :) </h2>` // html body
        };

        await transport.sendMail(mailOptions, function(err, response) {
            if(err){
                console.log(`ERRO!!!`, err)
            }else {
                console.log(`DEU BOM!!!`, response)                
            }

        })

    }
}

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";


export default Mailer

