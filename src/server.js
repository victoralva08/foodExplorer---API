
require('express-async-errors')
const AppError = require('./utils/AppError')
require('dotenv/config')


const express = require('express') // importing express library
const sqliteConnection = require('./database/sqlite')

const app = express()
app.use(express.json())

const cors = require('cors')
app.use(cors()) // cors library for back and frontend connection

const uploadConfig = require('./imageConfig/upload.js')

const port = process.env.API_PORT ||4444

app.listen(port, () => { 
    console.log(`Server running on Port ${port}.`)
})

const routes = require('./routes') 
app.use(routes)

sqliteConnection()


app.use((error, request, response, next) => { // setting an error message

    if(error instanceof AppError)
    {
        return response.status(error.statusCode).json({
            status: "error",
            message: error.message
        })
    }

    console.log(error)

    return response.status(500).json({
        status: 'error',
        message: 'Internal server error. Please, verify your connection.'
    })

})

app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER))