import React from 'react'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
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
  Typography,
} from '@mui/material'

import { Todo } from '@/services'

interface TodoItemProps {
  todo: Todo
  handleEditTodo: (todo: Todo) => void
  handleUpdateTodoStatus: (id: string, status: number) => void
  handleDeleteTodo: (id: string) => void
}

export default function TodoItem({
  todo,
  handleEditTodo,
  handleUpdateTodoStatus,
  handleDeleteTodo,
}: TodoItemProps) {
  const [isEditing, setIsEditing] = React.useState(false)
  const [editedTodo, setEditedTodo] = React.useState<Todo>(todo)

  const handleSaveEdit = () => {
    handleEditTodo(editedTodo)
    setIsEditing(false)
  }

  const handleCancelEdit = () => {
    setEditedTodo(todo)
    setIsEditing(false)
  }

  return (
    <Card>
      <CardHeader
        title={
          isEditing ? (
            <TextField
              fullWidth
              variant="outlined"
              value={editedTodo.name}
              onChange={(e) =>
                setEditedTodo({ ...editedTodo, name: e.target.value })
              }
            />
          ) : (
            todo.name
          )
        }
        subheader={`Due: ${new Date(todo.dueDate).toLocaleDateString()}`}
      />
      <CardContent>
        {isEditing ? (
          <>
            <TextField
              fullWidth
              variant="outlined"
              value={editedTodo.description}
              onChange={(e) =>
                setEditedTodo({ ...editedTodo, description: e.target.value })
              }
              multiline
              rows={4}
            />
            <TextField
              fullWidth
              variant="outlined"
              type="date"
              value={editedTodo.dueDate}
              onChange={(e) =>
                setEditedTodo({ ...editedTodo, dueDate: e.target.value })
              }
            />
            <FormControl fullWidth variant="outlined">
              <InputLabel>Status</InputLabel>
              <Select
                value={editedTodo.status!.toString()}
                onChange={(e) =>
                  setEditedTodo({
                    ...editedTodo,
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
          style={{
            padding: '8px 16px',
            borderRadius: '12px',
            fontSize: '12px',
            fontWeight: '500',
            backgroundColor: isEditing
              ? '#e3f2fd'
              : todo.status === 0
              ? '#ffebee'
              : todo.status === 1
              ? '#fff8e1'
              : '#e8f5e9',
            color: isEditing
              ? '#1e88e5'
              : todo.status === 0
              ? '#c62828'
              : todo.status === 1
              ? '#f9a825'
              : '#2e7d32',
          }}
        >
          {isEditing
            ? 'Editing'
            : todo.status === 0
            ? 'Not Started'
            : todo.status === 1
            ? 'In Progress'
            : 'Completed'}
        </div>
        <div>
          {isEditing ? (
            <>
              <IconButton onClick={handleSaveEdit}>
                <CheckIcon />
              </IconButton>
              <IconButton onClick={handleCancelEdit}>
                <CloseIcon />
              </IconButton>
            </>
          ) : (
            <>
              <IconButton onClick={() => handleUpdateTodoStatus(todo.id!, 1)}>
                <PlayArrowIcon />
              </IconButton>
              <IconButton onClick={() => handleUpdateTodoStatus(todo.id!, 2)}>
                <CheckIcon />
              </IconButton>
              <IconButton onClick={() => setIsEditing(true)}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => handleDeleteTodo(todo.id!)}>
                <DeleteIcon />
              </IconButton>
            </>
          )}
        </div>
      </CardActions>
    </Card>
  )
}
