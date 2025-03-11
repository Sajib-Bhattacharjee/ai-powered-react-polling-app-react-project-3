import React from 'react';
import { Typography, Button, Paper } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const ErrorMessage = ({ message = 'An error occurred', onRetry }) => {
  return (
    <Paper
      elevation={3}
      sx={{
        p: 4,
        borderRadius: 2,
        textAlign: 'center',
        maxWidth: '600px',
        mx: 'auto',
        my: 4,
      }}
    >
      <ErrorOutlineIcon color="error" sx={{ fontSize: 60, mb: 2 }} />
      <Typography variant="h5" gutterBottom>
        Oops! Something went wrong
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        {message}
      </Typography>
      {onRetry && (
        <Button variant="contained" color="primary" onClick={onRetry}>
          Try Again
        </Button>
      )}
    </Paper>
  );
};

export default ErrorMessage; 