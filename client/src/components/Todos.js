import React, { useState, useContext, useEffect } from 'react'
import TodoItem from './TodoItem'
import {getTodos, postTodos} from '../actions/TodoActions'
import { AuthContext } from '../context/AuthContext'
import Message from './Message'

const Todos = (props) => {
  const [todo, setTodo] = useState({name: ""})
  const [todos, setTodos] = useState([])
  const [message, setMessage] = useState(null)
  const authContext = useContext(AuthContext)

  useEffect(() => {
    getTodos().then(res => setTodos(res.todos))
  }, [])

  const onChange = e => {
    setTodo({name: e.target.value})
  }

  const resetForm = () => {
    setTodo({name: ""})
  }

  const resetMessage = () => {
    setMessage(null)
  }

  const onSubmit = e => {
    e.preventDefault()
    postTodos(todo).then(res => {
      const { message } = res
      resetForm()
      if (!message.msgError) {
        getTodos().then(res => {
          setTodos(res.todos)
          setMessage(message)
          setTimeout(() => {
            resetMessage()
          }, 1500)
        })
      } else if (message.msgBody === 'Unauthorized') {
        setMessage(message)
        authContext.setUser({username : "", role: ""})
        authContext.setIsAuthenticated(false)
      } else {
        setMessage(message)
      }
    })
  }

  return (
    <div>
      <h1>Todos</h1>
      <ul>
        { todo ? todos.map(todo => <TodoItem key={todo._id} todo={todo} />) : <h1>stuff</h1> }
      </ul>
      <br/>
      <form onSubmit={onSubmit}>
        <label htmlFor="todo">Enter Todo</label>
        <input 
          type="text"
          name="todo"
          value={todo.name}
          onChange={onChange}
          placeholder="Please enter todo"
        />
        <button type="submit">Submit</button>
      </form>
      {message ? <Message message={message} /> : null}
    </div>
  )
}

export default Todos
