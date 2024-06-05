'use client'

import { Avatar, Button, Container, Grid, Typography } from '@mui/material'
import { deepOrange } from '@mui/material/colors'
import { useRouter } from 'next/navigation'

import { AUTH_TOKEN, signIn, UserCredentials } from '@/services'

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
          <Grid item xs={6}>
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
                handleSignIn({ name: 'Alice', password: 'todoapp' })
              }
            >
              <Avatar
                src="/placeholder.svg"
                alt="Alice"
                style={{
                  width: 24,
                  height: 24,
                  backgroundColor: deepOrange[500],
                }}
              >
                A
              </Avatar>
              Alice
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="outlined"
              fullWidth
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
              }}
              onClick={() => handleSignIn({ name: 'Bob', password: 'todoapp' })}
            >
              <Avatar
                src="/placeholder.svg"
                alt="Bob"
                style={{
                  width: 24,
                  height: 24,
                  backgroundColor: deepOrange[500],
                }}
              >
                B
              </Avatar>
              Bob
            </Button>
          </Grid>
          <Grid item xs={6}>
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
                handleSignIn({ name: 'Charlie', password: 'todoapp' })
              }
            >
              <Avatar
                src="/placeholder.svg"
                alt="Charlie"
                style={{
                  width: 24,
                  height: 24,
                  backgroundColor: deepOrange[500],
                }}
              >
                C
              </Avatar>
              Charlie
            </Button>
          </Grid>
          <Grid item xs={6}>
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
                handleSignIn({ name: 'David', password: 'todoapp' })
              }
            >
              <Avatar
                src="/placeholder.svg"
                alt="David"
                style={{
                  width: 24,
                  height: 24,
                  backgroundColor: deepOrange[500],
                }}
              >
                D
              </Avatar>
              David
            </Button>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}
