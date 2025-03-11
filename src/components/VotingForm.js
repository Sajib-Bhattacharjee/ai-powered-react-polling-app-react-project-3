import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Button,
  Divider,
  Alert,
  Slide,
  useMediaQuery,
  useTheme,
  CircularProgress,
  Stack
} from '@mui/material';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router-dom';

const VotingForm = ({ poll, onVote, loading = false }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  
  const [selectedOption, setSelectedOption] = useState('');
  const [error, setError] = useState('');
  const [alert, setAlert] = useState({ show: false, message: '', severity: 'success' });
  
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    setError('');
  };
  
  const showAlert = (message, severity = 'success') => {
    setAlert({ show: true, message, severity });
    setTimeout(() => {
      setAlert((prev) => ({ ...prev, show: false }));
    }, 3000);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!selectedOption) {
      setError('Please select an option to vote');
      return;
    }
    
    const optionIndex = poll.options.findIndex(
      (option) => option.text === selectedOption
    );
    
    if (optionIndex === -1) {
      setError('Invalid option selected');
      return;
    }
    
    onVote(optionIndex);
    showAlert('Your vote has been recorded!');
    
    // Navigate to results after a short delay
    setTimeout(() => {
      navigate(`/results/${poll.id}`);
    }, 2000);
  };
  
  if (!poll) {
    return (
      <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h6">Poll not found</Typography>
      </Paper>
    );
  }
  
  return (
    <Paper 
      elevation={3} 
      component="form" 
      onSubmit={handleSubmit}
      sx={{ 
        p: isMobile ? 2 : 4, 
        borderRadius: 2,
        maxWidth: '800px',
        mx: 'auto',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <Slide direction="down" in={alert.show}>
        <Alert 
          severity={alert.severity} 
          sx={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            right: 0,
            zIndex: 1
          }}
        >
          {alert.message}
        </Alert>
      </Slide>
      
      <Box sx={{ textAlign: 'center', mb: 3 }}>
        <Typography variant={isMobile ? "h6" : "h5"} component="h2" gutterBottom>
          {poll.title}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {poll.description}
        </Typography>
      </Box>
      
      <Divider sx={{ my: 3 }} />
      
      <Typography variant="h6" gutterBottom>
        Cast Your Vote
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      
      <FormControl component="fieldset" sx={{ width: '100%' }}>
        <RadioGroup
          aria-label="poll-options"
          name="poll-options"
          value={selectedOption}
          onChange={handleOptionChange}
        >
          {poll.options.map((option, index) => (
            <Paper
              key={index}
              elevation={1}
              sx={{
                mb: 2,
                p: 2,
                borderRadius: 2,
                transition: 'all 0.2s',
                border: '1px solid transparent',
                '&:hover': {
                  borderColor: theme.palette.primary.main,
                  backgroundColor: theme.palette.action.hover,
                },
                ...(selectedOption === option.text && {
                  borderColor: theme.palette.primary.main,
                  backgroundColor: theme.palette.primary.light + '20',
                }),
              }}
            >
              <FormControlLabel
                value={option.text}
                control={<Radio color="primary" />}
                label={
                  <Typography variant="body1" sx={{ ml: 1, wordBreak: 'break-word' }}>
                    {option.text}
                  </Typography>
                }
                sx={{ width: '100%', m: 0 }}
              />
            </Paper>
          ))}
        </RadioGroup>
      </FormControl>
      
      {isMobile ? (
        <Stack spacing={1} sx={{ mt: 3 }}>
          <Button 
            type="submit" 
            variant="contained" 
            color="primary"
            size="large"
            disabled={loading || !selectedOption}
            startIcon={loading ? <CircularProgress size={20} /> : <HowToVoteIcon />}
            fullWidth
          >
            {loading ? 'Submitting...' : 'Submit Vote'}
          </Button>
          
          <Button 
            variant="outlined" 
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/')}
            fullWidth
          >
            Back to Polls
          </Button>
          
          <Button 
            variant="text" 
            color="primary"
            startIcon={<VisibilityIcon />}
            onClick={() => navigate(`/results/${poll.id}`)}
            size="small"
            fullWidth
          >
            View Results Without Voting
          </Button>
        </Stack>
      ) : (
        <>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
            <Button 
              variant="outlined" 
              onClick={() => navigate('/')}
              startIcon={<ArrowBackIcon />}
            >
              Back to Polls
            </Button>
            <Button 
              type="submit" 
              variant="contained" 
              color="primary"
              size="large"
              disabled={loading || !selectedOption}
              startIcon={loading ? <CircularProgress size={20} /> : <HowToVoteIcon />}
            >
              {loading ? 'Submitting...' : 'Submit Vote'}
            </Button>
          </Box>
          
          <Box sx={{ mt: 4, textAlign: 'right' }}>
            <Button 
              variant="text" 
              color="primary"
              onClick={() => navigate(`/results/${poll.id}`)}
              size="small"
              startIcon={<VisibilityIcon />}
            >
              View Results Without Voting
            </Button>
          </Box>
        </>
      )}
    </Paper>
  );
};

export default VotingForm; 