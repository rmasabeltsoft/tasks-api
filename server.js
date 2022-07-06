const app = require ('./app.js')
const port = 3000

app.listen(port, () => {
   console.log('Application running on http://localhost:${port}')
})
