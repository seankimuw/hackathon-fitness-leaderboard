import React from 'react';
import { Box, CircularProgress, Typography, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import watchImage from '../assets/apple-watch.jpg';
import Image, { StaticImageData } from 'next/image';

interface AppleWatchTrackerProps {
  progress: number; // Progress value between 0 and 100
}

const WatchContainer = styled(Paper)(({ theme }) => ({
  position: 'relative',
  width: 300, // Adjust based on your image size
  height: 400, // Adjust based on your image size
  overflow: 'hidden',
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[4],
}));

const ProgressContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 180, // Adjust based on your image and desired size
  height: 180, // Adjust based on your image and desired size
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  borderRadius: '50%',
  zIndex: 1,
}));

const AppleWatchTracker: React.FC<AppleWatchTrackerProps> = ({ progress }) => {
  return (
    <WatchContainer elevation={3}>
      <Image
        src={watchImage as StaticImageData}
        alt="Apple Watch"
        layout="fill"
        objectFit="cover"
      />
      <ProgressContainer>
        <CircularProgress
          variant="determinate"
          value={progress}
          size="100%"
          thickness={4}
          sx={{
            color: 'success.main', // Using MUI's success color
            position: 'absolute',
          }}
        />
        <Typography
          variant="h4"
          component="div"
          color="common.white"
          sx={{
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {`${Math.round(progress)}%`}
        </Typography>
      </ProgressContainer>
    </WatchContainer>
  );
};

export default AppleWatchTracker;