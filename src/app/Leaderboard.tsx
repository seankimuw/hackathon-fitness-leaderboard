import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { Button, CardActions } from '@mui/material';
import { useWriteContract } from 'wagmi';
import { abi } from './abi';
export const CONTRACT_ID = "0x78dfc914f3770367e206960574c8e29ccefb4920";


const Leaderboard = ({ sortedParticipants, currentUser, counter , setCounter }: {sortedParticipants: any, currentUser: any, counter: number, setCounter }) => {
  console.log("sortedParticipants:", sortedParticipants);
  const { writeContract } = useWriteContract();
  const handleStep = () => {
    setCounter(prev => ++prev);
    if (counter >= 4) {
      writeContract({ 
        abi,
        address: CONTRACT_ID,
        functionName: 'updateSteps',
        args: [BigInt(5)],
    }, {
      onSuccess: () => {

      }
    });
    console.log("Write contract by 5 steps!")

    
    }
    
  };
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Leaderboard
      </Typography>
      {sortedParticipants.map((participant, index) => (
        <Box className={currentUser.addr == participant.addr ? "getbgColor" : ""} key={participant.addr} my={2} p={2} border="1px solid #ccc" borderRadius="8px">
          <Typography variant="h6">
            #{index + 1}: {participant.name} {participant.addr}
          </Typography>
          <Typography variant="h6">
            Steps: {String(Number(participant.weeklySteps) + (currentUser.addr == participant.addr ? counter : 0))}
          </Typography>
          {/* Render the button only if this is the current user */}
          {currentUser.addr == participant.addr && (
            <CardActions>
              <Button size="small" onClick={() => handleStep(participant.addr)}>
                Step!
              </Button>
            </CardActions>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default Leaderboard;
