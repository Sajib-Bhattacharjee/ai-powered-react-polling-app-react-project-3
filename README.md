# PollMaster - Interactive Polling Application

PollMaster is a responsive and interactive polling application built with React.js. It allows users to create polls, vote on them, and view real-time results with beautiful visualizations.

## Features

- **Create Custom Polls**: Create polls with multiple options and customizable settings
- **Interactive Voting**: Easy-to-use interface for casting votes
- **Real-time Results**: View poll results with beautiful charts and visualizations
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Local Storage**: Polls and votes are saved in your browser's local storage

## Technologies Used

- React.js
- React Router for navigation
- Material-UI for responsive design and UI components
- Chart.js for data visualization
- Local Storage API for data persistence

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository or download the source code
2. Navigate to the project directory
3. Install dependencies:

```bash
npm install
```

### Running the Application

Start the development server:

```bash
npm start
```

The application will open in your default browser at [http://localhost:3000](http://localhost:3000).

### Building for Production

Create a production build:

```bash
npm run build
```

The build files will be created in the `build` directory.

## Usage

1. **Home Page**: Browse existing polls or create a new one
2. **Create Poll**: Fill out the form to create a new poll with multiple options
3. **Vote**: Select your preferred option and submit your vote
4. **Results**: View detailed results with charts and statistics

## Project Structure

- `src/components`: Reusable UI components
- `src/pages`: Page components for different routes
- `src/context`: React context for state management
- `src/services`: Service functions for data handling
- `src/assets`: Static assets like images and icons

## Challenges and Solutions

During the development of PollMaster, several challenges were encountered and addressed:

### 1. Mobile Responsiveness

**Challenge**: On small screens, the poll results page had issues with infinite scrolling and oversized charts that made the user experience poor.

**Solution**: 
- Implemented a tabbed interface for mobile views that separates pie charts, bar charts, and detailed results
- Optimized chart sizes and configurations for different screen sizes
- Added responsive breakpoints to adjust layouts based on device size
- Created separate rendering paths for mobile and desktop experiences

### 2. Data Persistence

**Challenge**: Maintaining poll data between sessions without a backend server.

**Solution**:
- Utilized browser's localStorage API to persist poll data
- Implemented a service layer to abstract data operations
- Added error handling for storage limitations and data corruption

### 3. Dynamic Chart Rendering

**Challenge**: Creating visually appealing and interactive charts that accurately represent poll data.

**Solution**:
- Integrated Chart.js with React components
- Generated dynamic color schemes for different poll options
- Implemented responsive chart configurations
- Added detailed tooltips and legends for better data interpretation

### 4. State Management

**Challenge**: Managing application state across multiple components and pages.

**Solution**:
- Created a centralized context using React Context API
- Implemented custom hooks for accessing poll data
- Designed a unidirectional data flow architecture
- Added proper error handling and loading states

### 5. User Experience

**Challenge**: Creating an intuitive and engaging user interface for poll creation and voting.

**Solution**:
- Designed a step-by-step form for poll creation
- Implemented real-time validation and feedback
- Added animations and transitions for a more dynamic feel
- Created a notification system for user actions
- Ensured accessibility compliance with proper focus management and semantic HTML

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- React.js team for the amazing library
- Material-UI for the beautiful components
- Chart.js for the visualization tools
