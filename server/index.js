const express = require('express')
const connectDB = require('./config/db')
const env = require('dotenv')
const { apiRouter } = require('./routes')
const cookieParser = require('cookie-parser')
const cors = require('cors')

env.config()
const port = 3000
const app = express()
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
connectDB()

app.use((req, res, next) => {
    console.log('\nreq.path :>> ', req.path);
    console.log('req.method :>> ', req.method);
    next()
})

app.use('/', (req, res) => {
    res.status(200).json({ message: 'Hello Word' })
})

app.get('/test', test)

function test(req, res, next) {
    try {
        const { name } = req.body
        const you = name[1]
    } catch (err) {
        next(err)
    }
}

app.listen(port, (err) => {
    if (err) {
        console.log('err :>> ', err);
    } else {
        console.log('Server is running at port', port)
    }
})

app.use('/api', apiRouter)

app.use((err, req, res, next) => {
    if (err) {
        console.log('err.message :>> ', err.message);
        res.status(500).json({ message: err.message || 'internal server error' })
    }
})

app.all('*', (req, res) => {
    res.status(404).json({ message: "End point does not exist" })
})
