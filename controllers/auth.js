const express = require('express')
const router = express.Router()
const db = require('../models')
const passport = require('../config/ppConfig.js')

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
            //log if the new user in 
            passport.authenticate('local', {
                successRedirect: '/',
                successFlash: 'Account created and logged in!'
            })(req, res)//IIFE = immediatly invoked function
        }else{
            console.log('already exist, try again')
            req.flash('error', 'email already exists, try logging in!')
            res.redirect('/auth/signup')// redirect to signup page so they can try again
        }
    })
    // res.redirect('/auth/login')
    .catch(err=>{
        req.flash('error', err.message)
        res.redirect('/auth/signup')
    })
})

router.get('/login', (req, res)=>{
    res.send('GET /auth/login successfully hit')
})

router.post('/login', passport.authenticate('local', {
    failureRedirect: '/auth/login',
    successRedirect: '/',
    failureFlash: 'Invaild email or password', // !-> FLASH <-!
    successFlash: 'You are now logged in'// !-> FLASH <-!
}))

router.get('/logout', (req, res)=>{
    req.logout()
    res.redirect('/')
})


module.exports = router