import * as React from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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


const LoginBox = () => {
  const [errorMessage, setErrorMessage] = useState(null); // Error message state
  const navigate = useNavigate(); // useNavigate hook for redirecting
  const handleResponse = async () => {
    try {
        const response = await fetch('http://localhost:3000/login');
        const status = response.status;

        if (status === 200) {
            navigate('/home');
        } else if (status === 400) {
            setErrorMessage('Login failed. Please try again.');
        } else {
            // handle other status codes as necessary
        }
    } catch (error) {
        console.error('Failed to fetch', error);
        setErrorMessage('Something went wrong. Please try again.');
    }
};


  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
    // const name = data.get('name');
    const email = data.get('email');
    const password = data.get('password');
    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json',
      },
      body: JSON.stringify({email, password}),
    }).then(handleResponse);

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
              Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
                Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="/Forgotpw" variant="body2">
                    Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                {'Don\'t have an account? Sign Up'}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      {errorMessage && <div>{errorMessage}</div>} {/* Display error message when it exists */}
    </Container>
  );
};

export default LoginBox;