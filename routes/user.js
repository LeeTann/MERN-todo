const router = require('express').Router()
const passport = require('passport')
const passportConfig = require('../passport')
const JTW = require('jsonwebtoken')
const User = require('../models/User')

const signToken = userID => {
  return JTW.sign({iss: "LambdaCoder", sub: userID}, "LambdaCoder", {expiresIn: "1h"})
}

function authenticateJwt(req, res, next) {
  passport.authenticate('local', {session: false}, function(err, user, info){
    if (err) return next(err);
    if (!user) return res.status(401).json({ message: { msgBody: "Invalid Credentials. Please try again!!!", msgError: true}})
    req.user = user;
    next();
  })(req, res, next);
}

// REGISTER
// router.post('/register', async (req, res) => {
//   let { username, password, role } = req.body

//   // Simple validation
//   if (!username || !password || !role) {
//     return res.status(500).json({message : {msgBody : "please enter all fields", msgError: true}})
//   }
  
//   try {
//     // check if user email already exist
//     const user = await User.findOne({ username }).exec()
//     console.log(user)
//     if (user.username) {
//       return res.status(400).json({message : {msgBody : "user already exist", msgError: true}})
//     }
    
//     // create new user
//     const newUser = await User.create({ username, password, role})
//     return res.status(201).json({message : {msgBody : `Account ${newUser.username} successfully created`, msgError: false}})
//   } catch (err) {
//     return res.status(500).json({message : {msgBody : "Error has occured dead", msgError: true}})
//   }
// })

router.post('/register', (req,res)=>{
  const { username,password,role } = req.body;
  User.findOne({username},(err,user)=>{
      if(err)
          res.status(500).json({message : {msgBody : "Error has occured", msgError: true}});
      if(user)
          res.status(400).json({message : {msgBody : "Username is already taken", msgError: true}});
      else{
          const newUser = new User({username,password,role});
          newUser.save(err=>{
              if(err)
                  res.status(500).json({message : {msgBody : "Error has occured", msgError: true}});
              else
                  res.status(201).json({message : {msgBody : "Account successfully created", msgError: false}});
          });
      }
  });
});

// Login
router.post('/login', authenticateJwt, (req, res) => {
  if (req.isAuthenticated()) {
    const { _id, username, role } = req.user
    const token = signToken(_id)
    res.cookie('access_token', token, {httpOnly: true}, {sameSite: true})
    res.status(200).json({ isAuthenticated: true, user: {username, role} })
  } else {
    res.status(500).json({ message: {msgBody: "Error could not log in", msgError: true}})
  }
})


// Logout
router.get('/logout', passport.authenticate('jwt', {session : false}), (req,res) => {
  res.clearCookie('access_token');
  res.json({ user: {username : "", role : ""}, success : true });
});

// Admin
router.get('/admin', passport.authenticate('jwt', {session: false}), (req, res) => {
  if (req.user.role === 'admin') {
    res.status(200).json({ message: "Success! You are an admin" })
  } else {
    res.status(403).json({ message: "Denied! You are not an admin" })
  }
})

// Authenticated - for data persistance with front end
router.get('/authenticated', passport.authenticate('jwt', {session: false}), (req, res) => {
  const { username, role } = req.user
  if (res.status !== 401) {
    res.status(200).json({ isAuthenticated: true, user: { username, role } })
  } else {
    res.status(401).json({message : {msgBody : "Error has occured", msgError: true}});
  }
})

module.exports = router