const app = require ('./app.js')
const port = 3000

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.listen(port, () => {
   console.log('Application running on http://localhost:${port}')
})
