export const getTodos = () => {
  return fetch('/api/todos')
    .then(res => {
      if (res.status !== 401) {
        return res.json()
      } else  {
        return {message: {msgBody: "Invalid Credentials. Not Authorized!!!", msgError: true}}
      }
    })
}

export const postTodos = (todo) => {
  return fetch('/api/todos', {
    method: "post",
    body: JSON.stringify(todo),
    headers: {'Content-Type' : 'application/json'}
  })
  .then(res => {
    if (res.status !== 401) {
      return res.json()
    } else {
      return {message: {msgBody: "Invalid Credentials. Not Authorized!!!", msgError: true}}
    }
  })
}
