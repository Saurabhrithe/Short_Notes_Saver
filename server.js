
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const dotenv = require('dotenv')
const colors = require('colors')
const connectDb = require('./config/connectDb')
const userRoute = require('./routes/userRoute')
// config dot env file
dotenv.config();

//database call
connectDb();

// rest object
const app = express()


// middlewares
app.use(morgan("dev"))
app.use(express.json())
app.use(cors())



//routes
/*
app.get('/api/v1/users', (req, res) => {
   res.send(users)
})
*/

// users route
app.use('/api/v1/users', require('./routes/userRoute'));
//notes routes
app.use('/api/v1/notes', require('./routes/notesRoute'))

//-----

//static files
app.use(express.static(path.join(__dirname, './client/build')))

app.get('*', function(req, res){
    res.sendFile(path.join(__dirname, './client/build/index.html'))
})

//port
const PORT = process.env.PORT || 8080


//listen server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})