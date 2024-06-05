import React from 'react'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material'

import { Todo } from '@/services'

interface TodoFormProps {
  newTodo: Todo
  setNewTodo: React.Dispatch<React.SetStateAction<Todo | null>>
  handleSaveNewTodo: () => void
  handleCancelNewTodo: () => void
}

const TodoForm: React.FC<TodoFormProps> = ({
  newTodo,
  setNewTodo,
  handleSaveNewTodo,
  handleCancelNewTodo,
}) => (
  <Card>
    <CardHeader
      title={
        <TextField
          fullWidth
          variant="outlined"
          value={newTodo.name}
          onChange={(e) => setNewTodo({ ...newTodo, name: e.target.value })}
        />
      }
    />
    <CardContent>
      <TextField
        fullWidth
        variant="outlined"
        value={newTodo.description}
        onChange={(e) =>
          setNewTodo({ ...newTodo, description: e.target.value })
        }
        multiline
        rows={4}
      />
      <TextField
        fullWidth
        variant="outlined"
        type="date"
        value={newTodo.dueDate}
        onChange={(e) => setNewTodo({ ...newTodo, dueDate: e.target.value })}
      />
      <FormControl fullWidth variant="outlined">
        <InputLabel>Status</InputLabel>
        <Select
          value={newTodo.status!.toString()}
          onChange={(e) =>
            setNewTodo({ ...newTodo, status: Number(e.target.value) })
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
      <IconButton onClick={handleCancelNewTodo}>
        <CloseIcon />
      </IconButton>
    </CardActions>
  </Card>
)

export default TodoForm
