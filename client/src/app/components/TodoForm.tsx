import { useState } from 'react'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import {
  Box,
  Card,
  CardActions,
  CardContent,
  IconButton,
  TextField,
} from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker'
import dayjs from 'dayjs'

import { Todo } from '@/services'

interface TodoFormProps {
  edittingTodo: Todo
  handleSaveTodo: (id: string, todo: Todo) => Promise<void>
  handleCancel: () => void
  setEditingId?: (id: string) => void
}

export default function TodoForm({
  edittingTodo,
  handleSaveTodo,
  handleCancel,
  setEditingId,
}: TodoFormProps) {
  const [todo, setTodo] = useState<Todo>(edittingTodo)

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{
          position: 'relative',
        }}
      >
        <Card
          raised={true}
          sx={{
            position: 'absolute',
            width: '100%',
          }}
        >
          <CardContent
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            <TextField
              autoFocus
              fullWidth
              variant="standard"
              value={todo.name}
              placeholder="Title"
              size="small"
              onChange={(e) =>
                setTodo({
                  ...todo,
                  name: e.target.value,
                })
              }
            />
            <TextField
              fullWidth
              variant="standard"
              value={todo.description}
              placeholder="Description"
              size="small"
              onChange={(e) =>
                setTodo({
                  ...todo,
                  description: e.target.value,
                })
              }
            />
            <MobileDatePicker
              value={dayjs(todo.dueDate)}
              sx={{
                mt: '6px',
                '.MuiInputBase-input': {
                  p: '6px 16px',
                },
              }}
              onChange={(value) => {
                setTodo({
                  ...todo,
                  dueDate: dayjs(value).toString(),
                })
              }}
            />
            {/* <TextField
              fullWidth
              variant="standard"
              type="date"
              // value={todo?.dueDate}
              value={new Date().getTime()}
              label="Due Date"
              // onChange={(e) =>
              //   setNewTodo((prevTodo) => ({
              //     ...prevTodo!,
              //     dueDate: e.target.value,
              //   }))
              // }
            /> */}
            {/* <FormControl fullWidth variant="outlined">
          <InputLabel>Status</InputLabel>
          <Select
            value={todo?.status!.toString()}
            // onChange={(e) =>
            //   setNewTodo((prevTodo) => ({
            //     ...prevTodo!,
            //     status: Number(e.target.value),
            //   }))
            // }
            label="Status"
          >
            <MenuItem value={0}>Not Started</MenuItem>
            <MenuItem value={1}>In Progress</MenuItem>
            <MenuItem value={2}>Completed</MenuItem>
          </Select>
        </FormControl> */}
          </CardContent>
          <CardActions
            sx={{
              pt: 0,
            }}
          >
            <IconButton
              disabled={
                todo.name === '' ||
                todo.description === '' ||
                todo.dueDate === ''
              }
              onClick={async () => {
                await handleSaveTodo(todo.id || '', todo)
                setEditingId && setEditingId('')
              }}
            >
              <CheckIcon fontSize="small" />
            </IconButton>
            <IconButton onClick={handleCancel}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </CardActions>
        </Card>
      </Box>
    </LocalizationProvider>
  )
}
