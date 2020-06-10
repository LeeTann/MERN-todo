import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Login from './components/Login'

import './App.module.css'
import Register from './components/Register'
import Todos from './components/Todos'
import Admin from './components/Admin'
import PrivateRoute from './hoc/PrivateRoute'
import UnPrivateRoute from './hoc/UnPrivateRoute'

function App() {

  return (
    <Router>
      <Navbar />
      <Route exact path="/" component={Home} />
      <UnPrivateRoute path="/login" component={Login} />
      <UnPrivateRoute path="/register" component={Register} />
      <PrivateRoute path='/todos'component={Todos} roles={["user", "admin"]} />
      <PrivateRoute path="/admin" component={Admin} roles={["admin"]} />
    </Router>
  )
}

export default App
