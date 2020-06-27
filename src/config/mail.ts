import dotenv from 'dotenv'

dotenv.config()

export default {
    service: "gmail",
    auth: {
        user: process.env.MAIL,
        pass: process.env.PASS
    }    
}