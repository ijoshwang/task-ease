import { useState } from 'react'
import CheckIcon from '@mui/icons-material/Check'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from '@mui/material'

import { Todo } from '@/services'

import TodoForm from './TodoForm'

interface TodoItemProps {
  todo: Todo
  handleEditTodo: (todo: Todo | null) => void
  handleUpdateTodoStatus: (id: string, status: number) => void
  handleDeleteTodo: (id: string) => void
}

export default function TodoItem({
  todo,
  handleEditTodo,
  handleUpdateTodoStatus,
  handleDeleteTodo,
}: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(todo)

  const handleSave = () => {
    handleEditTodo(currentTodo)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setCurrentTodo(todo)
    setIsEditing(false)
  }

  if (isEditing) {
    return (
      <TodoForm
        newTodo={currentTodo}
        setNewTodo={setCurrentTodo}
        handleSaveNewTodo={handleSave}
        handleCancelNewTodo={handleCancel}
      />
    )
  }

  return (
    <Card>
      <CardHeader
        title={todo.name}
        subheader={`Due: ${new Date(todo.dueDate).toLocaleDateString()}`}
      />
      <CardContent>
        <Typography>{todo.description}</Typography>
      </CardContent>
      <CardActions>
        <div
          style={{
            padding: '8px 16px',
            borderRadius: '12px',
            fontSize: '12px',
            fontWeight: '500',
            backgroundColor:
              todo.status === 0
                ? '#ffebee'
                : todo.status === 1
                ? '#fff8e1'
                : '#e8f5e9',
            color:
              todo.status === 0
                ? '#c62828'
                : todo.status === 1
                ? '#f9a825'
                : '#2e7d32',
          }}
        >
          {todo.status === 0
            ? 'Not Started'
            : todo.status === 1
            ? 'In Progress'
            : 'Completed'}
        </div>
        <div>
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
        </div>
      </CardActions>
    </Card>
  )
}
