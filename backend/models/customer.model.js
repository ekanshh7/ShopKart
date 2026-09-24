import mongoose from 'mongoose'
const customerSchema = new mongoose.Schema(
{
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    phoneno:{
        type:Number,
        require:true
    }
}
)

const customers = mongoose.model('customers',customerSchema)

export default customers