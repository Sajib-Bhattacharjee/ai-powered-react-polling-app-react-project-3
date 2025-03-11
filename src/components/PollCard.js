import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardActions, 
  Typography, 
  Button, 
  Chip,
  Box,
  LinearProgress,
  useMediaQuery,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  IconButton,
  Tooltip
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PollIcon from '@mui/icons-material/Poll';
import PersonIcon from '@mui/icons-material/Person';
import DeleteIcon from '@mui/icons-material/Delete';

const PollCard = ({ poll, onDelete }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // Calculate total votes
  const totalVotes = poll.options.reduce((sum, option) => sum + option.votes, 0);
  
  const handleDeleteClick = (e) => {
    e.stopPropagation();
    setDeleteDialogOpen(true);
  };
  
  const handleConfirmDelete = () => {
    onDelete();
    setDeleteDialogOpen(false);
  };
  
  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
  };

  return (
    <>
      <Card 
        sx={{ 
          height: '100%', 
          display: 'flex', 
          flexDirection: 'column',
          transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
          }
        }}
      >
        <CardContent sx={{ flexGrow: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
            <Typography variant={isMobile ? "h6" : "h5"} component="h2" gutterBottom>
              {poll.title}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Chip 
                icon={<PollIcon />} 
                label={`${totalVotes} votes`} 
                size="small" 
                color="primary" 
                variant="outlined"
                sx={{ mr: 1 }}
              />
              <Tooltip title="Delete Poll">
                <IconButton 
                  size="small" 
                  color="error" 
                  onClick={handleDeleteClick}
                  aria-label="delete poll"
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
          
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {poll.description}
          </Typography>
          
          <Box sx={{ mb: 2 }}>
            {poll.options.slice(0, 2).map((option, index) => (
              <Box key={index} sx={{ mb: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2">{option.text}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {totalVotes > 0 ? Math.round((option.votes / totalVotes) * 100) : 0}%
                  </Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={totalVotes > 0 ? (option.votes / totalVotes) * 100 : 0} 
                  sx={{ height: 8, borderRadius: 5 }}
                />
              </Box>
            ))}
            {poll.options.length > 2 && (
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                +{poll.options.length - 2} more options
              </Typography>
            )}
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <PersonIcon fontSize="small" color="action" />
            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
              Created by {poll.creator}
            </Typography>
          </Box>
        </CardContent>
        
        <CardActions>
          <Button 
            size="small" 
            color="primary" 
            onClick={() => navigate(`/poll/${poll.id}`)}
            sx={{ fontWeight: 'bold' }}
          >
            Vote Now
          </Button>
          <Button 
            size="small" 
            onClick={() => navigate(`/results/${poll.id}`)}
          >
            View Results
          </Button>
        </CardActions>
      </Card>
      
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
    </>
  );
};

export default PollCard; 