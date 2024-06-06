import CheckIcon from '@mui/icons-material/Check'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import {
  Box,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
} from '@mui/material'

import { Todo } from '@/services'

import TodoForm from './TodoForm'

interface TodoItemProps {
  todo: Todo
  isEditing: boolean
  setEditingId: (id: string) => void
  handleEditTodo: (todo: Todo | null) => void
  handleUpdateTodoStatus: (id: string, status: number) => void
  handleDeleteTodo: (id: string) => void
}

export default function TodoItem({
  todo,
  isEditing,
  setEditingId,
  handleEditTodo,
  handleUpdateTodoStatus,
  handleDeleteTodo,
}: TodoItemProps) {
  const handleSave = () => {
    // handleEditTodo(currentTodo)
  }

  const handleCancel = () => {
    // setCurrentTodo(todo)
  }

  if (isEditing) {
    return (
      <TodoForm
        newTodo={todo}
        // setNewTodo={setCurrentTodo}
        handleSaveNewTodo={handleSave}
        handleCancelNewTodo={handleCancel}
      />
    )
  }

  return (
    <Card>
      <CardContent
        sx={{
          pb: 0,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontSize: '18px',
            height: '32px',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
          }}
          title={todo.name}
        >
          {todo.name}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            height: '42px',
            overflow: 'hidden',
          }}
          color="text.secondary"
        >
          {todo.description}
        </Typography>
        <Box
          sx={{
            mt: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          {todo.status === 0 ? (
            <Typography
              sx={{
                bgcolor: '#ffebee',
                color: '#c62828',
                fontSize: '12px',
                fontWeight: 500,
                padding: '4px 8px',
                borderRadius: '20px',
              }}
            >
              Not Started
            </Typography>
          ) : null}
          {todo.status === 1 ? (
            <Typography
              sx={{
                bgcolor: '#fff8e1',
                color: '#f9a825',
                fontSize: '12px',
                fontWeight: 500,
                padding: '4px 8px',
                borderRadius: '20px',
              }}
            >
              In Progress
            </Typography>
          ) : null}
          {todo.status === 2 ? (
            <Typography
              sx={{
                bgcolor: '#e8f5e9',
                color: '#2e7d32',
                fontSize: '12px',
                fontWeight: 500,
                padding: '4px 8px',
                borderRadius: '20px',
              }}
            >
              Completed
            </Typography>
          ) : null}
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              fontSize: '12px',
            }}
          >
            {`Due: ${new Date(todo.dueDate).toLocaleDateString()}`}
          </Typography>
        </Box>
      </CardContent>
      <CardActions>
        {todo.status === 0 ? (
          <IconButton onClick={() => handleUpdateTodoStatus(todo.id!, 1)}>
            <PlayArrowIcon fontSize="small" />
          </IconButton>
        ) : null}
        {todo.status === 1 ? (
          <IconButton onClick={() => handleUpdateTodoStatus(todo.id!, 2)}>
            <CheckIcon fontSize="small" />
          </IconButton>
        ) : null}
        <IconButton
          onClick={() => {
            setEditingId(todo.id || '')
          }}
        >
          <EditIcon fontSize="small" />
        </IconButton>
        <IconButton onClick={() => handleDeleteTodo(todo.id!)}>
          <DeleteIcon fontSize="small" />
        </IconButton>
      </CardActions>
    </Card>
  )
}
