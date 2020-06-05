const router = require('express').Router()
const passport = require('passport')
const Todo = require('../models/Todo')
const User = require('../models/User')

// CREATE A TODO
router.post('/todo', passport.authenticate('jwt', {session: false}), async (req, res) => {
  try {
    // create new todo and save it
    const newTodo = new Todo(req.body)
    const savedTodo = await newTodo.save()

    // add the new todo to the todos array and save it
    const newTodos = req.user.todos.push(savedTodo)
    req.user.save(newTodos)

    return res.status(201).json(savedTodo)
  } catch (error) {
    res.status(500).json({error: 'Error while trying to save todo'})
  }
})

// GET ALL TODOS
router.get('/todos', passport.authenticate('jwt', {session: false}), async (req, res) => {
  try {
    const user = await User.findById({ _id: req.user._id })

    return res.status(200).json({ todos: user.todos })
  } catch (error) {
    res.status(500).json({error: 'Server Error...'})
  }
})

module.exports = router