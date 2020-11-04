const express = require('express')
const router = express.Router()
const db = require('../models')

router.get('/signup',(req, res)=>{
    res.render('auth/signup')
})

router.get('/login', (req, res)=>{
    res.render('auth/login')
})

router.get('/signup', (req, res)=>{
    res.send('GET /auth signup successfully')
})

router.post('/signup', (req, res)=>{
    console.log('sign up form user', req.body)

    //check if user aleadt exists
    //if it does, throw an error
    //otherwise create a new user and store them in the db
    db.user.findOrCreate({
        where: {email: req.body.email},
        defaults:{
            name: req.body.name,
            password: req.body.password
        }
    }) // created new user if email wasnt found
    .then(([createdUser, wasCreated])=>{
        if(wasCreated){
            console.log('just created the following user:', createdUser)
        }else{
            console.log('already exist, try again')
        }
    })
    res.redirect('/auth/login')
})

router.get('/login', (req, res)=>{
    res.send('GET /auth/login successfully hit')
})

router.post('/login', (req, res)=>{
    console.log('Trying to log in', req.body)
    //redirect to home route
    res.redirect('/')
})


module.exports = router