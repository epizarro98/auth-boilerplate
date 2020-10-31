const express = require('express')
const app = express()
const ejsLayouts = require('express-ejs-layouts')
//setup ejs and ejs layouts
app.set('view engine', 'ejs')
app.use(ejsLayouts) 
app.use(express.urlencoded({extended: false}))

//controllers midware. This is what allows us to use the controllers routes
app.use('/auth', require('./controllers/auth.js'))
app.get('/', (req, res)=>{
    res.send('EXPRESS AUTH HOME ROUTE')
})
app.listen(3000, ()=>{
    console.log('youre now in port 3000')
})
