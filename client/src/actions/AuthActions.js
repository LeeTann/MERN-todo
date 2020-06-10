import axios from 'axios'

export const login = async (user) => {
  try {
    console.log(user)
    const headers = {'Content-Type': 'application/json'}

    const res = await axios.post('/api/login', user, headers)
    console.log(res)
    return res.data
  } catch (error) {
    return {
      isAuthenticated: false, 
      user: {username: "", role: ""}, 
      message: {msgBody: "Invalid Credentials. Please try again!!!", msgError: true}
    }
  }
}

// export const register = (user) => {
//   return fetch('/api/register',{
//     method : "post",
//     body : JSON.stringify(user),
//     headers : {
//         'Content-Type' : 'application/json'
//     }
//   }).then(res => res.json())
//     .then(data => data);
// }

export const register = async (user) => {
  const res = await fetch('/api/register',{
    method : "post",
    body : JSON.stringify(user),
    headers : {
        'Content-Type' : 'application/json'
    }
  })

  return res.json()
}

export const logout = async () => {
  const res = await axios.get('/api/logout')

  return res.data
}

export const Authenticated = async () => {
  try {
    const res = await axios.get('/api/authenticated')
    console.log(res)
  
    return res.data
  } catch (error) {
    console.log(error)
    return error
  }
}
