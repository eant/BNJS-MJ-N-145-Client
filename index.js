const express = require('express')

const app = express()

app.listen(2000)
app.use( express.static('public') )

app.get('/:seccion', (req, res) => {
    const { seccion } = req.params
    
    res.writeHead(200, { "Content-Type" : "text/html" })
    res.end(`<h1>Hola desde la sección <u>${seccion}</u> en HTML</h1>`)
})