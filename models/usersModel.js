const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
//schema design
const userSchema = new mongoose.Schema(
    {
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    name:{
        type:String,
        required:[true, 'name is required']
    },
    email:{
        type: String,
        required: [true, 'email is required and unique'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'must provide']
    },
},
{ timestamps: true }
)


// encrypting user here
userSchema.pre('save', async function(next) {
    try{
        console.log("hi from pass")
        const salt = await bcrypt.genSalt(10)
        const hashPass = await bcrypt.hash(this.password, salt)
        this.password = hashPass
        console.log(hashPass)
        next() 
    }catch(error){
        next(error)
    }
})

const usersModel = mongoose.model('users', userSchema)
module.exports = usersModel