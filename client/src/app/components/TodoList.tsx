import { Grid } from '@mui/material'

import { Todo } from '@/services'

import TodoForm from './TodoForm'
import TodoItem from './TodoItem'

interface TodoListProps {
  todos: Todo[]
  newTodo: Todo | null
  setNewTodo: React.Dispatch<React.SetStateAction<Todo | null>>
  handleSaveNewTodo: () => void
  handleEditTodo: (todo: Todo) => void
  handleUpdateTodoStatus: (id: string, status: number) => void
  handleDeleteTodo: (id: string) => void
}

export default function TodoList({
  todos,
  newTodo,
  setNewTodo,
  handleSaveNewTodo,
  handleEditTodo,
  handleUpdateTodoStatus,
  handleDeleteTodo,
}: TodoListProps) {
  return (
    <Grid container spacing={2}>
      {newTodo && (
        <TodoForm
          newTodo={newTodo}
          setNewTodo={setNewTodo}
          handleSaveNewTodo={handleSaveNewTodo}
          handleCancelNewTodo={() => setNewTodo(null)}
        />
      )}
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
}
