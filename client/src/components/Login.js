import React, { useState, useContext } from 'react'
import { login } from '../actions/AuthActions'
import { AuthContext } from '../context/AuthContext'
import Message from '../components/Message'


const Login = props => {
  const [user, setUser] = useState({username: "", password: ""})
  const [message, setMessage] = useState(null)
  const authContext = useContext(AuthContext)

  const onChange = e => {
    setUser({...user, [e.target.name]: e.target.value})
  }

  const resetForm = () =>{
    setUser({username : "", password : ""});
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const res = await login(user)

    if (res.isAuthenticated) {
      authContext.setUser(res.user)
      authContext.setIsAuthenticated(res.isAuthenticated)
      props.history.push('/todos')
    } else {
      resetForm()
      setMessage(res.message)
    }  
  }


  return (
    <div>
      <form onSubmit={onSubmit}>
        <h3>Please sign in</h3>
        <label htmlFor="username">Username: </label>
        <input 
          type="text"
          name="username"
          value={user.username}
          onChange={onChange}
          className="form-control"
          placeholder="Enter username"
        />
        <label htmlFor="password">Password: </label>
        <input 
          type="password"
          name="password"
          value={user.password}
          onChange={onChange}
          className="form-control"
          placeholder="Enter password"
        />
        <button type="submit">Log in</button>
      </form>
       {message ? <Message message={message}/> : null}
    </div>
  )
}

export default Login