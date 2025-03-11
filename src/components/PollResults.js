import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  LinearProgress, 
  Divider,
  useMediaQuery,
  useTheme,
  Tabs,
  Tab,
  Card,
  CardContent
} from '@mui/material';
import { 
  Chart as ChartJS, 
  ArcElement, 
  Tooltip, 
  Legend, 
  CategoryScale,
  LinearScale,
  BarElement,
  Title
} from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import PieChartIcon from '@mui/icons-material/PieChart';
import BarChartIcon from '@mui/icons-material/BarChart';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

// Register ChartJS components
ChartJS.register(
  ArcElement, 
  Tooltip, 
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

const PollResults = ({ poll }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isMedium = useMediaQuery(theme.breakpoints.down('md'));
  const [activeTab, setActiveTab] = useState(0);
  
  // Calculate total votes
  const totalVotes = poll.options.reduce((sum, option) => sum + option.votes, 0);
  
  // Generate random colors for chart
  const generateColors = (count) => {
    const colors = [];
    const backgroundColors = [];
    
    for (let i = 0; i < count; i++) {
      const hue = (i * 137) % 360; // Use golden ratio to spread colors
      const color = `hsl(${hue}, 70%, 50%)`;
      colors.push(color);
      backgroundColors.push(`hsl(${hue}, 70%, 85%)`);
    }
    
    return { colors, backgroundColors };
  };
  
  const { colors, backgroundColors } = generateColors(poll.options.length);
  
  // Prepare data for pie chart
  const pieChartData = {
    labels: poll.options.map(option => option.text),
    datasets: [
      {
        data: poll.options.map(option => option.votes),
        backgroundColor: colors,
        borderColor: colors.map(color => color.replace('50%', '60%')),
        borderWidth: 1,
      },
    ],
  };
  
  // Prepare data for bar chart
  const barChartData = {
    labels: poll.options.map(option => option.text),
    datasets: [
      {
        label: 'Votes',
        data: poll.options.map(option => option.votes),
        backgroundColor: backgroundColors,
        borderColor: colors,
        borderWidth: 1,
      },
    ],
  };
  
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: isMobile ? 'bottom' : 'right',
        labels: {
          boxWidth: 15,
          padding: 15,
          font: {
            size: isMobile ? 10 : 12
          }
        },
        display: !isMobile || activeTab !== 1 // Hide legend on bar chart for mobile
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = context.raw;
            const percentage = totalVotes > 0 
              ? Math.round((value / totalVotes) * 100) 
              : 0;
            return `${context.label}: ${value} votes (${percentage}%)`;
          }
        }
      }
    }
  };

  const barChartOptions = {
    ...chartOptions,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0
        }
      },
      x: {
        ticks: {
          font: {
            size: isMobile ? 8 : 12
          },
          maxRotation: 45,
          minRotation: 45
        }
      }
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const renderDetailedResults = () => (
    <Box sx={{ mt: 2 }}>
      {poll.options
        .sort((a, b) => b.votes - a.votes) // Sort by votes (descending)
        .map((option, index) => {
          const percentage = totalVotes > 0 
            ? Math.round((option.votes / totalVotes) * 100) 
            : 0;
            
          return (
            <Box key={index} sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                <Typography variant="body1" sx={{ wordBreak: 'break-word', pr: 2 }}>
                  {option.text}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'nowrap' }}>
                  {option.votes} votes ({percentage}%)
                </Typography>
              </Box>
              <LinearProgress 
                variant="determinate" 
                value={percentage} 
                sx={{ 
                  height: 10, 
                  borderRadius: 5,
                  backgroundColor: backgroundColors[index],
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: colors[index]
                  }
                }}
              />
            </Box>
          );
        })}
    </Box>
  );

  const renderPieChart = () => (
    <Box sx={{ height: isMobile ? 250 : 300, position: 'relative' }}>
      <Pie data={pieChartData} options={chartOptions} />
    </Box>
  );

  const renderBarChart = () => (
    <Box sx={{ height: isMobile ? 250 : 300, position: 'relative' }}>
      <Bar data={barChartData} options={barChartOptions} />
    </Box>
  );

  // Mobile view with tabs
  if (isMobile) {
    return (
      <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
        <Typography variant="h5" component="h2" gutterBottom align="center">
          Poll Results: {poll.title}
        </Typography>
        
        <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 2 }}>
          {poll.description}
        </Typography>
        
        <Typography variant="subtitle1" align="center" sx={{ mb: 2 }}>
          Total Votes: {totalVotes}
        </Typography>
        
        <Tabs 
          value={activeTab} 
          onChange={handleTabChange} 
          variant="fullWidth" 
          sx={{ mb: 2, borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab icon={<PieChartIcon />} label="Pie Chart" />
          <Tab icon={<BarChartIcon />} label="Bar Chart" />
          <Tab icon={<FormatListBulletedIcon />} label="Details" />
        </Tabs>
        
        <Box sx={{ p: 1 }}>
          {activeTab === 0 && renderPieChart()}
          {activeTab === 1 && renderBarChart()}
          {activeTab === 2 && renderDetailedResults()}
        </Box>
        
        <Box sx={{ mt: 3, textAlign: 'right' }}>
          <Typography variant="caption" color="text.secondary">
            Poll created by {poll.creator} on {new Date(poll.createdAt).toLocaleDateString()}
          </Typography>
        </Box>
      </Paper>
    );
  }

  // Desktop/tablet view
  return (
    <Paper elevation={3} sx={{ p: isMedium ? 3 : 4, borderRadius: 2 }}>
      <Typography variant="h5" component="h2" gutterBottom align="center">
        Poll Results: {poll.title}
      </Typography>
      
      <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 3 }}>
        {poll.description}
      </Typography>
      
      <Typography variant="subtitle1" align="center" sx={{ mb: 3 }}>
        Total Votes: {totalVotes}
      </Typography>
      
      <Divider sx={{ my: 3 }} />
      
      <Box sx={{ display: 'flex', flexDirection: isMedium ? 'column' : 'row', gap: 4 }}>
        {/* Pie Chart */}
        <Card sx={{ flex: 1, mb: isMedium ? 4 : 0 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom align="center">
              Vote Distribution
            </Typography>
            {renderPieChart()}
          </CardContent>
        </Card>
        
        {/* Bar Chart */}
        <Card sx={{ flex: 1 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom align="center">
              Vote Comparison
            </Typography>
            {renderBarChart()}
          </CardContent>
        </Card>
      </Box>
      
      <Divider sx={{ my: 3 }} />
      
      {/* Detailed Results */}
      <Typography variant="h6" gutterBottom>
        Detailed Results
      </Typography>
      
      {renderDetailedResults()}
      
      <Box sx={{ mt: 4, textAlign: 'right' }}>
        <Typography variant="caption" color="text.secondary">
          Poll created by {poll.creator} on {new Date(poll.createdAt).toLocaleDateString()}
        </Typography>
      </Box>
    </Paper>
  );
};

export default PollResults; 