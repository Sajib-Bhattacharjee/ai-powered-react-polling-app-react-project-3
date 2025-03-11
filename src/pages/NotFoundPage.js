import React from 'react';
import { Container, Typography, Button, Box, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: 4, textAlign: 'center', borderRadius: 2 }}>
        <SentimentDissatisfiedIcon sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
        
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          404 - Page Not Found
        </Typography>
        
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: '600px', mx: 'auto' }}>
          Oops! The page you are looking for doesn't exist or has been moved.
          Please check the URL or navigate back to the home page.
        </Typography>
        
        <Box sx={{ mt: 4 }}>
          <Button 
            variant="contained" 
            color="primary" 
            size="large"
            onClick={() => navigate('/')}
          >
            Back to Home
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default NotFoundPage; 