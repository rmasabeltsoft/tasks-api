const app = require ('./app.js')
const port = 3000

const HelloWorldController = require('./controllers/HelloWorld.controller')
const GetTasksController = require('./controllers/GetTasks.controller')

app.get('/', HelloWorldController)
app.get('/tasks', GetTasksController)

app.listen(port, () => {
   console.log('Application running on http://localhost:3000')
})
