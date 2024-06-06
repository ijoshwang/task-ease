'use client'

import { useMemo, useState } from 'react'
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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
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

interface Todo {
  id: number
  name: string
  description: string
  dueDate: string
  status: string
}

interface User {
  id: number
  name: string
}

const users: User[] = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Smith' },
  { id: 3, name: 'Bob Johnson' },
  { id: 4, name: 'Alice Williams' },
]

const Component: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([
    {
      id: 1,
      name: 'Finish project proposal',
      description: 'Write up the project proposal and send it to the client',
      dueDate: '2024-06-15',
      status: 'In Progress',
    },
    {
      id: 2,
      name: 'Schedule team meeting',
      description: 'Coordinate with the team to find a suitable meeting time',
      dueDate: '2024-06-10',
      status: 'Not Started',
    },
    {
      id: 3,
      name: 'Review marketing campaign',
      description: 'Analyze the performance of the latest marketing campaign',
      dueDate: '2024-06-20',
      status: 'Completed',
    },
    {
      id: 4,
      name: 'Prepare quarterly report',
      description: 'Gather data and create the quarterly financial report',
      dueDate: '2024-06-30',
      status: 'In Progress',
    },
  ])
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [sortBy, setSortBy] = useState<string>('dueDate')
  const [sortOrder, setSortOrder] = useState<string>('asc')
  const [newTodo, setNewTodo] = useState<Todo>({
    id: 0,
    name: '',
    description: '',
    dueDate: '',
    status: 'Not Started',
  })
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null)
  const [showSignIn, setShowSignIn] = useState<boolean>(false)

  const handleCreateTodo = () => {
    const newId = todos.length + 1
    setTodos([
      ...todos,
      {
        ...newTodo,
        id: newId,
      },
    ])
    setNewTodo({
      id: 0,
      name: '',
      description: '',
      dueDate: '',
      status: 'Not Started',
    })
    setEditingTodo({
      ...newTodo,
      id: newId,
    })
  }

  const handleUpdateTodo = (id: number, status: string) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, status } : todo)))
  }

  const handleEditTodo = (todo: Todo) => {
    setEditingTodo(todo)
    setNewTodo(todo)
  }

  const handleSaveTodo = () => {
    setTodos(
      todos.map((todo) =>
        todo.id === editingTodo?.id ? { ...todo, ...newTodo } : todo
      )
    )
    setEditingTodo(null)
    setNewTodo({
      id: 0,
      name: '',
      description: '',
      dueDate: '',
      status: 'Not Started',
    })
  }

  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id))
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
        filterStatus === 'all' ? true : todo.status === filterStatus
      )
      .sort((a, b) => {
        if (sortOrder === 'asc') {
          return a[sortBy as keyof Todo] > b[sortBy as keyof Todo] ? 1 : -1
        } else {
          return a[sortBy as keyof Todo] < b[sortBy as keyof Todo] ? 1 : -1
        }
      })
  }, [todos, filterStatus, sortBy, sortOrder])

  const handleSignIn = (user: User) => {
    console.log(`Signing in as ${user.name}`)
    setShowSignIn(false)
  }

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-gray-900 text-white py-4 px-6">
        <div className="flex justify-between items-center">
          <Typography variant="h4">Todo Lists</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setShowSignIn(true)}
          >
            Sign In
          </Button>
        </div>
      </header>
      {showSignIn && (
        <Dialog open={showSignIn} onClose={() => setShowSignIn(false)}>
          <DialogTitle>Sign In</DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              {users.map((user) => (
                <Grid item xs={6} key={user.id}>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => handleSignIn(user)}
                  >
                    {user.name}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowSignIn(false)} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      )}
      <main className="flex-1 p-6">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <Typography variant="h5">Todos</Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleCreateTodo}
            >
              Create Todo
            </Button>
          </div>
          <div className="flex justify-between items-center mb-4">
            <div className="flex gap-4">
              <FormControl variant="outlined" size="small">
                <InputLabel>Filter by Status</InputLabel>
                <Select
                  value={filterStatus}
                  onChange={handleFilterChange}
                  label="Filter by Status"
                >
                  <MenuItem value="all">All</MenuItem>
                  <MenuItem value="Not Started">Not Started</MenuItem>
                  <MenuItem value="In Progress">In Progress</MenuItem>
                  <MenuItem value="Completed">Completed</MenuItem>
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
            {filteredTodos.map((todo) => (
              <Grid item xs={12} md={6} lg={4} key={todo.id}>
                <Card>
                  <CardHeader
                    title={
                      editingTodo?.id === todo.id ? (
                        <TextField
                          fullWidth
                          variant="outlined"
                          value={newTodo.name}
                          onChange={(e) =>
                            setNewTodo({ ...newTodo, name: e.target.value })
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
                            value={newTodo.status}
                            onChange={(e) =>
                              setNewTodo({ ...newTodo, status: e.target.value })
                            }
                            label="Status"
                          >
                            <MenuItem value="Not Started">Not Started</MenuItem>
                            <MenuItem value="In Progress">In Progress</MenuItem>
                            <MenuItem value="Completed">Completed</MenuItem>
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
                          : todo.status === 'Not Started'
                          ? 'bg-red-100 text-red-600'
                          : todo.status === 'In Progress'
                          ? 'bg-yellow-100 text-yellow-600'
                          : 'bg-green-100 text-green-600'
                      }`}
                    >
                      {editingTodo?.id === todo.id ? 'Editing' : todo.status}
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
                            onClick={() =>
                              handleUpdateTodo(todo.id, 'In Progress')
                            }
                          >
                            <PlayArrowIcon />
                          </IconButton>
                          <IconButton
                            onClick={() =>
                              handleUpdateTodo(todo.id, 'Completed')
                            }
                          >
                            <CheckIcon />
                          </IconButton>
                          <IconButton onClick={() => handleEditTodo(todo)}>
                            <EditIcon />
                          </IconButton>
                          <IconButton onClick={() => handleDeleteTodo(todo.id)}>
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
