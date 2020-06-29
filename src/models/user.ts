import mongoose, { Mongoose } from 'mongoose'

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    username: {
        type: String,
        required: false
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    phone: {
        type: String,
        required: false,
    }
})

export default mongoose.model('User', UserSchema)