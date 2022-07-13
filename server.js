const app = require ('./app.js');
const port = 3000;

const HelloWorldController = require('./controllers/HelloWorld.controller');
const TasksRouter = require('./routes/Tasks.routes');

app.get('/', HelloWorldController);
app.use(TasksRouter);

app.listen(port, () => {
   console.log('Application running on http://localhost:' + port);
});
