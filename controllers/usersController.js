const userModel = require('../models/userModel')
const delay = ms => new Promise(res => setTimeout(res, ms));
const bcrypt = require('bcrypt')

//login callback
const loginController = async (req, res) => {
    
   
    try {
        const {email, password} = req.body 
        console.log(email)
        const user = await userModel.findOne({email}).then(function (user) {
            //console.log(user)
            if(!user){
                return res.status(404).send({user})
            }else{
                bcrypt.compare(password, user.password).then( function (result) {
                    if (result){
                        res.status(200).json({
                            success: true,
                            user,
                        });
                    }
                })
                /*bcrypt.compare(password, user.password, function(result){
                    if (result){
                        res.status(200).json({
                            success: true,
                            user,
                        });
                    }
                })*/

            }
        })
        
        /*if(!user){
            console.log("HI")
            return res.status(404).send({user})
        }
        res.status(200).json({
            success: true,
            user,
        });*/
    
    } catch (error) {
        return res.status(400).json({success:false,error})
    }
};

//5
//regsiter callback
const registerController = async (req, res) => {
    try {
        console.log(req.body)
        const newUser = new userModel(req.body);
        
        await newUser.save();
        res.status(201).json({
            success:true,
            newUser,
        });
    } catch (error) {
        //const y = userModel.findOne(email)
        ///res.json({y})
        return res.status(400).json({success:false,  error})
    }
};



const deleteUserController = async (req, res) => {
    
   
    try {
        const {email, password} = req.body 
        //const user = await userModel.findOne({email, password})
        await userModel.findOne({email}).then(function (user) {
            bcrypt.compare(password, user.password).then(async function (result, err) {
                    console.log(result)
                    if (result){
                        await userModel.findOneAndDelete({_id:req.body.userId})
                        res.status(200).send({
                            success: true
                        })
                        
                        
                    }
                    else{
                        console.log("inside compare")
                        return res.status(404).send(err+":")
                    }
                    
                })
                /*bcrypt.compare(password, user.password, async function(result){
                    if (result){
                        console.log("inside delete control")
                        return res.status(404).send("not exists")
                    }
                })*/

        
        })
        
        
        /*if(!user){
            console.log("inside delete control")
            return res.status(404).send("not exists")
        }*/
        /*await userModel.findOneAndDelete({_id:req.body.userId})
        res.status(200).send({
            success: true
        })*/
    
    } catch (error) {
        return res.status(400).json({success:false,error})
    }
};
module.exports = {loginController, registerController, deleteUserController};