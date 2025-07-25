import React from 'react';
import { Container, Box, Typography, Button, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { SentimentDissatisfied as SadIcon } from '@mui/icons-material';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '80vh',
          textAlign: 'center',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <SadIcon sx={{ fontSize: 64, color: 'text.secondary' }} />
          <Typography variant="h3" component="h1" gutterBottom>
            404
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom>
            Page Not Found
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            The page you are looking for might have been removed, had its name changed,
            or is temporarily unavailable.
          </Typography>
          <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              onClick={() => navigate(-1)}
            >
              Go Back
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate('/')}
            >
              Go to Home
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default NotFound;