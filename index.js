const express = require('express')
const app = express()
const cors = require('cors')
const { connect } = require('./src/Services/Connexion')
const usertRoutes = require('./src/Controller/Routes/user')
const utilitaireRoutes = require('./src/Controller/Routes/utilitaire')


app.use(express.json())
app.use(cors())


app.use('/user',usertRoutes)
app.use('/utilitaire', utilitaireRoutes)

app.listen(3400, function () {
    console.log('Serveur en écoute sur le port 3400');
});

