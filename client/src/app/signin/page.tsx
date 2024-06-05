'use client'

import { Avatar, Button, Container, Grid, Typography } from '@mui/material'
import { deepOrange } from '@mui/material/colors'
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
    <div
      style={{
        display: 'flex',
        height: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Container maxWidth="xs">
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <Typography variant="h3" component="h1" gutterBottom>
            Welcome
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Click on a user to sign in
          </Typography>
        </div>
        <Grid container spacing={2}>
          {users.map((user) => (
            <Grid item xs={6} key={user.name}>
              <Button
                variant="outlined"
                fullWidth
                style={{
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
                  style={{
                    width: 24,
                    height: 24,
                    backgroundColor: deepOrange[500],
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
    </div>
  )
}
