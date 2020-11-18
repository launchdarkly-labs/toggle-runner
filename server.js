require('dotenv').config()
const LaunchDarkly = require('launchdarkly-node-server-sdk')
const ldclient = LaunchDarkly.init(process.env.LD_SDK_KEY)

const express = require('express')
const app = express()
const PORT = process.env.PORT

const LD_USER = {
  key: `${require('./package.json').name}-${require('os').hostname}`,
}

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/', async (req, res) => {
  try {
    const isSpaceModeEnabled = await ldclient.variation('space-mode', LD_USER, false)
    res.render('game', { isSpaceModeEnabled })
  } catch (err) {
    console.error(err)
    res.status(500).send('Error occurred while retrieving flags')
  }
})

app.listen(PORT, () => {
  console.log(`Toggle Runner listening at http://localhost:${PORT}`)
})
