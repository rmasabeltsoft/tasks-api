const app = require ('./app.js');
const port = 3000;

const HelloWorldController = require('./controllers/HelloWorld.controller');
const TasksRouter = require('./routes/Tasks.routes');
const CategoriesRouter = require('./routes/Categories.routes');
const EmployeesRouter = require('./routes/Employees.routes');

app.get('/', HelloWorldController);
app.use(TasksRouter);
app.use(CategoriesRouter);
app.use(EmployeesRouter);

app.listen(port, () => {
   console.log('Application running on http://localhost:' + port);
});
