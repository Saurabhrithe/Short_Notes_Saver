const express = require("express");
const {addNotes, getAllNotes, editNotes, deleteNotes} 
= require('../controllers/notesController')


//router object
const router = express.Router();

//routes
//add Notes POST method
router.post('/addNotes', addNotes)

//edit Note
router.post('/editNotes', editNotes)

//delete Note
router.post('/deleteNotes', deleteNotes)

//got Notes
router.post('/getNotes', getAllNotes)

module.exports = router;