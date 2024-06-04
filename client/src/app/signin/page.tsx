import { Avatar, Button, Container, Grid, Typography } from '@mui/material'
import { deepOrange } from '@mui/material/colors'

export default function Component() {
  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: '#f5f5f5',
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
            >
              <Avatar
                src="/placeholder.svg"
                alt="Jared Palmer"
                style={{
                  width: 24,
                  height: 24,
                  backgroundColor: deepOrange[500],
                }}
              >
                JP
              </Avatar>
              Jared Palmer
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
            >
              <Avatar
                src="/placeholder.svg"
                alt="Olivia Davis"
                style={{
                  width: 24,
                  height: 24,
                  backgroundColor: deepOrange[500],
                }}
              >
                OD
              </Avatar>
              Olivia Davis
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
            >
              <Avatar
                src="/placeholder.svg"
                alt="John Doe"
                style={{
                  width: 24,
                  height: 24,
                  backgroundColor: deepOrange[500],
                }}
              >
                JD
              </Avatar>
              John Doe
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
            >
              <Avatar
                src="/placeholder.svg"
                alt="Jane Smith"
                style={{
                  width: 24,
                  height: 24,
                  backgroundColor: deepOrange[500],
                }}
              >
                JS
              </Avatar>
              Jane Smith
            </Button>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}
