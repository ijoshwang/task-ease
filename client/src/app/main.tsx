'use client'

import { useEffect, useMemo, useState } from 'react'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material'

import { createTodo, deleteTodo, getTodos, Todo, updateTodo } from '../services'

const Component: React.FC = () => {
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
        const response = await createTodo(newTodo)
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
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <header
        style={{ backgroundColor: '#333', color: '#fff', padding: '16px' }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="h4">Todo Lists</Typography>
        </div>
      </header>
      <main style={{ flex: 1, padding: '24px' }}>
        <div style={{ marginBottom: '24px' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '16px',
            }}
          >
            <Typography variant="h5">Todos</Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleCreateTodo}
            >
              Create Todo
            </Button>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '16px',
            }}
          >
            <div style={{ display: 'flex', gap: '16px' }}>
              <FormControl variant="outlined" size="small">
                <InputLabel>Filter by Status</InputLabel>
                <Select
                  value={filterStatus}
                  onChange={handleFilterChange}
                  label="Filter by Status"
                >
                  <MenuItem value="all">All</MenuItem>
                  <MenuItem value="0">Not Started</MenuItem>
                  <MenuItem value="1">In Progress</MenuItem>
                  <MenuItem value="2">Completed</MenuItem>
                </Select>
              </FormControl>
              <FormControl variant="outlined" size="small">
                <InputLabel>Sort by</InputLabel>
                <Select
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value, sortOrder)}
                  label="Sort by"
                >
                  <MenuItem value="dueDate">Due Date</MenuItem>
                  <MenuItem value="status">Status</MenuItem>
                  <MenuItem value="name">Name</MenuItem>
                </Select>
              </FormControl>
              <FormControl variant="outlined" size="small">
                <InputLabel>Order</InputLabel>
                <Select
                  value={sortOrder}
                  onChange={(e) => handleSortChange(sortBy, e.target.value)}
                  label="Order"
                >
                  <MenuItem value="asc">Ascending</MenuItem>
                  <MenuItem value="desc">Descending</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          <Grid container spacing={2}>
            {newTodo && (
              <Grid item xs={12} md={6} lg={4}>
                <Card>
                  <CardHeader
                    title={
                      <TextField
                        fullWidth
                        variant="outlined"
                        value={newTodo.name}
                        onChange={(e) =>
                          setNewTodo({ ...newTodo, name: e.target.value })
                        }
                      />
                    }
                  />
                  <CardContent>
                    <TextField
                      fullWidth
                      variant="outlined"
                      value={newTodo.description}
                      onChange={(e) =>
                        setNewTodo({
                          ...newTodo,
                          description: e.target.value,
                        })
                      }
                      multiline
                      rows={4}
                    />
                    <TextField
                      fullWidth
                      variant="outlined"
                      type="date"
                      value={newTodo.dueDate}
                      onChange={(e) =>
                        setNewTodo({ ...newTodo, dueDate: e.target.value })
                      }
                    />
                    <FormControl fullWidth variant="outlined">
                      <InputLabel>Status</InputLabel>
                      <Select
                        value={newTodo.status!.toString()} // Convert number to string for Select component
                        onChange={(e) =>
                          setNewTodo({
                            ...newTodo,
                            status: Number(e.target.value),
                          })
                        }
                        label="Status"
                      >
                        <MenuItem value={0}>Not Started</MenuItem>
                        <MenuItem value={1}>In Progress</MenuItem>
                        <MenuItem value={2}>Completed</MenuItem>
                      </Select>
                    </FormControl>
                  </CardContent>
                  <CardActions>
                    <IconButton onClick={handleSaveNewTodo}>
                      <CheckIcon />
                    </IconButton>
                    <IconButton onClick={() => setNewTodo(null)}>
                      <CloseIcon />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            )}
            {filteredTodos.map((todo) => (
              <Grid item xs={12} md={6} lg={4} key={todo.id}>
                <Card>
                  <CardHeader
                    title={
                      editingTodo?.id === todo.id ? (
                        <TextField
                          fullWidth
                          variant="outlined"
                          value={newTodo?.name}
                          onChange={(e) =>
                            setNewTodo({ ...newTodo!, name: e.target.value })
                          }
                        />
                      ) : (
                        todo.name
                      )
                    }
                    subheader={`Due: ${new Date(
                      todo.dueDate
                    ).toLocaleDateString()}`}
                  />
                  <CardContent>
                    {editingTodo?.id === todo.id ? (
                      <>
                        <TextField
                          fullWidth
                          variant="outlined"
                          value={newTodo?.description}
                          onChange={(e) =>
                            setNewTodo({
                              ...newTodo!,
                              description: e.target.value,
                            })
                          }
                          multiline
                          rows={4}
                        />
                        <TextField
                          fullWidth
                          variant="outlined"
                          type="date"
                          value={newTodo?.dueDate}
                          onChange={(e) =>
                            setNewTodo({ ...newTodo!, dueDate: e.target.value })
                          }
                        />
                        <FormControl fullWidth variant="outlined">
                          <InputLabel>Status</InputLabel>
                          <Select
                            value={newTodo?.status!.toString()} // Convert number to string for Select component
                            onChange={(e) =>
                              setNewTodo({
                                ...newTodo!,
                                status: Number(e.target.value),
                              })
                            }
                            label="Status"
                          >
                            <MenuItem value={0}>Not Started</MenuItem>
                            <MenuItem value={1}>In Progress</MenuItem>
                            <MenuItem value={2}>Completed</MenuItem>
                          </Select>
                        </FormControl>
                      </>
                    ) : (
                      <Typography>{todo.description}</Typography>
                    )}
                  </CardContent>
                  <CardActions>
                    <div
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        editingTodo?.id === todo.id
                          ? 'bg-blue-100 text-blue-600'
                          : todo.status === 0
                          ? 'bg-red-100 text-red-600'
                          : todo.status === 1
                          ? 'bg-yellow-100 text-yellow-600'
                          : 'bg-green-100 text-green-600'
                      }`}
                    >
                      {editingTodo?.id === todo.id
                        ? 'Editing'
                        : todo.status === 0
                        ? 'Not Started'
                        : todo.status === 1
                        ? 'In Progress'
                        : 'Completed'}
                    </div>
                    <div className="flex gap-2">
                      {editingTodo?.id === todo.id ? (
                        <>
                          <IconButton onClick={handleSaveTodo}>
                            <CheckIcon />
                          </IconButton>
                          <IconButton onClick={() => setEditingTodo(null)}>
                            <CloseIcon />
                          </IconButton>
                        </>
                      ) : (
                        <>
                          <IconButton
                            onClick={() => handleUpdateTodoStatus(todo.id!, 1)}
                          >
                            <PlayArrowIcon />
                          </IconButton>
                          <IconButton
                            onClick={() => handleUpdateTodoStatus(todo.id!, 2)}
                          >
                            <CheckIcon />
                          </IconButton>
                          <IconButton onClick={() => handleEditTodo(todo)}>
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            onClick={() => handleDeleteTodo(todo.id!)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </>
                      )}
                    </div>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      </main>
    </div>
  )
}

export default Component
