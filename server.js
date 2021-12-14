const express = require('express');
const connectDB = require('./db/index')
const morgan = require('morgan');
const bodyParser = require('body-parser')
const userRouter = require('./routes/users')
const accountRouter = require('./routes/account')
const transactRouter =require('./routes/transactions')


//allows us to use environmental variables in .env
require('dotenv').config()
const { PORT } = process.env

//connect to database
connectDB()

//connect to express server
const app = express()



//initialize morgan middleware
app.use(morgan('dev'))
app.use('/uploads', express.static('uploads')) // this makes the file statistically publicly available
//initialize body-parser middleware
app.use(bodyParser.urlencoded({ extended:false}))
app.use(bodyParser.json())



//Handling Cors errors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Access,Authorization')
    if(req.method == 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
        return res.status(200).json({})
    }
    next()

})


//routes
app.use('/users', userRouter) //The users and the admin uses this to register and login
app.use('/admin', accountRouter) //admin uses this to manage user Accounts
app.use('/users', transactRouter)// This is the route for user transaction
app.use('/admin', transactRouter)// Admin manages and has access to user transactions through this route



//using ping to test our route
app.get('/ping', (req, res) => {
    res.status(200).send("Hello world!")
  });


//wild card middleware
app.use("**", (req, res) => {
    res.status(404).send({ message: "Route not found" })
  })


//error middleware
app.use((error, req, res, next) => {
    console.log(error)
    res.status(500).send({ message: "Something went wrong", error: error.message })
  })


// PORT
const port = process.env.PORT || PORT



// listen to connections
app.listen(port, ()=>console.log(`:::> listening on http://localhost:${port}`))



