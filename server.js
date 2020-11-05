require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('game')
})

app.listen(PORT, () => {
  console.log(`Toggle Runner listening at http://localhost:${PORT}`)
})
