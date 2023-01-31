const express = require("express");
const {addNotes, getAllNotes, editNotes, deleteNotes} 
= require('../controllers/notesController')


//router object
const router = express.Router();

//routes
//add expenses POST method
router.post('/addNotes', addNotes)

//edit expense
router.post('/editNotes', editNotes)

//delete expense
router.post('/deleteNotes', deleteNotes)

//got expenses
router.post('/getNotes', getAllNotes)

module.exports = router;