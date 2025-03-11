import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container, useMediaQuery, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <AppBar position="static" color="primary">
      <Container>
        <Toolbar sx={{ justifyContent: 'space-between', padding: isMobile ? '0.5rem 0' : '0.5rem' }}>
          <Typography
            variant="h5"
            component={Link}
            to="/"
            sx={{
              fontWeight: 'bold',
              color: 'white',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            PollMaster
          </Typography>
          <div>
            <Button color="inherit" component={Link} to="/" sx={{ marginRight: '0.5rem' }}>
              Home
            </Button>
            <Button color="inherit" component={Link} to="/create-poll">
              Create Poll
            </Button>
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;