import mongoose, { Mongoose } from 'mongoose'

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
    },
    username: {
        type:String,
        unique: [true, "Usuário já cadastrado"],
        validate: {
            validator: function(v: any) {
                return /\d{3}-\d{3}-\d{4}/.test(v);
              },
              message: props => `Usuário ${props.value} já cadastrado, por favor escolha outro`
        }        
    },
    email: {
        type: String,
        unique: [true, "Email já cadastrado"],
        validate: {
            validator: function(v: any) {
                return /\d{3}-\d{3}-\d{4}/.test(v);
              },
              message: props => `Email ${props.value} já cadastrado, por favor escolha outro`
        }
    },
    phone: {
        type: String,
        unique: [true, "Telefone já cadastrado já cadastrado"],
        validate: {
            validator: function(v: any) {
                return /\d{3}-\d{3}-\d{4}/.test(v);
                },
                message: props => `Telefone ${props.value} já cadastrado, por favor escolha outro`
        }
    }
})


export default mongoose.model('User', UserSchema)