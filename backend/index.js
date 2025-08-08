const connectToMongo = require('./db')
const express = require('express')
const cors = require('cors')
const app = express()
const port = 4000

connectToMongo()

app.use(cors())
app.use(express.json())

//Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.get('/', (req, res) => {
    res.send('Hello')
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})