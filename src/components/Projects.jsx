import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, CardMedia, Divider, IconButton, 
  useMediaQuery, useTheme, Modal, Backdrop, Fade } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import GitHubIcon from '@mui/icons-material/GitHub';
import MentalNote1 from '../assets/MentalNote/MentalNote1.png';
import MentalNote2 from '../assets/MentalNote/MentalNote2.png';
import MentalNote3 from '../assets/MentalNote/MentalNote3.png';
import MentalNote4 from '../assets/MentalNote/MentalNote4.png';
import MentalNote5 from '../assets/MentalNote/MentalNote5.png';
import Lsi from '../assets/lsi.jpg';
import rbc from '../assets/rbc.webp';
import DebateAI1 from '../assets/DebateAI/DebateAI1.png';
import DebateAI2 from '../assets/DebateAI/DebateAI2.png';
import DebateAI3 from '../assets/DebateAI/DebateAI3.png';
import DebateAI4 from '../assets/DebateAI/DebateAI4.png';
import DebateAI7 from '../assets/DebateAI/DebateAI7.png';
import DebateAI8 from '../assets/DebateAI/DebateAI8.png';
import DebateAI10 from '../assets/DebateAI/DebateAI10.png';
import DebateAI11 from '../assets/DebateAI/DebateAI11.png';

const projectsSections = [
  {
    project: "Mental Note",
    location: "HackPrinceton (Princeton University)",
    technologies: "Technologies: React, Flask, Firebase, OpenAI, HuggingFace, Python",
    details: [
      "Mental Note is a sentiment journal that acts as a personal mood " +
      "tracker. Users write small notes about their day, and receive a " +
      "personalized themed image generated based on the overall sentiment " +
      "of their input. After use of Mental Note for an extended period of " +
      "time, the user is able to view a colourful mozaic of their mood " +
      "over time.",
    ], 
    images: [MentalNote1, MentalNote2, MentalNote3, MentalNote4, MentalNote5], 
    Url:"https://github.com/chris0517/Mental-Note"
  },
  {
    project: "Debate AI",
    location: "University of Waterloo",
    technologies: "Technologies: React, Node.js, Firebase, OpenAI, SQL",
    details: [
      "Debate AI is a classroom tool that allows student to practice " + 
      "debating skills with AI bots. The AI bots are trained based on OpenAI APi. " + 
      "The user can sign in/ sign up using gmails through firebase authentication. " + 
      "They can join as student or teachers for calssroom interactions such as create assignments," + 
      "view debate student's debate histories and track their learning progress."
    ], 
    images: [DebateAI7, DebateAI1, DebateAI2, DebateAI3, DebateAI4, DebateAI8, DebateAI10, DebateAI11], 
    Url:"https://github.com/chris0517/DebateAI"
  },  
  {
    project: "WaterLook",
    location: "RBC Borealis LSI Mentorship",
    technologies: "Technologies: Python",
    details: [
      "Built and fine tuned machine learning models for plant watering times based on environmental conditions for water conservation. "+
      "Supported and guided by preofessional data scientists and ML engineers at RBC Borealis."
    ], 
    images: [rbc], 
    Url:"https://github.com/kimmyhoang/waterlook"
  },
  {
    project: "LATimes Search Engine",
    location: "University of Waterloo",
    technologies: "Technologies: Java",
    details: [
      "Built an information retrieval search engine for the LATimes dataset. " +
      "Used a standard tokenizaer to create custom inverted-index, lexicon, and id maps for efficient search. " + 
      "Leveraged TF-IDF and BM-25 algorithms to retrieve the top ranked documents " + 
      "based on the relevance to the query."
    ], 
  },
];

