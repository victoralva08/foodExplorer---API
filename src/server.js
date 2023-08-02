require('express-async-errors')
const AppError = require('./utils/AppError')

const express = require('express') // importing express library
const sqliteConnection = require('./database/sqlite')

const api = express()
api.use(express.json())

const port = 4444

api.listen(port, () => { 
    console.log(`Server running on Port ${port}.`)
})

const routes = require('./routes') 
api.use(routes)

sqliteConnection()


api.use((error, request, response, next) => { // setting an error message

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