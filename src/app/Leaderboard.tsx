import React from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText, Avatar, Divider, Box, LinearProgress } from '@mui/material';
import { useAccount } from 'wagmi';
import { SvgIcon } from '@mui/material';

function TrophyIcon({ color }) {
  return (
    <SvgIcon sx={{ fontSize: 24, color: color }}>
      <path d="M12 2C10.9 2 10 2.9 10 4V5H8C6.9 5 6 5.9 6 7V10C6 11.1 6.9 12 8 12H8.5C8.78 13.33 9.5 14.5 10.5 15.5C11.5 16.5 12.5 17.5 12.5 18.5V20H11.5V22H14.5V20H13.5V18.5C13.5 17.5 14.5 16.5 15.5 15.5C16.5 14.5 17.22 13.33 17.5 12H18C19.1 12 20 11.1 20 10V7C20 5.9 19.1 5 18 5H16V4C16 2.9 15.1 2 14 2H12ZM12 4H14V5H12V4ZM8 10H16V7H8V10ZM12 18C11.45 18 11 18.45 11 19C11 19.55 11.45 20 12 20C12.55 20 13 19.55 13 19C13 18.45 12.55 18 12 18Z" />
    </SvgIcon>)
}

function Leaderboard({ sortedParticipants, counter }) {
  const { address } = useAccount();
  const maxSteps = 100; // Define the maximum steps for the progress bar

  return (
    <Card sx={{ maxWidth: 600, margin: 'auto', mt: 4 }}>
      <CardContent>
        <Typography variant="h4" component="div" gutterBottom>
          Leaderboard
        </Typography>
        <List>
          {sortedParticipants.map((participant, index) => (
            <React.Fragment key={participant.addr}>
              <ListItem>
                <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>{index + 1}</Avatar>
                <ListItemText
                  primary={
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: participant.addr === address ? 'bold' : 'normal',
                        color: participant.addr === address ? 'primary.main' : 'text.primary',
                      }}
                    >
                      {participant.name}
                    </Typography>
                  }
                  secondary={
                    // Number(participant.weeklySteps) + (participant.addr === address ? counter : 0)
                    <Box>
                      <LinearProgress
                        variant="determinate"
                        value={ Number(participant.weeklySteps) + (participant.addr === address ? counter : 0) / maxSteps * 100} // Calculate progress percentage
                        sx={{ height: 10, borderRadius: 5 }}
                      />
                      <Typography variant="caption" color="text.secondary" align="right">
                        { Number(participant.weeklySteps) + (participant.addr === address ? counter : 0)} / {maxSteps} steps
                      </Typography>
                    </Box>
                  }
                />
                <Box sx={{ ml: 'auto' }}>
                  {index === 0 && <TrophyIcon color="gold" />}
                  {index === 1 && <TrophyIcon color="silver" />}
                  {index === 2 && <TrophyIcon color="brown" />} {/* Using brown for bronze */}
                </Box>
              </ListItem>
              {index < sortedParticipants.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}

export default Leaderboard;
