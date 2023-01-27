const notesModel = require('../models/notesModel')

const getAllNotes = async (req, res) => {
    try{
        const notes = await notesModel.find(
            {userid: req.body.userid}
            );
            console.log(res.body)
            res.status(200).json(notes)
    } catch(error){
        console.log(error)
        res.status(500).json(error)
    }
}
const addNotes = async (req, res) => {
    try{
        const newNote = new notesModel(req.body)
        await newNote.save()
        res.status(201).send('Note added')
    }
    catch(error){
        console.log(error)
        res.status(500).json(error)
    }
}

const editNotes = async (req, res ) =>{
    try {
        await notesModel.findOneAndUpdate(
            {_id:req.body.notesId}, 
            req.body.payload
            )
        res.status(200).send("edit success")
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

const deleteNotes = async (req, res ) =>{
    try {
        await notesModel.findOneAndDelete(
            {_id:req.body.notesId}, 
            req.body.payload
            )
        res.status(200).send("delete success")
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}
module.exports = {getAllNotes, addNotes, editNotes, deleteNotes}