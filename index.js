require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const booksRoutes = require('./controllers/books')


const app = express()
const corsOptions = {
    optionsSuccessStatus: 200
}


//middleware
app.use(express.json())
app.use(cors())

app.use('/books', booksRoutes)

app.get('/', (req,res) => {
    res.send('Hello World!')
})

app.get('/books/:id', cors(corsOptions), function (req,res,next) {
    res.json({msg: 'This is CORS-enabled for all origins'})
})

// db connection
mongoose.set('strictQuery', true)
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('DB connected'))
    .catch(err => console.error(err));

const PORT = process.env.PORT

app.listen(80, function () {
    console.log('CORS-enabled web server listening on port 80')
})
app.listen(PORT, console.log(`listening on port ${PORT}`))

module.exports = app