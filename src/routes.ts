import express from 'express';
import UserController from './controllers/User';
import AlertController from './controllers/Alert';

import multer from 'multer'
import multerConfig from './config/multer'

const routes = express.Router()
const upload = multer(multerConfig)

const userController = new UserController();
const alertController = new AlertController();


routes.get('/', (req, res) => {
    // req - requisição
    // res - resposta
    res.json({
        "Boas Vindas": "Olar"
    })
})


routes.post('/register', userController.createUser)
routes.post('/auth', userController.getUser)

// get params
routes.post('/username', userController.getUsername)
routes.post('/phone', userController.getPhone)
routes.post('/email', userController.getEmail)


// alerts
routes.get('/alert/:_id', alertController.singleAlert)
routes.get('/alerts', alertController.listAlerts)
routes.post('/alerts', alertController.createAlert)
routes.put('/alerts', alertController.updateAlert)
// routes.post('/alerts', upload.single('image'), alertController.createAlert)

export default routes
