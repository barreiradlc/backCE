import express from 'express';
import UserController from './controllers/User';

const routes = express.Router()
const userController = new UserController();

routes.get('/', (req, res) => {
    // req - requisição
    // res - resposta
    res.json({
        "Boas Vindas": "Olar"
    })
})


routes.post('/register', userController.createUser)


export default routes
