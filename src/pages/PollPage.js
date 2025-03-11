import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Fade, useMediaQuery, useTheme } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import VotingForm from '../components/VotingForm';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const PollPage = ({ polls, onVote, loading, error }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [poll, setPoll] = useState(null);
  const [votingError, setVotingError] = useState(null);
  const [isVoting, setIsVoting] = useState(false);
  
  useEffect(() => {
    if (polls) {
      const foundPoll = polls.find(p => p.id === id);
      if (foundPoll) {
        setPoll(foundPoll);
      } else {
        setVotingError('Poll not found');
      }
    }
  }, [polls, id]);
  
  const handleVote = (optionIndex) => {
    setIsVoting(true);
    try {
      onVote(id, optionIndex);
      // Navigate will happen in the VotingForm component after a short delay
    } catch (err) {
      setVotingError(err.message || 'Failed to submit vote');
      setIsVoting(false);
    }
  };
  
  if (loading) {
    return <LoadingSpinner message="Loading poll..." />;
  }
  
  if (error || votingError) {
    return (
      <ErrorMessage 
        message={error || votingError} 
        onRetry={votingError === 'Poll not found' ? () => navigate('/') : null}
      />
    );
  }
  
  if (!poll) {
    return <LoadingSpinner message="Finding poll..." />;
  }
  
  return (
    <Fade in={true} timeout={500}>
      <Container 
        maxWidth="lg" 
        sx={{ 
          py: isMobile ? 2 : 4,
          px: isMobile ? 1 : 3
        }}
      >
        {!isMobile && (
          <Box sx={{ mb: 4, textAlign: 'center' }}>
            <Typography 
              variant="h4" 
              component="h1" 
              gutterBottom 
              sx={{ fontWeight: 'bold' }}
            >
              Vote on Poll
            </Typography>
            <Typography 
              variant="body1" 
              color="text.secondary" 
              sx={{ maxWidth: '700px', mx: 'auto' }}
            >
              Select your preferred option and submit your vote. 
              You'll be able to see the results after voting.
            </Typography>
          </Box>
        )}
        
        <VotingForm 
          poll={poll} 
          onVote={handleVote} 
          loading={isVoting}
        />
      </Container>
    </Fade>
  );
};

export default PollPage; 