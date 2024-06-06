'use client'

import { Avatar, Button, Container, Grid, Typography } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { AUTH_TOKEN, signIn, UserCredentials } from '@/services'

const users = [
  { name: 'Alice', initial: 'A' },
  { name: 'Bob', initial: 'B' },
  { name: 'Charlie', initial: 'C' },
  { name: 'David', initial: 'D' },
]

export default function Signin() {
  const router = useRouter()

  const handleSignIn = async (credentials: UserCredentials) => {
    try {
      const response = await signIn(credentials)
      globalThis.localStorage.setItem(AUTH_TOKEN, response.token)
      console.log('Signed in successfully')
      router.push('/') // Redirect to home page
    } catch (error) {
      console.error('Error signing in:', error)
    }
  }

  return (
    <Container
      maxWidth="xs"
      sx={{
        color: '#163044',
        pt: '200px',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <Image alt="TaskEase" src="/logo.png" height={60} width={60} />
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome to Task Ease
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Choose a random user, just for fun
        </Typography>
      </div>
      <Grid container spacing={3}>
        {users.map((user) => (
          <Grid item xs={6} key={user.name}>
            <Button
              variant="outlined"
              size="large"
              fullWidth
              sx={{
                color: '#163044',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
              }}
              onClick={() =>
                handleSignIn({ name: user.name, password: 'todoapp' })
              }
            >
              <Avatar
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  width: 24,
                  height: 24,
                  backgroundColor: '#27d4da',
                }}
              >
                {user.initial}
              </Avatar>
              {user.name}
            </Button>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}
