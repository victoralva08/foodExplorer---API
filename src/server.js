require('express-async-errors')

const express = require('express') // importing express library

const api = express()
api.use(express.json())

const port = 4444

api.listen(port, () => { 
    console.log(`Server is running on Port ${port}.`)
})

const routes = require('./routes') 

app.use(routes)

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