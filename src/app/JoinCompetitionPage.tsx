import React, { useState } from 'react';
import { useReadContract, useWriteContract } from 'wagmi';
import { parseEther, formatEther } from 'viem';
import { abi } from './abi';
import { CONTRACT_ID } from './page';
import { Button, Typography, Box, CircularProgress, Container, TextField } from '@mui/material';

const JoinCompetitionPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState(''); // State for the user's name

  const { data: participationFee } = useReadContract({
    address: CONTRACT_ID,
    abi,
    functionName: 'PARTICIPATION_FEE',
  });

  const { writeContract } = useWriteContract();

  const handleJoinCompetition = async () => {
    if (!name) {
      alert('Please enter your name to join the competition.');
      return;
    }

    setIsLoading(true);
    try {
      await writeContract({ 
        abi,
        address: CONTRACT_ID,
        functionName: 'registerUser',
        value: participationFee,
        args: [name], // Use the dynamic name
      });
    } catch (error) {
      console.error('Error joining competition:', error);
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
        sx={{ backgroundColor: '#181818', color: '#fff', padding: 3 }} // Dark background
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
        <TextField
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          sx={{
            mt: 2,
            input: { color: '#fff' }, // Light text color
            label: { color: '#aaa' }, // Light label color
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#aaa', // Light border color
              },
              '&:hover fieldset': {
                borderColor: '#fff', // Border color on hover
              },
              '&.Mui-focused fieldset': {
                borderColor: '#fff', // Border color when focused
              },
            },
          }}
          InputLabelProps={{
            style: { color: '#aaa' }, // Light label color
          }}
        />
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
