const router = require('express').Router()
const passport = require('passport')
const Todo = require('../models/Todo')
const User = require('../models/User')
const passportConfig = require('../passport');
const JWT = require('jsonwebtoken');

// CREATE A TODO
// router.post('/todos', passport.authenticate('jwt', {session: false}), async (req, res) => {
//   try {
//     // create new todo and save it
//     const newTodo = await new Todo(req.body)
//     console.log(newTodo)
//     console.log(req.user)
//     // add the new todo to the todos array and save it
//     await req.user.todos.push(newTodo)
//     await req.user.save(err => {
//       if(err) res.status(500).json({message : {msgBody : "Error has occured", msgError: true}});
//       else res.status(201).json({message : {msgBody : "Successfully created todo", msgError : false}});
//     })
    
//   } catch (error) {
//     res.status(500).json({message : {msgBody : "Error has occured....", msgError: true}})
//   }
// })

router.post('/todos',passport.authenticate('jwt',{session : false}),(req,res)=>{
  const todo = new Todo(req.body);
  todo.save(err=>{
      if(err)
          res.status(500).json({message : {msgBody : "Error has occured", msgError: true}});
      else{
          req.user.todos.push(todo);
          req.user.save(err=>{
              if(err)
                  res.status(500).json({message : {msgBody : "Error has occured", msgError: true}});
              else
                  res.status(200).json({message : {msgBody : "Successfully created todo", msgError : false}});
          });
      }
  })
});

// GET ALL TODOS
// router.get('/todos', passport.authenticate('jwt', {session: false}), async (req, res) => {
//   try {
//     const user = await User.findById({ _id: req.user._id })

//     return res.status(200).json({ todos: user.todos })
//   } catch (error) {
//     res.status(500).json({error: 'Server Error...'})
//   }
// })

router.get('/todos',passport.authenticate('jwt',{session : false}),(req,res)=>{
  User.findById({_id : req.user._id}).populate('todos').exec((err,document)=>{
      if(err)
          res.status(500).json({message : {msgBody : "Error has occured", msgError: true}});
      else{
          res.status(200).json({todos : document.todos, authenticated : true});
      }
  });
});

module.exports = router