import React, { useState } from 'react';
import { useReadContract, useWriteContract } from 'wagmi';
import { parseEther, formatEther } from 'viem';
import { abi } from './abi';
import { CONTRACT_ID } from './page';
import { Button, Typography, Box, CircularProgress, Container } from '@mui/material';

const JoinCompetitionPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { data: participationFee } = useReadContract({
    address: CONTRACT_ID,
    abi,
    functionName: 'PARTICIPATION_FEE',
  });

  const { writeContract } = useWriteContract();

  const handleJoinCompetition = () => {
    setIsLoading(true);
    try {
      writeContract({ 
        abi,
        address: CONTRACT_ID,
        functionName: 'registerUser',
        value: participationFee,
        args: ["Sean"],
      });
    } catch (error) {
      console.error('Error joining competition:', error);
      alert('Failed to join the competition. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
      >
        <Typography variant="h4" gutterBottom>
          Join Competition
        </Typography>
        {participationFee ? (
          <Typography variant="h6" gutterBottom>
            Participation Fee: {formatEther(participationFee)} ETH
          </Typography>
        ) : (
          <Typography variant="h6" gutterBottom>
            Loading participation fee...
          </Typography>
        )}
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleJoinCompetition}
          disabled={isLoading || !participationFee}
          sx={{ mt: 2 }}
        >
          {isLoading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            'Join Competition'
          )}
        </Button>
      </Box>
    </Container>
  );
};

export default JoinCompetitionPage;