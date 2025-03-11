import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Box,
  Button,
  TextField,
  InputAdornment,
  Divider,
  useMediaQuery,
  useTheme,
  Fade,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useNavigate } from 'react-router-dom';
import PollCard from '../components/PollCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const HomePage = ({ polls, loading, error, onDeletePoll }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPolls, setFilteredPolls] = useState([]);
  
  useEffect(() => {
    if (polls) {
      setFilteredPolls(
        polls.filter((poll) =>
          poll.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          poll.description.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [polls, searchTerm]);
  
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  if (loading) {
    return <LoadingSpinner message="Loading polls..." />;
  }
  
  if (error) {
    return <ErrorMessage message={error} />;
  }
  
  return (
    <Fade in={true} timeout={500}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Hero Section */}
        <Box 
          sx={{ 
            textAlign: 'center', 
            mb: 6,
            py: 4,
            px: 2,
            backgroundColor: theme.palette.background.paper,
            borderRadius: 2,
            boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
          }}
        >
          <Typography 
            variant={isMobile ? "h4" : "h3"} 
            component="h1" 
            gutterBottom
            sx={{ fontWeight: 'bold' }}
          >
            Welcome to PollMaster
          </Typography>
          <Typography 
            variant="h6" 
            color="text.secondary"
            sx={{ maxWidth: '800px', mx: 'auto', mb: 4 }}
          >
            Create interactive polls, gather opinions, and visualize results in real-time.
            Share with friends, colleagues, or the community!
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<AddCircleOutlineIcon />}
            onClick={() => navigate('/create-poll')}
            sx={{ 
              py: 1.5, 
              px: 4,
              borderRadius: 8,
              textTransform: 'none',
              fontSize: '1.1rem',
            }}
          >
            Create New Poll
          </Button>
        </Box>
        
        {/* Search and Filter */}
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
          <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
            {filteredPolls.length > 0 
              ? `Available Polls (${filteredPolls.length})` 
              : 'No Polls Found'}
          </Typography>
          <TextField
            placeholder="Search polls..."
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={handleSearchChange}
            sx={{ minWidth: isMobile ? '100%' : '300px' }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        
        {/* Poll Cards */}
        {filteredPolls.length > 0 ? (
          <Grid container spacing={3}>
            {filteredPolls.map((poll) => (
              <Grid item xs={12} sm={6} md={4} key={poll.id}>
                <PollCard poll={poll} onDelete={() => onDeletePoll(poll.id)} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box 
            sx={{ 
              textAlign: 'center', 
              py: 6,
              backgroundColor: theme.palette.grey[50],
              borderRadius: 2,
            }}
          >
            <Typography variant="h6" color="text.secondary" gutterBottom>
              {searchTerm 
                ? 'No polls match your search criteria' 
                : 'No polls available yet'}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate('/create-poll')}
              sx={{ mt: 2 }}
            >
              Create the First Poll
            </Button>
          </Box>
        )}
        
        {/* Call to Action */}
        {filteredPolls.length > 0 && (
          <Box sx={{ mt: 6, textAlign: 'center' }}>
            <Divider sx={{ mb: 6 }} />
            <Typography variant="h5" gutterBottom>
              Want to create your own poll?
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={<AddCircleOutlineIcon />}
              onClick={() => navigate('/create-poll')}
              sx={{ mt: 2 }}
            >
              Create New Poll
            </Button>
          </Box>
        )}
      </Container>
    </Fade>
  );
};

export default HomePage; 