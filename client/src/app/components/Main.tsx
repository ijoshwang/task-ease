'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { Container } from '@mui/material'

import { createTodo, deleteTodo, getTodos, Todo, updateTodo } from '@/services'

import FilterSort from './FilterSort'
import Header from './Header'
import TodoForm from './TodoForm'
import TodoList from './TodoList'

const Main: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [sortBy, setSortBy] = useState<string>('dueDate')
  const [sortOrder, setSortOrder] = useState<string>('asc')
  const [newTodo, setNewTodo] = useState<Todo | null>(null)
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const todosResponse = await getTodos(filterStatus, sortBy, sortOrder)
        setTodos(todosResponse)
      } catch (error) {
        console.error('Error fetching todos:', error)
      }
    }

    fetchData()
  }, [filterStatus, sortBy, sortOrder])

  const handleCreateTodo = () => {
    setNewTodo({
      name: '',
      description: '',
      dueDate: '',
      status: 0, // Default to Not Started
    })
  }

  const handleSaveNewTodo = async () => {
    if (newTodo) {
      try {
        await createTodo(newTodo)
        const todosResponse = await getTodos(filterStatus, sortBy, sortOrder)
        setTodos(todosResponse)
        setNewTodo(null) // Clear the new todo form
      } catch (error) {
        console.error('Error creating todo:', error)
      }
    }
  }

  const handleUpdateTodoStatus = async (id: string, status: number) => {
    const todo = todos.find((t) => t.id === id)

    if (todo) {
      try {
        await updateTodo(id, { ...todo, status })
        setTodos(todos.map((t) => (t.id === id ? { ...t, status } : t)))
      } catch (error) {
        console.error('Error updating todo:', error)
      }
    }
  }

  const handleEditTodo = (todo: Todo) => {
    setEditingTodo(todo)
    setNewTodo(todo)
  }

  const handleSaveTodo = async () => {
    if (editingTodo) {
      try {
        await updateTodo(editingTodo.id!, newTodo!)
        const todosResponse = await getTodos(filterStatus, sortBy, sortOrder)
        setTodos(todosResponse)
        setEditingTodo(null)
        setNewTodo(null)
      } catch (error) {
        console.error('Error saving todo:', error)
      }
    }
  }

  const handleDeleteTodo = async (id: string) => {
    try {
      await deleteTodo(id)
      const todosResponse = await getTodos(filterStatus, sortBy, sortOrder)
      setTodos(todosResponse)
    } catch (error) {
      console.error('Error deleting todo:', error)
    }
  }

  const handleFilterChange = (event: SelectChangeEvent<string>) => {
    setFilterStatus(event.target.value)
  }

  const handleSortChange = (by: string, order: string) => {
    setSortBy(by)
    setSortOrder(order)
  }

  const filteredTodos = useMemo(() => {
    return todos
      .filter((todo) =>
        filterStatus === 'all' ? true : todo.status === Number(filterStatus)
      )
      .sort((a, b) => {
        if (sortOrder === 'asc') {
          return a[sortBy as keyof Todo] > b[sortBy as keyof Todo] ? 1 : -1
        } else {
          return a[sortBy as keyof Todo] < b[sortBy as keyof Todo] ? 1 : -1
        }
      })
  }, [todos, filterStatus, sortBy, sortOrder])

  return (
    <Container>
      <Header onCreateTodo={handleCreateTodo} />
      <FilterSort
        filterStatus={filterStatus}
        sortBy={sortBy}
        sortOrder={sortOrder}
        handleFilterChange={handleFilterChange}
        handleSortChange={handleSortChange}
      />
      <TodoList
        todos={filteredTodos}
        handleEditTodo={handleEditTodo}
        handleUpdateTodoStatus={handleUpdateTodoStatus}
        handleDeleteTodo={handleDeleteTodo}
      />
      {newTodo && (
        <TodoForm
          newTodo={newTodo}
          setNewTodo={setNewTodo}
          handleSaveNewTodo={handleSaveNewTodo}
          handleCancelNewTodo={() => setNewTodo(null)}
        />
      )}
    </Container>
  )
}

export default Main
