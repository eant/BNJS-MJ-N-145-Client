const express = require('express')
const exphbs  = require('express-handlebars')
const axios = require('axios')

const app = express()

app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

app.listen(2000)
app.use( express.static('public') )

app.get("/test", async (req, res) => {
    const { data : peliculas } = await axios.get('http://localhost:1000/api/v1/pelicula')

    console.table(peliculas)

    res.end("Mira la consola si hay datos de la API")
})

app.get('/:seccion?', (req, res) => {
    const { seccion } = req.params

    const vista = seccion || 'home'
    
    const titulo = vista.charAt(0).toUpperCase() + vista.slice(1)

    res.render( vista, { titulo } )
})