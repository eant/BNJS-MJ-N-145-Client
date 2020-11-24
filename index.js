const express = require('express')
const exphbs  = require('express-handlebars')
const axios = require('axios')

const app = express()

app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

app.listen(2000)
app.use( express.static('public') )
app.use( express.json() )
app.use( express.urlencoded({ extended : true }) )

app.get("/favicon.ico", (req, res) => {
    res.writeHead(404, { "Content-Type" : "text/plain" })
    res.end("Chrome deja de hinchar con el favicon.ico LPMQTP")
})

app.get("/test", async (req, res) => {
    const { data : peliculas } = await axios.get('http://localhost:1000/api/v1/pelicula')

    console.table(peliculas)

    res.end("Mira la consola si hay datos de la API")
})

app.get("/panel", async (req, res) => {

    const { data : peliculas } = await axios.get('http://localhost:1000/api/v1/pelicula')

    res.render('panel', { titulo : "Catálogo de Películas", peliculas })
})

app.get("/panel/nueva", (req, res) => {

    res.render('formulario', { accion : "Agregar" })

})

app.post("/panel/nueva", async (req, res) => {

    const { body : datos } = req

    const { data } = await axios({
        method : "POST",
        url : "http://localhost:1000/api/v1/pelicula",
        data : datos
    })

    console.log(data)

    res.end("Mira la consola")
})

app.get("/panel/actualizar/:id", async (req, res) => {

    const { id } = req.params

    const { data } = await axios.get(`http://localhost:1000/api/v1/pelicula/${id}`)

    if( data.ok ){

        const pelicula = data.resultado[0]

        res.render('formulario', {
            accion : "Actualizar",
            ...pelicula
        })

    } else {
        res.redirect('/panel/error')
    }

})

app.get('/:seccion?', (req, res) => {
    const { seccion } = req.params

    const vista = seccion || 'home'
    
    const titulo = vista.charAt(0).toUpperCase() + vista.slice(1)

    res.render( vista, { titulo } )
})