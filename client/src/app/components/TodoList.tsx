import { useState } from 'react'
import { Grid } from '@mui/material'

import { Todo } from '@/services'

import TodoForm from './TodoForm'
import TodoItem from './TodoItem'

interface TodoListProps {
  todos: Todo[]
  newTodo: Todo | null
  handleSaveTodo: (id: string, todo: Todo) => Promise<void>
  handleCancel: () => void
  handleUpdateTodoStatus: (id: string, status: number) => void
  handleDeleteTodo: (id: string) => void
}

export default function TodoList({
  todos,
  newTodo,
  handleSaveTodo,
  handleCancel,
  handleUpdateTodoStatus,
  handleDeleteTodo,
}: TodoListProps) {
  const [editingId, setEditingId] = useState('')

  return (
    <Grid container spacing={2}>
      {newTodo && (
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
          <TodoForm
            edittingTodo={newTodo}
            // setNewTodo={setNewTodo}
            handleSaveTodo={handleSaveTodo}
            handleCancel={handleCancel}
          />
        </Grid>
      )}
      {todos.map((todo) => (
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={todo.id}>
          <TodoItem
            isEditing={editingId === todo.id}
            setEditingId={setEditingId}
            todo={todo}
            handleSaveTodo={handleSaveTodo}
            handleUpdateTodoStatus={handleUpdateTodoStatus}
            handleDeleteTodo={handleDeleteTodo}
          />
        </Grid>
      ))}
    </Grid>
  )
}
