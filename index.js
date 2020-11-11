const express = require('express')
const app = express()
const ejsLayouts = require('express-ejs-layouts')
var session = require('express-session')
const passport = require('./config/ppConfig.js')
const flash = require('connect-flash')
const isLoggedIn = require('./middleware/isLoggedIn')

//setup ejs and ejs layouts
app.set('view engine', 'ejs')
app.use(ejsLayouts) 
app.use(express.urlencoded({extended: false}))

//session middleware
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))

//passport middleware
app.use(passport.initialize())
app.use(passport.session())

//flash middleware
app.use(flash())

//custom middleware
app.use((req, res, next)=>{
    res.locals.alerts = req.flash()
    res.locals.currentUser = req.user
    next() // move on to the next piece of middleware
})


//controllers midware. This is what allows us to use the controllers routes
app.use('/auth', require('./controllers/auth.js'))

app.get('/', (req, res)=>{
   res.render('home')
})

app.get('/profile', (req, res)=>{
    res.render('profile')
 })

app.listen(3000, ()=>{
    console.log('youre now in port 3000')
})