const ProjectCard = ({ project }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const hasImages = project.images && project.images.length > 0;
  const hasMultipleImages = hasImages && project.images.length > 1;  
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

  const handleImageClick = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
    <Card
      sx={{
        width: '100%',
        maxWidth: { xs: '100%', sm: '600px', md: '800px' },
        bgcolor: 'rgba(0, 0, 0, 0.5)',
        color: 'white',
        borderRadius: 2,
        overflow: 'hidden',
        mx: 'auto'
      }}
    >
      {/* Image Container with Arrows */}
      {hasImages && (
        <Box sx={{ position: 'relative' }}>
<CardMedia
  sx={{
    width: '100%',
    height: { xs: 250, sm: 300, md: 350 }, // Increased height values
    objectFit: 'contain',
    bgcolor: 'rgba(0, 0, 0, 0.7)',
    cursor: 'pointer',
    transition: 'transform 0.2s',
    '&:hover': {
      transform: 'scale(1.02)'
    }
  }}
  component="img"
  image={project.images[currentImageIndex]}
  title={project.project}
  onClick={handleImageClick}
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
      )}

      {/* Content Section */}
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        {project.Url && (
            <IconButton
            style={{ marginBottom: 5, paddingRight: 0, paddingLeft: 0 }}
              href={project.Url}
              target="_blank"
              sx={{
                color: 'white',
                '&:hover': { color: '#6e5494' },
              }}
            >
              <GitHubIcon fontSize="medium" />
            </IconButton>
          )}
          <Typography variant={isMobile ? "subtitle1" : "h6"}>
            {project.project}
          </Typography>
        </Box>
        <Typography variant={isMobile ? "body2" : "subtitle1"} sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
          {project.location}
        </Typography>
        <Typography variant={isMobile ? "caption" : "subtitle2"} sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
          {project.technologies}
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
    
    {/* Modal for Image Preview */}
    
    {hasImages && (
      <Modal
      open={openModal}
      onClose={handleCloseModal}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={openModal}>
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90vw',
          maxWidth: '1200px',
          maxHeight: '90vh',
          bgcolor: 'transparent',
          p: 1,
          outline: 'none',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative' // Added for arrow positioning
        }}>
          {hasMultipleImages && (
            <>
              <IconButton
                onClick={handlePrevImage}
                sx={{
                  position: 'absolute',
                  left: { xs: -20, sm: -40 },
                  top: '50%',
                  transform: 'translateY(-50%)',
                  bgcolor: 'rgba(0, 0, 0, 0.5)',
                  color: 'white',
                  '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.7)' },
                  zIndex: 1,
                }}
              >
                <ArrowBackIosNewIcon />
              </IconButton>
              <IconButton
                onClick={handleNextImage}
                sx={{
                  position: 'absolute',
                  right: { xs: -20, sm: -40 },
                  top: '50%',
                  transform: 'translateY(-50%)',
                  bgcolor: 'rgba(0, 0, 0, 0.5)',
                  color: 'white',
                  '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.7)' },
                  zIndex: 1,
                }}
              >
                <ArrowForwardIosIcon />
              </IconButton>
            </>
          )}
          <img
            src={project.images[currentImageIndex]}
            alt={project.project}
            style={{
              maxWidth: '100%',
              maxHeight: '90vh',
              objectFit: 'contain',
              borderRadius: '4px'
            }}
          />
          {hasMultipleImages && (
            <Box
              sx={{
                position: 'absolute',
                bottom: -30,
                left: '50%',
                transform: 'translateX(-50%)',
                bgcolor: 'rgba(0, 0, 0, 0.6)',
                color: 'white',
                px: 2,
                py: 0.5,
                borderRadius: 1,
                fontSize: { xs: '0.75rem', sm: '0.875rem' }
              }}
            >
              {currentImageIndex + 1} / {project.images.length}
            </Box>
          )}
        </Box>
      </Fade>
    </Modal>
    )}

      </>
  );
};

const Projects = () => {
  return (
    <Box sx={{ 
      p: { xs: 1, sm: 1.5, md: 2 }, 
      overflowX: 'hidden',
      width: '100%'
    }}>
      <Typography variant="h4" sx={{ mb: 2, textAlign: 'left', color: 'white' }}>
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