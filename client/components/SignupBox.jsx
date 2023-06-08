import * as React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import axios from 'axios';
import Alert from '@mui/material/Alert';




const SignupBox = () => {
  const [error, setError] = React.useState(''); // Initialize error state
  const navigate = useNavigate(); // Create navigate function
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      name: data.get('name'),
      email: data.get('email'),
      password: data.get('password'),
    });
    const name = data.get('name');
    const email = data.get('email');
    const password = data.get('password');
    
    axios.post('http://localhost:3000/signup', {
      name: data.get('name'),
      email: data.get('email'),
      password: data.get('password')
    })
    // .catch((err) => console.log(err))
    .then((response)=> {
      if(response.status === 200){
        navigate('/login'); // Navigate to /signin on successful signup
      }
      if(response.status === 400){
        setError('Sign up failed. Please try again.'); // Set error message
      }
    })
    .catch((err) => {console.log(err);
          setError('An error occured. Please try again')});
    /* Using Fetch */
    // fetch('http://localhost:3000/signup', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type' : 'application/json',
    //   },
    //   body: JSON.stringify({name, email, password}),
    // })
    // .then((response) => {
    //   if (!response.ok) {
    //     return response.json().then((data) => {
    //       throw new Error(`Server error: ${data.error}`);
    //     });
    //   }
    //   return response.json();
    // })
    // .catch((err) => console.log(err));
    
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          boxShadow: 3,
          borderRadius: 2,
          px: 4,
          py: 6,
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
              Register
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="name"
            name="name"
            autoComplete="name"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
                Sign Up
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="/login" variant="body2">
                    Back to login
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default SignupBox;