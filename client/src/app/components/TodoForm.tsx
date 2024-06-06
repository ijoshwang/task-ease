import React from 'react'
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
  newTodo: Todo | null
  // setNewTodo: React.Dispatch<React.SetStateAction<Todo | null>>
  handleSaveNewTodo: () => void
  handleCancelNewTodo: () => void
}

export default function TodoForm({
  newTodo,
  // setNewTodo,
  handleSaveNewTodo,
  handleCancelNewTodo,
}: TodoFormProps) {
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
              // p: '8px 16px',
            }}
          >
            <TextField
              fullWidth
              variant="standard"
              value={newTodo?.name}
              // label="Title"
              placeholder="Title"
              autoFocus
              size="small"
              // onChange={(e) =>
              //   setNewTodo((prevTodo) => ({
              //     ...prevTodo!,
              //     name: e.target.value,
              //   }))
              // }
            />
            <TextField
              fullWidth
              variant="standard"
              value={newTodo?.description}
              placeholder="Description"
              // label="Description"
              size="small"
              // onChange={(e) =>
              //   setNewTodo((prevTodo) => ({
              //     ...prevTodo!,
              //     description: e.target.value,
              //   }))
              // }
            />
            <MobileDatePicker
              // label="Due Date"
              value={newTodo?.dueDate ? dayjs(newTodo?.dueDate) : dayjs()}
              sx={{
                mt: '6px',
                '.MuiInputBase-input': {
                  p: '6px 16px',
                },
              }}
            />
            {/* <TextField
              fullWidth
              variant="standard"
              type="date"
              // value={newTodo?.dueDate}
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
            value={newTodo?.status!.toString()}
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
            <IconButton onClick={handleSaveNewTodo}>
              <CheckIcon fontSize="small" />
            </IconButton>
            <IconButton onClick={handleCancelNewTodo}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </CardActions>
        </Card>
      </Box>
    </LocalizationProvider>
  )
}
