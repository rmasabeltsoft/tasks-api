const app = require ('./app.js')
const port = 3000

const HelloWorldController = require('./controllers/HelloWorld.controller')

app.get('/', HelloWorldController)

app.listen(port, () => {
   console.log('Application running on http://localhost:3000')
})
