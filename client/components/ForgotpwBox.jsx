import * as React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
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



const ForgotpwBox = () => {

  const [errorMessage, setErrorMessage] = useState(null); // Error message state
  const navigate = useNavigate(); // useNavigate hook for redirecting

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      // password: data.get("password"),
    });
    axios.post('http://localhost:3000/forgot', {
      email: data.get('email'),
    })
    .then((response)=> {
      console.log(response.status);
      if(response.status === 200){
        navigate('/login'); // Navigate to /signin on successful signup
      }
      if(response.status === 400){
        setErrorMessage('Email sending failed. Please try again.'); // Set error message
      }
    })
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
              Forgot Password
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
                Send Email
          </Button>
          <Grid container>
            {/* <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid> */}
            <Grid item>
              <Link href="/Signup" variant="body2">
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

export default ForgotpwBox;