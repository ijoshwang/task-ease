import { Button, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'

import { signOut } from '@/services'

interface HeaderProps {
  onCreateTodo: () => void
}

const Header: React.FC<HeaderProps> = ({ onCreateTodo }) => {
  const router = useRouter()

  const handleSignOut = () => {
    signOut() // Calls the sign-out service which will manage the token
    router.push('/signin') // Redirects to the sign-in page
  }

  return (
    <header style={{ backgroundColor: '#333', color: '#fff', padding: '16px' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4">Todo Lists</Typography>
        <div>
          <Button variant="contained" color="primary" onClick={onCreateTodo}>
            Create Todo
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleSignOut}
            style={{ marginLeft: '10px' }}
          >
            Sign Out
          </Button>
        </div>
      </div>
    </header>
  )
}

export default Header
