import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import { logout } from '../actions/AuthActions'
import { AuthContext } from '../context/AuthContext'

const Navbar = props => {
  const { isAuthenticated, setIsAuthenticated, user, setUser } = useContext(AuthContext)

  const LogoutHandler = async () => {
    const data = await logout()
    console.log(data)
    setUser(data.user)
    setIsAuthenticated(false)
  }

  const unAuthenticatedNavbar = () => {
    return (
      <>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/register">Register</Link></li>
        <li><Link to="/login">Login</Link></li>
      </>
    )
  }

  const authenticatedNavbar = () => {
    return (
      <>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/todos">Todos</Link></li>
        <li>{user.role === "admin" ? <Link to="/admin">Admin</Link> : null}</li>
        <button onClick={LogoutHandler}>Logout</button>
      </>
    )
  }
  return (
    <nav>
      <Link to="/">Lambda-Todo</Link>
      <div>
        <ul>
          { !isAuthenticated ? unAuthenticatedNavbar() : authenticatedNavbar() }
        </ul>
      </div>
    </nav>
  )
}

export default Navbar