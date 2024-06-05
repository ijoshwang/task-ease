'use client'

import React, { useEffect, useState } from 'react'

import {
  AUTH_TOKEN,
  createTodo,
  deleteTodo,
  getTodos,
  signIn,
  Todo,
  updateTodo,
  UserCredentials,
} from '../services'

const ExampleComponent: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [token, setToken] = useState<string | null>(null)
  const [status, setStatus] = useState<string | undefined>(undefined)
  const [sortBy, setSortBy] = useState<string | undefined>(undefined)
  const [sortOrder, setSortOrder] = useState<string | undefined>(undefined)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const todosResponse = await getTodos(status, sortBy, sortOrder)
        setTodos(todosResponse) // Directly setting the todos list
      } catch (error) {
        console.error('Error fetching todos:', error)
      }
    }

    if (token) {
      fetchData()
    }
  }, [token, status, sortBy, sortOrder])

  const handleSignIn = async () => {
    const credentials: UserCredentials = { name: 'Alice', password: 'todoapp' }

    try {
      const response = await signIn(credentials)
      setToken(response.token)
      globalThis.localStorage.setItem(AUTH_TOKEN, response.token)
      console.log('Signed in successfully')
    } catch (error) {
      console.error('Error signing in:', error)
    }
  }

  const handleCreateTodo = async () => {
    const newTodo: Todo = {
      name: 'New Task',
      description: 'This is a new task.',
      dueDate: '2024-06-01T00:00:00Z',
    }

    try {
      const response = await createTodo(newTodo)
      setTodos([...todos, response])
      console.log('Created Todo:', response)
    } catch (error) {
      console.error('Error creating todo:', error)
    }
  }

  const handleUpdateTodo = async (todoId: string) => {
    const updatedTodo: Todo = {
      name: 'Updated Task',
      description: 'This is an updated task.',
      dueDate: '2024-06-10T00:00:00Z',
    }

    try {
      await updateTodo(todoId, updatedTodo)
      setTodos(todos.map((t) => (t.id === todoId ? updatedTodo : t)))
      console.log('Updated Todo:', updatedTodo)
    } catch (error) {
      console.error('Error updating todo:', error)
    }
  }

  const handleDeleteTodo = async (todoId: string) => {
    try {
      await deleteTodo(todoId)
      setTodos(todos.filter((t) => t.id !== todoId))
      console.log('Deleted Todo:', todoId)
    } catch (error) {
      console.error('Error deleting todo:', error)
    }
  }

  return (
    <div>
      <button onClick={handleSignIn}>Sign In</button>
      <button onClick={handleCreateTodo}>Create Todo</button>
      <div>
        <label>
          Status:
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">All</option>
            <option value="0">Not Started</option>
            <option value="1">In Progress</option>
            <option value="2">Completed</option>
          </select>
        </label>
        <label>
          Sort By:
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="">None</option>
            <option value="createTime">Create Time</option>
            <option value="dueDate">Due Date</option>
            <option value="name">Name</option>
          </select>
        </label>
        <label>
          Sort Order:
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </label>
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.name}
            <button onClick={() => handleUpdateTodo(todo.id!)}>Update</button>
            <button onClick={() => handleDeleteTodo(todo.id!)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ExampleComponent
