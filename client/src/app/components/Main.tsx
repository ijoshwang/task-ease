'use client'

import { useEffect, useMemo, useState } from 'react'
import { Container, SelectChangeEvent } from '@mui/material'
import { useRouter } from 'next/navigation'

import { createTodo, deleteTodo, getTodos, Todo, updateTodo } from '@/services'

import FilterSort from './FilterSort'
import Header from './Header'
import TodoList from './TodoList'

export default function Main() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [sortBy, setSortBy] = useState<string>('dueDate')
  const [sortOrder, setSortOrder] = useState<string>('asc')
  const [newTodo, setNewTodo] = useState<Todo | null>(null)
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null)
  const router = useRouter()

  useEffect(() => {
    const handleUnauthorized = (event: MessageEvent) => {
      if (event.data.type === 'UNAUTHORIZED') {
        localStorage.removeItem('AUTH_TOKEN')
        router.push('/signin')
      }
    }

    globalThis.addEventListener('message', handleUnauthorized)

    return () => {
      // Remove the event listener when the component unmounts
      globalThis.removeEventListener('message', handleUnauthorized)
    }
  }, [router])

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

  const handleEditTodo = (todo: Todo | null) => {
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
        const aValue = a[sortBy as keyof Todo]
        const bValue = b[sortBy as keyof Todo]

        if (aValue === undefined || bValue === undefined) {
          return 0
        }

        if (sortOrder === 'asc') {
          return aValue > bValue ? 1 : -1
        } else {
          return aValue < bValue ? 1 : -1
        }
      })
  }, [todos, filterStatus, sortBy, sortOrder])

  return (
    <Container maxWidth="xl">
      <Header />
      <FilterSort
        onCreateTodo={handleCreateTodo}
        filterStatus={filterStatus}
        sortBy={sortBy}
        sortOrder={sortOrder}
        handleFilterChange={handleFilterChange}
        handleSortChange={handleSortChange}
      />
      <TodoList
        todos={filteredTodos}
        newTodo={newTodo}
        setNewTodo={setNewTodo}
        handleSaveNewTodo={handleSaveNewTodo}
        handleEditTodo={handleEditTodo}
        handleUpdateTodoStatus={handleUpdateTodoStatus}
        handleDeleteTodo={handleDeleteTodo}
      />
    </Container>
  )
}
