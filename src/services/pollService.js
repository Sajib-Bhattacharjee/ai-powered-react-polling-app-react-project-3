// This service handles all poll-related operations
// In a real application, this would make API calls to a backend server
// For this demo, we'll use localStorage to persist data

const STORAGE_KEY = 'pollmaster_polls';

// Get all polls from localStorage
const getPolls = () => {
  try {
    const polls = localStorage.getItem(STORAGE_KEY);
    return polls ? JSON.parse(polls) : [];
  } catch (error) {
    console.error('Error getting polls from localStorage:', error);
    return [];
  }
};

// Save polls to localStorage
const savePolls = (polls) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(polls));
    return true;
  } catch (error) {
    console.error('Error saving polls to localStorage:', error);
    return false;
  }
};

// Get a single poll by ID
const getPollById = (id) => {
  const polls = getPolls();
  return polls.find(poll => poll.id === id) || null;
};

// Create a new poll
const createPoll = (pollData) => {
  const polls = getPolls();
  
  // Ensure the poll has a unique ID
  const newPoll = {
    ...pollData,
    id: pollData.id || Date.now().toString(),
    createdAt: pollData.createdAt || new Date().toISOString()
  };
  
  const updatedPolls = [newPoll, ...polls];
  savePolls(updatedPolls);
  
  return newPoll;
};

// Update an existing poll
const updatePoll = (id, pollData) => {
  const polls = getPolls();
  const index = polls.findIndex(poll => poll.id === id);
  
  if (index === -1) {
    throw new Error('Poll not found');
  }
  
  const updatedPoll = {
    ...polls[index],
    ...pollData,
    id, // Ensure ID doesn't change
    updatedAt: new Date().toISOString()
  };
  
  polls[index] = updatedPoll;
  savePolls(polls);
  
  return updatedPoll;
};

// Delete a poll
const deletePoll = (id) => {
  const polls = getPolls();
  const updatedPolls = polls.filter(poll => poll.id !== id);
  
  if (updatedPolls.length === polls.length) {
    throw new Error('Poll not found');
  }
  
  savePolls(updatedPolls);
  return true;
};

// Vote on a poll
const votePoll = (id, optionIndex) => {
  const polls = getPolls();
  const index = polls.findIndex(poll => poll.id === id);
  
  if (index === -1) {
    throw new Error('Poll not found');
  }
  
  if (optionIndex < 0 || optionIndex >= polls[index].options.length) {
    throw new Error('Invalid option');
  }
  
  // Create a deep copy of the poll
  const updatedPoll = JSON.parse(JSON.stringify(polls[index]));
  
  // Increment the vote count for the selected option
  updatedPoll.options[optionIndex].votes += 1;
  updatedPoll.updatedAt = new Date().toISOString();
  
  // Update the polls array
  polls[index] = updatedPoll;
  savePolls(polls);
  
  return updatedPoll;
};

// Initialize with some sample polls if none exist
const initializeWithSamplePolls = () => {
  const existingPolls = getPolls();
  
  if (existingPolls.length === 0) {
    const samplePolls = [
      {
        id: '1',
        title: 'Favorite Programming Language',
        description: 'What is your favorite programming language to work with?',
        options: [
          { text: 'JavaScript', votes: 15 },
          { text: 'Python', votes: 12 },
          { text: 'Java', votes: 8 },
          { text: 'C#', votes: 6 },
          { text: 'TypeScript', votes: 10 }
        ],
        creator: 'Admin',
        createdAt: new Date().toISOString()
      },
      {
        id: '2',
        title: 'Best Frontend Framework',
        description: 'Which frontend framework do you prefer for building web applications?',
        options: [
          { text: 'React', votes: 20 },
          { text: 'Vue', votes: 15 },
          { text: 'Angular', votes: 10 },
          { text: 'Svelte', votes: 8 }
        ],
        creator: 'Admin',
        createdAt: new Date().toISOString()
      },
      {
        id: '3',
        title: 'Preferred Development Environment',
        description: 'What is your preferred development environment?',
        options: [
          { text: 'Visual Studio Code', votes: 25 },
          { text: 'WebStorm', votes: 12 },
          { text: 'Sublime Text', votes: 8 },
          { text: 'Vim', votes: 5 },
          { text: 'Atom', votes: 3 }
        ],
        creator: 'Admin',
        createdAt: new Date().toISOString()
      }
    ];
    
    savePolls(samplePolls);
    return samplePolls;
  }
  
  return existingPolls;
};

export const pollService = {
  getPolls,
  getPollById,
  createPoll,
  updatePoll,
  deletePoll,
  votePoll,
  initializeWithSamplePolls
}; 