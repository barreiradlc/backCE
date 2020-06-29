import mongoose from 'mongoose'
import Point from './Constructors/Point'

const AlertSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
        required: false
    },    
    needs:[String],
    location:{
        type: Point,
        index:'2dsphere'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

export default mongoose.model('Alert', AlertSchema)