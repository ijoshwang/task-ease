import React from 'react'
import { Grid } from '@mui/material'

import { Todo } from '@/services'

import TodoItem from './TodoItem'

interface TodoListProps {
  todos: Todo[]
  handleEditTodo: (todo: Todo) => void
  handleUpdateTodoStatus: (id: string, status: number) => void
  handleDeleteTodo: (id: string) => void
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  handleEditTodo,
  handleUpdateTodoStatus,
  handleDeleteTodo,
}) => (
  <Grid container spacing={2}>
    {todos.map((todo) => (
      <Grid item xs={12} md={6} lg={4} key={todo.id}>
        <TodoItem
          todo={todo}
          handleEditTodo={handleEditTodo}
          handleUpdateTodoStatus={handleUpdateTodoStatus}
          handleDeleteTodo={handleDeleteTodo}
        />
      </Grid>
    ))}
  </Grid>
)

export default TodoList
