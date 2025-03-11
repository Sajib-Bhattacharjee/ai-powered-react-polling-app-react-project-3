import React from 'react';
import { Box, Container, Typography, Link as MuiLink } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) => theme.palette.grey[100],
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body2" color="text.secondary" align="center">
          {'© '}
          {new Date().getFullYear()}
          {' '}
          <MuiLink color="inherit" href="/">
            PollMaster
          </MuiLink>
          {' - Your Interactive Polling Solution'}
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer; 