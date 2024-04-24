// Leaderboard.jsx
import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import AppleWatchTracker from './AppleWatchTracker';

const Leaderboard = ({ sortedParticipants }: {sortedParticipants: any}) => {
  // Sort participants by progress (weeklySteps) in descending order

  const olympicsSortedParticipants = sortedParticipants.length >= 3 ?  [
    sortedParticipants[1],
    sortedParticipants[0], 
    sortedParticipants[2],
  ] : sortedParticipants;
  return (
    <Box sx={styles.leaderboardContainer}>
      {olympicsSortedParticipants.map((participant: any, index: number) => (
        <Box
          key={participant.addr}
          sx={{
            ...styles.podium,
            ...styles[`position${index + 1}`],
          }}
        >
          <AppleWatchTracker progress={Number(participant.weeklySteps)} participant={participant} />
        </Box>
      ))}
    </Box>
  );
};

// Styles for the Leaderboard component
const styles = {
  leaderboardContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    height: '400px',
    position: 'relative',
  },
  podium: {
    transition: 'transform 0.5s ease-in-out',
    margin: '0 10px',
  },
  position1: {
    transform: 'translateY(-20px)', // Gold position
    zIndex: 3,
  },
  position2: {
    transform: 'translateY(0px)', // Silver position
    zIndex: 2,
  },
  position3: {
    transform: 'translateY(20px)', // Bronze position
    zIndex: 1,
  },
};

export default Leaderboard;
