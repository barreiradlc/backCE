import dotenv from "dotenv";
import { Request, Response } from 'express';
import User from '../models/user';
import Encryption from '../utils/cripto';
import Mailer from '../utils/mailer';


dotenv.config()
const cripto = new Encryption()
const mailer = new Mailer()

class UserController {
    
    async createUser(req: Request, res: Response) {
        const { name, email, username, phone } = req.body;
        let token
        
        const user = new User({
            name,
            username,
            email,
            phone,
        })
        
        console.debug({email})
        user.save(( err, response ) => {
            if(err){
                console.debug({err})
                return res.status(400).json(err.errors)
            } else {
               cripto.enc(username)
                    .then((e : String) => {
                        mailer.handleMailSend(name, username, email)
                                
                        return res.json({
                            ...user, 
                            token: e
                        })                        
                    })                
                    return res.json(response)
            }
        })
    }

};


export default UserController;
