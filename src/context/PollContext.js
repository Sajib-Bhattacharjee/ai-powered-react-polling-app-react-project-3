import React, { createContext, useState, useEffect, useContext } from 'react';
import { pollService } from '../services/pollService';

// Create the context
const PollContext = createContext();

// Custom hook to use the poll context
export const usePollContext = () => {
  const context = useContext(PollContext);
  if (!context) {
    throw new Error('usePollContext must be used within a PollProvider');
  }
  return context;
};

// Provider component
export const PollProvider = ({ children }) => {
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load polls on initial render
  useEffect(() => {
    const loadPolls = () => {
      try {
        setLoading(true);
        setError(null);
        
        // Initialize with sample polls if none exist
        const loadedPolls = pollService.initializeWithSamplePolls();
        setPolls(loadedPolls);
      } catch (err) {
        console.error('Error loading polls:', err);
        setError('Failed to load polls. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadPolls();
  }, []);

  // Create a new poll
  const createPoll = (pollData) => {
    try {
      setLoading(true);
      setError(null);
      
      const newPoll = pollService.createPoll(pollData);
      setPolls((prevPolls) => [newPoll, ...prevPolls]);
      
      return newPoll;
    } catch (err) {
      console.error('Error creating poll:', err);
      setError('Failed to create poll. Please try again.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update an existing poll
  const updatePoll = (id, pollData) => {
    try {
      setLoading(true);
      setError(null);
      
      const updatedPoll = pollService.updatePoll(id, pollData);
      
      setPolls((prevPolls) =>
        prevPolls.map((poll) => (poll.id === id ? updatedPoll : poll))
      );
      
      return updatedPoll;
    } catch (err) {
      console.error('Error updating poll:', err);
      setError('Failed to update poll. Please try again.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Delete a poll
  const deletePoll = (id) => {
    try {
      setLoading(true);
      setError(null);
      
      pollService.deletePoll(id);
      setPolls((prevPolls) => prevPolls.filter((poll) => poll.id !== id));
      
      return true;
    } catch (err) {
      console.error('Error deleting poll:', err);
      setError('Failed to delete poll. Please try again.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Vote on a poll
  const votePoll = (id, optionIndex) => {
    try {
      setError(null);
      
      const updatedPoll = pollService.votePoll(id, optionIndex);
      
      setPolls((prevPolls) =>
        prevPolls.map((poll) => (poll.id === id ? updatedPoll : poll))
      );
      
      return updatedPoll;
    } catch (err) {
      console.error('Error voting on poll:', err);
      setError('Failed to submit vote. Please try again.');
      throw err;
    }
  };

  // Refresh polls from storage
  const refreshPolls = () => {
    try {
      setLoading(true);
      setError(null);
      
      const refreshedPolls = pollService.getPolls();
      setPolls(refreshedPolls);
      
      return refreshedPolls;
    } catch (err) {
      console.error('Error refreshing polls:', err);
      setError('Failed to refresh polls. Please try again.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Context value
  const value = {
    polls,
    loading,
    error,
    createPoll,
    updatePoll,
    deletePoll,
    votePoll,
    refreshPolls,
  };

  return <PollContext.Provider value={value}>{children}</PollContext.Provider>;
};

export default PollContext; 