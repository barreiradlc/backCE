import dotenv from "dotenv";
import { Request, Response } from 'express';
import User from '../models/user';
import Encryption from '../utils/cripto';
import Mailer from '../utils/mailer';
import Validations from '../utils/validations';

dotenv.config()
const cripto = new Encryption()
const mailer = new Mailer()
const validations = new Validations()

class UserController {

    async createUser(req: Request, res: Response) {
        const { name, email, username, phone } = req.body.user;

        console.log(req.body)
        console.log({email})

        const validEmail = validations.mailValidate(email)
        console.log({validEmail})

        let savedUser

        if (validEmail) {

            savedUser = await User.findOne({ email })
            console.log({savedUser})
            if (savedUser !== null) {
                console.log('Buscar por Email')
                return res.json(savedUser)
            }
        } else {
            
            savedUser = await User.findOne({ username: email })
            console.log('Buscar por Usuário')
            if (savedUser !== null) {
                return res.json(savedUser)
            }
        }

        const user = new User({
            name: name.trim(),
            username: username.trim().toLowerCase(),
            email: email.trim().toLowerCase(),
            phone: phone.trim(),
        })
        
        const validationErrors = user.validateSync()
        
        console.debug( user )
        console.debug({ validationErrors })
        
        user.save((err, response) => {
                console.debug({ err })
            if (err) {
                console.debug({ err })
                return res.status(400).json(err.errors)
            } else {
                console.debug({ response })
                const e = cripto.enc(username)

                mailer.handleMailSend(name, username, email)

                return res.json({
                    user,
                    token: e                    
                })
            }
        })
    }

    async getUser(req: Request, res: Response) {
        const { email } = req.body;

        const validEmail = validations.mailValidate(email)
        let savedUser

        if (validEmail) {

            savedUser = await User.findOne({ email })
            console.log({savedUser})
            if (savedUser !== null) {
                console.log('Buscar por Email')
                return res.json(savedUser)
            }

        } else {
            
            let username = email

            savedUser = await User.findOne({ username: email })
            console.log('Buscar por Usuário')
            console.log(savedUser, email, username)
            if (savedUser !== null) {
                return res.json(savedUser)
            }
        }

        console.log({email})
        // user._id
        res.json({            
            email
        })

    }

    async getUsername(req: Request, res: Response) {
        const { username } = req.body;
                
        const savedUser = await User.findOne({ username })
        console.log('Buscar por Usuário')
        
        if (savedUser !== null) {
            return res.json(savedUser)
        }
    
        // user._id
        res.json({    
            username    
        })

    }

    async getEmail(req: Request, res: Response) {
        const { email } = req.body;
                
        const savedUser = await User.findOne({ email })
        console.log('Buscar por Email')
        
        if (savedUser !== null) {
            return res.json(savedUser)
        }
    
        // user._id
        res.json({    
            email    
        })

    }

    async getPhone(req: Request, res: Response) {
        const { phone } = req.body;
                
        const savedUser = await User.findOne({ phone })
        console.log('Buscar por Telefone')
        
        if (savedUser !== null) {
            return res.json(savedUser)
        }
    
        // user._id
        res.json({    
            phone    
        })

    }

};


export default UserController;
