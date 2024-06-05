import { Button, Typography } from '@mui/material'

interface HeaderProps {
  onCreateTodo: () => void
}

const Header: React.FC<HeaderProps> = ({ onCreateTodo }) => (
  <header style={{ backgroundColor: '#333', color: '#fff', padding: '16px' }}>
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Typography variant="h4">Todo Lists</Typography>
      <Button variant="contained" color="primary" onClick={onCreateTodo}>
        Create Todo
      </Button>
    </div>
  </header>
)

export default Header
