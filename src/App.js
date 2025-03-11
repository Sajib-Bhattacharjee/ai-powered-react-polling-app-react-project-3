import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { PollProvider } from './context/PollContext';
import theme from './theme';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import Notification from './components/Notification';

// Pages
import HomePage from './pages/HomePage';
import CreatePollPage from './pages/CreatePollPage';
import PollPage from './pages/PollPage';
import ResultsPage from './pages/ResultsPage';
import NotFoundPage from './pages/NotFoundPage';

// Custom hook to use the poll context
import { usePollContext } from './context/PollContext';

// Main App Component
function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <PollProvider>
        <Router>
          <AppContent />
        </Router>
      </PollProvider>
    </ThemeProvider>
  );
}

// App Content Component (uses context)
function AppContent() {
  const { polls, loading, error, createPoll, votePoll, deletePoll } = usePollContext();
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const handleCloseNotification = () => {
    setNotification(prev => ({ ...prev, open: false }));
  };

  const showNotification = (message, severity = 'success') => {
    setNotification({
      open: true,
      message,
      severity
    });
  };

  const handleCreatePoll = (pollData) => {
    const newPoll = createPoll(pollData);
    showNotification('Poll created successfully!');
    return newPoll;
  };

  const handleVotePoll = (id, optionIndex) => {
    const updatedPoll = votePoll(id, optionIndex);
    showNotification('Your vote has been recorded!');
    return updatedPoll;
  };

  const handleDeletePoll = (id) => {
    deletePoll(id);
    showNotification('Poll deleted successfully!', 'info');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: 'background.default',
      }}
    >
      <Header />
      
      <Box sx={{ flexGrow: 1 }}>
        <Routes>
          <Route 
            path="/" 
            element={<HomePage polls={polls} loading={loading} error={error} onDeletePoll={handleDeletePoll} />} 
          />
          <Route 
            path="/create-poll" 
            element={<CreatePollPage onCreatePoll={handleCreatePoll} loading={loading} error={error} />} 
          />
          <Route 
            path="/poll/:id" 
            element={<PollPage polls={polls} onVote={handleVotePoll} loading={loading} error={error} />} 
          />
          <Route 
            path="/results/:id" 
            element={<ResultsPage polls={polls} loading={loading} error={error} onDeletePoll={handleDeletePoll} />} 
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Box>
      
      <Footer />
      
      <Notification 
        open={notification.open}
        message={notification.message}
        severity={notification.severity}
        onClose={handleCloseNotification}
      />
    </Box>
  );
}

export default App;
