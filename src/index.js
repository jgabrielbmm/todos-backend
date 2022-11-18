const express = require('express')
const {v4: uuidv4} = require('uuid')
const db_users = []

const app = express()

app.use(express.json())

function checkIfNotExistsUserAccount(request, response, next){
  const { username } = request.body
  const userExists = db_users.some(user => user.username === username)
  
  if (userExists) {
    return response.status(400).send({error: "User already exists"})
  } 

  return next()

}

function checkIfExistsUserAccount(request, response, next){
  const { username } = request.headers
  const user = db_users.find(user => user.username === username)

  if(!user) {
    return response.status(400).send({error: "User not found"})
  }

  request.user = user

  return next()
}

app.post('/users', checkIfNotExistsUserAccount, (request, response) => {
  const {name, username} = request.body
  const newUser = {
    name,
    username,
    id: uuidv4(),
    todos: []
  }
  
  db_users.push(newUser)

  return response.status(201).send()
})

app.get('/users', (request, response) => {
  return response.send({users: db_users})
})

app.get('/todos', checkIfExistsUserAccount, (request , response) => {
  const { user } = request
  return response.send(user.todos)
})

app.post('/todos', checkIfExistsUserAccount, (request, response) => {
  const { user } = request
  const { title, deadline } = request.body

  const newTodo = {
    id: uuidv4(),
    title,
    done: false,
    deadline: new Date(deadline),
    created_at: new Date()
  }

  user.todos.push(newTodo)

  return response.status(201).send()

} )

app.put('/todos/:id', checkIfExistsUserAccount, (request, response) => {
  const { user } = request
  const { id } = request.params
  const { title, deadline } = request.body

  const todoToEdit = user.todos.find(todo => todo.id === id)

  if (!todoToEdit){
    return response.status(404).send({error: "Task not found"})
  }

  user.todos.map(todo => {
    if(todo.id === id){
      todo.title = title
      todo.deadline = deadline
      return todo
    }
    return todo
  })

  return response.status(204).send()
})

app.delete('/todos/:id', checkIfExistsUserAccount, (request, response) => {
  const { user } = request
  const { id } = request.params

  const todoIndex = user.todos.findIndex(todo => todo.id === id)

  if (todoIndex === -1){
    return response.status(404).send({error: "Task not found"})
  }

  user.todos.splice(todoIndex, 1)  
  return response.status(204).send()
})

app.patch('/todos/:id/done', checkIfExistsUserAccount, (request, response) => {
  const { user } = request
  const { id } = request.params
  const existsTodo = user.todos.some(todo => todo.id === id)
  
  if(!existsTodo) {
    return response.status(404).send({error: "Task not found"})
  }

  user.todos.map(todo => {
    if(todo.id === id){
      todo.done = true
      return todo
    }

    return todo
  })

  
  return response.status(204).send()
})

app.listen(3333)