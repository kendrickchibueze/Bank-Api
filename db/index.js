/**
 * create a connection function for mongodb
 * start a local server mongodb connection
 */

const mongoose = require('mongoose')
require('dotenv').config()
const { MONGO_URI, PORT } = process.env




//create a connection function
const connectDB =() => {
    mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true

    })
    .then(() => {
        console.log(':::> Connected to MongoDB database')
    })
    .catch((error) => {
        console.log("<::: Couldn't connect to database ", error)

        //Exit with failure
        process.exit(1)
    })

}

module.exports = connectDB