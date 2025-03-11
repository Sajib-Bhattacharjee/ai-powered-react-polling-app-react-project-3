import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  IconButton,
  Divider,
  Alert,
  Slide,
  useMediaQuery,
  useTheme
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';

const PollForm = ({ onSubmit, initialData = null }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState(
    initialData || {
      title: '',
      description: '',
      options: [{ text: '', votes: 0 }, { text: '', votes: 0 }],
      creator: 'Anonymous',
    }
  );
  
  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState({ show: false, message: '', severity: 'error' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...formData.options];
    newOptions[index] = { ...newOptions[index], text: value };
    setFormData((prev) => ({ ...prev, options: newOptions }));
    
    // Clear error for this option if it exists
    if (errors[`option-${index}`]) {
      setErrors((prev) => ({ ...prev, [`option-${index}`]: '' }));
    }
  };

  const addOption = () => {
    setFormData((prev) => ({
      ...prev,
      options: [...prev.options, { text: '', votes: 0 }],
    }));
  };

  const removeOption = (index) => {
    if (formData.options.length <= 2) {
      showAlert('A poll must have at least 2 options', 'error');
      return;
    }
    
    const newOptions = [...formData.options];
    newOptions.splice(index, 1);
    setFormData((prev) => ({ ...prev, options: newOptions }));
  };

  const showAlert = (message, severity = 'error') => {
    setAlert({ show: true, message, severity });
    setTimeout(() => {
      setAlert((prev) => ({ ...prev, show: false }));
    }, 5000);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    formData.options.forEach((option, index) => {
      if (!option.text.trim()) {
        newErrors[`option-${index}`] = 'Option text is required';
      }
    });
    
    // Check for duplicate options
    const optionTexts = formData.options.map(opt => opt.text.trim().toLowerCase());
    const hasDuplicates = optionTexts.some((text, index) => 
      text && optionTexts.indexOf(text) !== index
    );
    
    if (hasDuplicates) {
      showAlert('Duplicate options are not allowed', 'error');
      return false;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Generate a unique ID for the poll
      const pollWithId = {
        ...formData,
        id: initialData?.id || Date.now().toString(),
        createdAt: initialData?.createdAt || new Date().toISOString(),
      };
      
      onSubmit(pollWithId);
      showAlert('Poll saved successfully!', 'success');
      
      // Reset form if it's a new poll
      if (!initialData) {
        setFormData({
          title: '',
          description: '',
          options: [{ text: '', votes: 0 }, { text: '', votes: 0 }],
          creator: 'Anonymous',
        });
      }
    }
  };

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
      
      <Typography variant="h5" component="h2" gutterBottom align="center" sx={{ mb: 3 }}>
        {initialData ? 'Edit Poll' : 'Create New Poll'}
      </Typography>
      
      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          label="Poll Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          error={!!errors.title}
          helperText={errors.title}
          required
          sx={{ mb: 2 }}
        />
        
        <TextField
          fullWidth
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          error={!!errors.description}
          helperText={errors.description}
          required
          multiline
          rows={2}
        />
      </Box>
      
      <Divider sx={{ my: 3 }} />
      
      <Typography variant="h6" gutterBottom>
        Poll Options
      </Typography>
      
      <Box sx={{ mb: 3 }}>
        {formData.options.map((option, index) => (
          <Box 
            key={index} 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              mb: 2,
              gap: 1
            }}
          >
            <TextField
              fullWidth
              label={`Option ${index + 1}`}
              value={option.text}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              error={!!errors[`option-${index}`]}
              helperText={errors[`option-${index}`]}
              required
            />
            <IconButton 
              color="error" 
              onClick={() => removeOption(index)}
              aria-label="Remove option"
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        ))}
        
        <Button
          startIcon={<AddIcon />}
          onClick={addOption}
          variant="outlined"
          sx={{ mt: 1 }}
          fullWidth={isMobile}
        >
          Add Option
        </Button>
      </Box>
      
      <Divider sx={{ my: 3 }} />
      
      <Box sx={{ mb: 2 }}>
        <TextField
          fullWidth
          label="Your Name (Optional)"
          name="creator"
          value={formData.creator}
          onChange={handleChange}
          placeholder="Anonymous"
        />
      </Box>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
        <Button 
          variant="outlined" 
          onClick={() => navigate('/')}
        >
          Cancel
        </Button>
        <Button 
          type="submit" 
          variant="contained" 
          color="primary"
          size="large"
        >
          {initialData ? 'Update Poll' : 'Create Poll'}
        </Button>
      </Box>
    </Paper>
  );
};

export default PollForm; 