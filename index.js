const express = require('express')
const exphbs  = require('express-handlebars')

const app = express()

app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

app.listen(2000)
app.use( express.static('public') )

app.get('/:seccion', (req, res) => {
    const { seccion } = req.params

    res.render('home')
})