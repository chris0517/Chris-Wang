import React, { useState, useEffect } from 'react';
import { Box, IconButton, useMediaQuery, useTheme } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import hui from '../assets/Myself/huihui (2).jpg';
import tuan from '../assets/Myself/tuan (1).jpg';

const Hobby = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
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
    }, 5000); // Change image every 6 seconds

    return () => clearInterval(interval); // Clean up on unmount
  }, [interestIndex, interests]);

  const handleNextImage = () => {
    setImageIndex((prev) => (prev + 1) % interests[interestIndex].images.length);
  };

  const handlePrevImage = () => {
    setImageIndex((prev) => (prev - 1 + interests[interestIndex].images.length) % interests[interestIndex].images.length);
  };

  // Calculate responsive image size
  const imageSize = isMobile ? 280 : 500;

  return (
    <Box sx={{ 
      p: { xs: 1, md: 2 }, 
      height: '100%', 
      overflowX: 'hidden', 
      pb: 0 
    }}>
      {/* Interests Section */}
      <Box 
        sx={{ 
          p: { xs: 2, md: 3 }, 
          bgcolor: 'rgba(0, 0, 0, 0.5)', 
          borderRadius: 2,
          display: 'flex',
          justifyContent: 'space-between', // This ensures equal spacing
          alignItems: 'center',
          width: '100%'
        }}
      >
        <Box sx={{ width: '40px', display: 'flex', justifyContent: 'center' }}>
          <IconButton 
            onClick={handlePrevImage} 
            color="primary"
            size={isMobile ? "small" : "medium"}
          >
            <ArrowBackIos style={{color:'white'}} />
          </IconButton>
        </Box>
        
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          flex: 1 
        }}>
          <img 
            src={interests[interestIndex].images[imageIndex]} 
            alt="Interest" 
            width={imageSize}
            height={imageSize} 
            style={{ 
              borderRadius: 8, 
              objectFit: 'cover',
              maxWidth: '100%'
            }} 
          />
        </Box>
        
        <Box sx={{ width: '40px', display: 'flex', justifyContent: 'center' }}>
          <IconButton 
            onClick={handleNextImage} 
            color="primary"
            size={isMobile ? "small" : "medium"}
          >
            <ArrowForwardIos style={{color:'white'}} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Hobby;