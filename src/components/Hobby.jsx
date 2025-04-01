import React, { useState } from 'react';
import { SiKubernetes, SiFlask } from 'react-icons/si';
import { Box, Grid, Typography, Avatar, IconButton } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import avatar from '../assets/pfp.jpg';

const Hobby = () => {
  
  const interests = [
    { 
      title: 'Cat Owner', 
      images: [
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150'
      ]
    },
    { 
      title: 'Basketball Player', 
      images: [
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150'
      ]
    },
    { 
      title: 'Musician', 
      images: [
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150'
      ]
    }
  ];
  const [interestIndex, setInterestIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);

  const handleNextInterest = () => {
    setInterestIndex((prev) => (prev + 1) % interests.length);
    setImageIndex(0);
  };

  const handlePrevInterest = () => {
    setInterestIndex((prev) => (prev - 1 + interests.length) % interests.length);
    setImageIndex(0);
  };

  const handleNextImage = () => {
    setImageIndex((prev) => (prev + 1) % interests[interestIndex].images.length);
  };

  const handlePrevImage = () => {
    setImageIndex((prev) => (prev - 1 + interests[interestIndex].images.length) % interests[interestIndex].images.length);
  };

  return (
    <Box sx={{ p: { xs: 1, md: 2 }, height: '100%', overflowX: 'hidden' }}>
      {/* Interests Section */}
      <Box sx={{ p: 3, bgcolor: 'rgba(0, 0, 0, 0.5)', borderRadius: 2, textAlign: 'center' }}>
        <Box display="flex" alignItems="center" justifyContent="center">
          <IconButton onClick={handlePrevInterest} color="primary">
            <ArrowBackIos style={{color:'white'}} />
          </IconButton>
          <Typography variant="h5" color="white" sx={{ mx: 2 }}>
            {interests[interestIndex].title}
          </Typography>
          <IconButton onClick={handleNextInterest} color="primary">
            <ArrowForwardIos style={{color:'white'}} />
          </IconButton>
        </Box>
        <Box display="flex" alignItems="center" justifyContent="center" mt={2}>
          <IconButton onClick={handlePrevImage} color="primary">
            <ArrowBackIos style={{color:'white'}} />
          </IconButton>
          <img src={interests[interestIndex].images[imageIndex]} alt="Interest" width={150} height={150} style={{ borderRadius: 8 }} />
          <IconButton onClick={handleNextImage} color="primary">
            <ArrowForwardIos style={{color:'white'}} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Hobby;