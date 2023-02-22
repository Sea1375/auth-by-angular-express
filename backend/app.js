const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const dotenv = require('dotenv')
const db = require('./database/db')
dotenv.config()

const routes = require('./routes/routes')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())

app.use('/api', routes)

db.connect(function (err) {
  if (err) {
    console.log('Unable to connect to MySQL.')
  } else {

    app.listen(8080, function () {
      console.log('G2GN app listening on port 8080!')
    })

  }
})


