import * as React from 'react';
import styled from 'styled-components';

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
import { useParams } from 'react-router-dom';


const PasswordchangeBox = () => {
  const {token} = useParams();
  console.log(token);

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
              Password Change
        </Typography>
        {/* {error && <Alert severity="error">{error}</Alert>} */}
        <Box component="form" onSubmit={null} noValidate sx={{ mt: 1 }}>
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
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmpassword"
            label="Confirm Password"
            type="password"
            id="confirmpassword"
            autoComplete="confirm-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
                Password Change
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

export default PasswordchangeBox;