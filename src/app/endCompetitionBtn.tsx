import React, { useState } from 'react';
import { useWriteContract } from 'wagmi';
import { Button, Typography, Box, CircularProgress, Container } from '@mui/material';
import { abi } from './abi'; // Adjust the import according to your ABI file path
import { CONTRACT_ID } from './page'; // Adjust the import according to where CONTRACT_ID is defined

export const EndCompetitionButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { writeContract } = useWriteContract();

  const handleEndCompetition = () => {writeContract({
        address: CONTRACT_ID,
        abi: abi,
        functionName: 'endWeekAndPayout', // Replace with your actual contract function
        args: []
      });
  };

  return (
    <Container maxWidth="sm" style={{display: 'flex',  justifyContent:'right', alignItems:'right', marginRight: 0}}>
      {/* <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
      > */}
        {/* <Typography variant="h4" gutterBottom>
          End Competition
        </Typography> */}
        <Button
          variant="contained"
          // color="primary"
          size="large"
          onClick={handleEndCompetition}
          disabled={isLoading}
          // sx={{ mt: 2, mr: 0 }}
          sx={{
            mt: 2,
            mr: 0,
            backgroundColor: '#ff6f61', // Pastel red color
            '&:hover': {
              backgroundColor: '#ff4f3d', // Darker shade on hover
            },
            color: 'white', // Text color
          }}
        >
          {isLoading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            'End Competition'
          )}
        </Button>
      {/* </Box> */}
    </Container>
  );
};

export default EndCompetitionButton;
