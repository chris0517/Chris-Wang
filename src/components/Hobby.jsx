import React, { useState, useEffect } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import hui from '../assets/Myself/huihui (2).jpg';
import tuan from '../assets/Myself/tuan (1).jpg';

const Hobby = () => {
  const interests = [
    { 
      images: [hui, tuan]
    }
  ];
  
  const [interestIndex, setInterestIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prev) => (prev + 1) % interests[interestIndex].images.length);
    }, 6000); // Change image every 3 seconds

    return () => clearInterval(interval); // Clean up on unmount
  }, [interestIndex, interests]);

  const handleNextImage = () => {
    setImageIndex((prev) => (prev + 1) % interests[interestIndex].images.length);
  };

  const handlePrevImage = () => {
    setImageIndex((prev) => (prev - 1 + interests[interestIndex].images.length) % interests[interestIndex].images.length);
  };

  return (
    <Box sx={{ p: { xs: 1, md: 2 }, height: '100%', overflowX: 'hidden' }} style={{paddingBottom: '0'}}>
      {/* Interests Section */}
      <Box sx={{ p: 3, bgcolor: 'rgba(0, 0, 0, 0.5)', borderRadius: 2 }}>        
        <Box display="flex" alignItems="center" justifyContent="center" mt={2}>
          <IconButton onClick={handlePrevImage} color="primary">
            <ArrowBackIos style={{color:'white'}} />
          </IconButton>
          <img 
            src={interests[interestIndex].images[imageIndex]} 
            alt="Interest" 
            width={500}
            height={500} 
            style={{ borderRadius: 8, objectFit: 'cover' }} 
          />
          <IconButton onClick={handleNextImage} color="primary">
            <ArrowForwardIos style={{color:'white'}} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Hobby;