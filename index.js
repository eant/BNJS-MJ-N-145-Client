const express = require('express')

const app = express()

app.listen(2000)

app.get('/', (req, res) => {
    res.end('Hola desde expressJS')
})