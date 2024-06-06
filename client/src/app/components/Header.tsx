import { Box, Button, Typography } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { signOut } from '@/services'

interface HeaderProps {
  onCreateTodo: () => void
}

export default function Header() {
  const router = useRouter()

  const handleSignOut = () => {
    signOut()
    router.push('/signin')
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        py: '14px',
      }}
    >
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          gap: '8px',
        }}
      >
        <Image alt="TaskEase" src="/logo.png" height={40} width={40} />
        <Typography
          variant="body1"
          sx={{
            color: '#163044',
            fontSize: '30px',
          }}
        >
          Task Ease
        </Typography>
      </Box>
      <Button variant="outlined" color="info" onClick={handleSignOut}>
        Sign Out
      </Button>
    </Box>
  )
}
