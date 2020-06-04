const router = require('express').Router()
const passport = require('passport')
const passportConfig = require('../passport')
const JTW = require('jsonwebtoken')
const User = require('../models/User')
const Todo = require('../models/Todo')

const signToken = userID => {
  return JTW.sign({iss: "LambdaCoder", sub: userID}, "LambdaCoder", {expiresIn: "1h"})
}

// REGISTER
router.post('/register', (req, res) => {
  const { username, password, role } = req.body

  User.findOne({ username }, (err, user) => {
    if (err) {
      res.status(500).json({ message: 'Server Error '})
    }
    if (user) {
      res.status(400).json({ message: 'Username already taken' })
    } else {
      const newUser = new User({ username, password, role })
      newUser.save(err => {
        if (err) {
          res.status(500).json({ message: 'Error, could not save' })
        } else {
          res.status(201).json({ message: 'Account successfully created' })
        }
      })
    }
  })
})

// Login
router.post('/login', passport.authenticate('local', {session: false}), (req, res) => {
  if (req.isAuthenticated()) {
    const { _id, username, role } = req.user
    const token = signToken(_id)
    res.cookie('access_token', token, {httpOnly: true}, {sameSite: true})
    res.status(200).json({ isAuthenticated: true, user: {username, role} })
  }
})

// Logout
router.get('/logout', passport.authenticate('jwt', {session : false}), (req,res) => {
  res.clearCookie('access_token');
  res.json({ user: {username : "", role : ""}, success : true });
});

module.exports = router