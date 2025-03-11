import React, { useState } from 'react';
import { Container, Typography, Box, Fade } from '@mui/material';
import PollForm from '../components/PollForm';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const CreatePollPage = ({ onCreatePoll, loading, error }) => {
  const [submissionError, setSubmissionError] = useState(null);

  const handleSubmit = (pollData) => {
    try {
      onCreatePoll(pollData);
    } catch (err) {
      setSubmissionError(err.message || 'Failed to create poll');
    }
  };

  if (loading) {
    return <LoadingSpinner message="Creating your poll..." />;
  }

  if (error || submissionError) {
    return <ErrorMessage message={error || submissionError} />;
  }

  return (
    <Fade in={true} timeout={500}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
            Create a New Poll
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: '700px', mx: 'auto' }}>
            Fill out the form below to create your poll. Add as many options as you need,
            and customize your poll settings.
          </Typography>
        </Box>

        <PollForm onSubmit={handleSubmit} />
      </Container>
    </Fade>
  );
};

export default CreatePollPage; 