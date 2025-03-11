import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Button, 
  Fade, 
  useMediaQuery, 
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  ButtonGroup,
  IconButton,
  Tooltip
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import PollResults from '../components/PollResults';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const ResultsPage = ({ polls, loading, error, onDeletePoll }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [poll, setPoll] = useState(null);
  const [notFoundError, setNotFoundError] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    if (polls) {
      const foundPoll = polls.find(p => p.id === id);
      if (foundPoll) {
        setPoll(foundPoll);
      } else {
        setNotFoundError('Poll not found');
      }
    }
  }, [polls, id]);
  
  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
    setMobileMenuOpen(false);
  };
  
  const handleConfirmDelete = () => {
    onDeletePoll(id);
    setDeleteDialogOpen(false);
    navigate('/');
  };
  
  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  if (loading) {
    return <LoadingSpinner message="Loading poll results..." />;
  }
  
  if (error || notFoundError) {
    return (
      <ErrorMessage 
        message={error || notFoundError} 
        onRetry={notFoundError === 'Poll not found' ? () => navigate('/') : null}
      />
    );
  }
  
  if (!poll) {
    return <LoadingSpinner message="Finding poll results..." />;
  }

  // Mobile action buttons
  const renderMobileActions = () => (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
      <Button
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        size="small"
        onClick={() => navigate('/')}
      >
        Back
      </Button>
      
      <Box>
        <Tooltip title="Actions">
          <IconButton 
            onClick={toggleMobileMenu} 
            color="primary"
            aria-label="more actions"
          >
            <MoreVertIcon />
          </IconButton>
        </Tooltip>
        
        {mobileMenuOpen && (
          <Box sx={{ 
            position: 'absolute', 
            right: 16, 
            zIndex: 10,
            mt: 1,
            boxShadow: 3,
            borderRadius: 1,
            overflow: 'hidden'
          }}>
            <ButtonGroup 
              orientation="vertical" 
              variant="contained" 
              aria-label="poll actions"
              fullWidth
            >
              <Button
                startIcon={<HowToVoteIcon />}
                onClick={() => {
                  navigate(`/poll/${id}`);
                  setMobileMenuOpen(false);
                }}
              >
                Vote
              </Button>
              <Button
                startIcon={<DeleteIcon />}
                color="error"
                onClick={handleDeleteClick}
              >
                Delete
              </Button>
            </ButtonGroup>
          </Box>
        )}
      </Box>
    </Box>
  );

  // Desktop action buttons
  const renderDesktopActions = () => (
    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap', mb: 3 }}>
      <Button
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/')}
      >
        Back to Polls
      </Button>
      <Button
        variant="contained"
        color="primary"
        startIcon={<HowToVoteIcon />}
        onClick={() => navigate(`/poll/${id}`)}
      >
        Vote on This Poll
      </Button>
      <Button
        variant="outlined"
        color="error"
        startIcon={<DeleteIcon />}
        onClick={handleDeleteClick}
      >
        Delete Poll
      </Button>
    </Box>
  );
  
  return (
    <Fade in={true} timeout={500}>
      <Container 
        maxWidth="lg" 
        sx={{ 
          py: 3,
          px: isMobile ? 1 : 3
        }}
      >
        {isMobile ? (
          <>
            {renderMobileActions()}
            <Typography 
              variant="h5" 
              component="h1" 
              align="center"
              sx={{ mb: 2, fontWeight: 'bold' }}
            >
              Poll Results
            </Typography>
          </>
        ) : (
          <Box sx={{ mb: 4, textAlign: 'center' }}>
            <Typography 
              variant="h4" 
              component="h1" 
              gutterBottom 
              sx={{ fontWeight: 'bold' }}
            >
              Poll Results
            </Typography>
            
            <Typography 
              variant="body1" 
              color="text.secondary" 
              sx={{ maxWidth: '700px', mx: 'auto', mb: 3 }}
            >
              View the current results for this poll. Results update in real-time as more votes are cast.
            </Typography>
            
            {renderDesktopActions()}
          </Box>
        )}
        
        <PollResults poll={poll} />
        
        {/* Delete Confirmation Dialog */}
        <Dialog
          open={deleteDialogOpen}
          onClose={handleCancelDelete}
          aria-labelledby="delete-dialog-title"
          aria-describedby="delete-dialog-description"
        >
          <DialogTitle id="delete-dialog-title">
            Delete Poll
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="delete-dialog-description">
              Are you sure you want to delete the poll "{poll.title}"? This action cannot be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancelDelete} color="primary">
              Cancel
            </Button>
            <Button onClick={handleConfirmDelete} color="error" variant="contained" autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Fade>
  );
};

export default ResultsPage; 