import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, CardMedia, Divider, IconButton, useMediaQuery, useTheme } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import MentalNote1 from '../assets/MentalNote/MentalNote1.png';
import MentalNote2 from '../assets/MentalNote/MentalNote2.png';
import MentalNote3 from '../assets/MentalNote/MentalNote3.png';
import MentalNote4 from '../assets/MentalNote/MentalNote4.png';
import MentalNote5 from '../assets/MentalNote/MentalNote5.png';
import ATS from '../assets/Companies/rc1.png';

import RC from '../assets/Companies/rc1.png';
import HXLAB from '../assets/Companies/hxlab.png';
import UWAFT from '../assets/Companies/uwaft.png';

const projectsSections = [
  {
    project: "Mental Note",
    location: "HackPrinceton (Princeton University)",
    period: "Technologies: React, Flask, Firebase, OpenAI, HuggingFace, Python, HTML, CSS",
    details: [
      "• Built a personal mood tracker, allowing users to document their daily emotions in the form of a sentiment journal",
      "• Utilizes the open-source code of the sentiment analysis ML model on HuggingFace to detect the user emotion",
      "• Implemented an image generating system using Firebase, Python and Flask as the backend with OpenAI's API and neural style transfer ML model API to produce a combined image that reflects the user's detected emotion"
    ], 
    images: [MentalNote1, MentalNote2, MentalNote3, MentalNote4, MentalNote5]
  },
  {
    project: "Debate AI",
    location: "Toolset Software Developer",
    period: "May 2024 - August 2024 | Cambridge",
    details: [
      "• Enhanced data processing with Python, PySpark and SQL in Databricks",
      "• Developed Excel VBA scripts improving workflow speed by 50%",
      "• Created dynamic dashboards using Excel VBA and Power Query"
    ], 
    images: [ATS]
  },
  {
    project: "WaterLook",
    location: "Data Science Analyst",
    period: "September 2023 - December 2023 | Guelph",
    details: [
      "• Analyzed Petcare data using Python Pandas for data processing",
      "• Implemented regression models achieving 15.63% sales improvement",
      "• Created visualizations with Matplotlib for executive reporting"
    ], 
    images: [RC]
  },
];

const ProjectCard = ({ project }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const hasMultipleImages = project.images.length > 1;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? project.images.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      (prevIndex + 1) % project.images.length
    );
  };

  return (
    <Card 
      sx={{ 
        width: '100%', 
        maxWidth: { xs: '100%', sm: '600px', md: '800px' },
        bgcolor: 'rgba(0, 0, 0, 0.5)',
        color: 'white',
        borderRadius: 2,
        overflow: 'hidden',
        mx: 'auto'  // Center the card
      }}
    >
      {/* Image Container with Arrows */}
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          sx={{ 
            width: '100%', 
            height: { xs: 180, sm: 210, md: 240 },
            objectFit: 'contain',
            bgcolor: 'rgba(0, 0, 0, 0.7)'
          }}
          component="img"
          image={project.images[currentImageIndex]}
          title={project.project}
        />
        
        {/* Navigation Arrows - Only show if multiple images */}
        {hasMultipleImages && (
          <>
            <IconButton 
              sx={{ 
                position: 'absolute', 
                left: 5, 
                top: '50%', 
                transform: 'translateY(-50%)',
                bgcolor: 'rgba(0, 0, 0, 0.5)',
                color: 'white',
                '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.7)' },
                padding: { xs: '4px', sm: '8px' }
              }}
              onClick={handlePrevImage}
            >
              <ArrowBackIosNewIcon fontSize={isMobile ? "small" : "medium"} />
            </IconButton>
            
            <IconButton 
              sx={{ 
                position: 'absolute', 
                right: 5, 
                top: '50%', 
                transform: 'translateY(-50%)',
                bgcolor: 'rgba(0, 0, 0, 0.5)',
                color: 'white',
                '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.7)' },
                padding: { xs: '4px', sm: '8px' }
              }}
              onClick={handleNextImage}
            >
              <ArrowForwardIosIcon fontSize={isMobile ? "small" : "medium"} />
            </IconButton>
            
            {/* Image Counter */}
            <Box 
              sx={{ 
                position: 'absolute', 
                bottom: 8, 
                right: 8, 
                bgcolor: 'rgba(0, 0, 0, 0.6)', 
                px: 1, 
                borderRadius: 1,
                fontSize: { xs: '0.65rem', sm: '0.75rem' }
              }}
            >
              {currentImageIndex + 1} / {project.images.length}
            </Box>
          </>
        )}
      </Box>
      
      {/* Content Section */}
      <CardContent sx={{ p: { xs: 1, sm: 2 } }}>
        <Typography variant={isMobile ? "subtitle1" : "h6"} gutterBottom>
          {project.project}
        </Typography>
        <Typography variant={isMobile ? "body2" : "subtitle1"} sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
          {project.location}
        </Typography>
        <Typography variant={isMobile ? "caption" : "subtitle2"} sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
          {project.period}
        </Typography>
        <Divider sx={{ marginY: 1, backgroundColor: 'rgba(255, 255, 255, 0.5)' }} />
        {project.details.map((detail, i) => (
          <Typography 
            key={i} 
            variant={isMobile ? "caption" : "body2"} 
            sx={{ 
              color: 'rgba(255, 255, 255, 0.9)',
              fontSize: { xs: '0.75rem', sm: '0.875rem' }
            }} 
            gutterBottom
          >
            {detail}
          </Typography>
        ))}
      </CardContent>
    </Card>
  );
};

const Projects = () => {
  return (
    <Box sx={{ 
      p: { xs: 1, sm: 1.5, md: 2 }, 
      overflowX: 'hidden',
      width: '100%'
    }}>
      <Typography 
        variant="h4" 
        gutterBottom 
        textAlign="left" 
        color="white"
        sx={{ fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' } }}
      >
        Projects
      </Typography>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        width: '100%',
        alignItems: 'center',
      }}>
        {projectsSections.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </Box>
    </Box>
  );
};

export default Projects;