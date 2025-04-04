import React, { useState, useEffect, useRef } from "react";
import { Grid, Box, Button, Typography, Container, Paper, Fade, IconButton, Stack, AppBar, Toolbar } from "@mui/material";
import { Flip } from '@mui/icons-material';
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import DescriptionIcon from '@mui/icons-material/Description'; // Add this import at the top
import bg from '../assets/bg3.jpg';
import PlayBar from "./PlayBar";
import About from "./About";
import Experience from "./Experience";
import Projects from "./Projects";
import Hobby from "./Hobby";
import ReactCardFlip from 'react-card-flip';

const TypeWriter = ({ phrases, typingSpeed = 150, deletingSpeed = 75, delayBetweenPhrases = 1000 }) => {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const handleTyping = () => {
      const currentPhrase = phrases[currentPhraseIndex];
      
      // Set the next text based on whether we're typing or deleting
      setCurrentText(prev => {
        if (isDeleting) {
          return prev.substring(0, prev.length - 1);
        } else {
          return currentPhrase.substring(0, prev.length + 1);
        }
      });

      // Determine if we should switch to deleting or move to the next phrase
      if (!isDeleting && currentText === currentPhrase) {
        // Start deleting after a delay
        setTimeout(() => setIsDeleting(true), delayBetweenPhrases);
      } else if (isDeleting && currentText === '') {
        setIsDeleting(false);
        // Move to the next phrase
        setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
      }
    };

    // Set the typing/deleting speed
    const timer = setTimeout(
      handleTyping, 
      isDeleting ? deletingSpeed : typingSpeed
    );

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentPhraseIndex, phrases, typingSpeed, deletingSpeed, delayBetweenPhrases]);

  return (
    <Typography 
      variant="h5" 
      sx={{ 
        color: "rgba(255,255,255,0.9)",
        minHeight: "40px",
        position: "relative" // Add position relative for absolute positioning of children
      }}
    >
      With a passion to {currentText}
      <span 
      style={{
        display: "inline",
        fontSize: "1.2em", // Adjust as needed
        lineHeight: "1",
        marginLeft: "4px",  // Add space before the cursor
        animation: "blink 1s step-end infinite"
      }}
    > ⎸</span> 
      
      <style jsx>{`
        @keyframes blink {
          from, to { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </Typography>
  );
};

const Home = () => {
    // Refs for scroll positioning
    const aboutRef = useRef(null);
    const experienceRef = useRef(null);
    const projectsRef = useRef(null);
    const phrases = ["create", "innovate", "build"];
    const [isFlipped, setIsFlipped] = useState(false);

    const handleFlip = () => {
      setIsFlipped(!isFlipped);
      window.scrollTo({ top: 0, behavior: "smooth" }); // Scrolls to the top smoothly
    };

    // State for active section
    const [activeSection, setActiveSection] = useState("about");

    // Handle scroll in right column to update navigation
    useEffect(() => {
      const handleScroll = () => {
          const scrollPosition = window.scrollY;
          
          // Get positions of each section
          const aboutPosition = aboutRef.current?.offsetTop || 0;
          const experiencePosition = experienceRef.current?.offsetTop || 0;
          const projectsPosition = projectsRef.current?.offsetTop || 0;
          
          // Determine active section based on scroll position
          if (scrollPosition >= projectsPosition - 100) {
              setActiveSection("projects");
          } else if (scrollPosition >= experiencePosition - 100) {
              setActiveSection("experience");
          } else {
              setActiveSection("about");
          }
      };

      // Add event listener to window
      window.addEventListener('scroll', handleScroll);
      
      // Initial check
      handleScroll();
      
      // Cleanup
      return () => window.removeEventListener('scroll', handleScroll);
  }, []);

    // Scroll to section when nav item is clicked
    const scrollToSection = (sectionRef) => {
      if (!sectionRef.current) return;
      
      window.scrollTo({
          top: sectionRef.current.offsetTop - 20,
          behavior: 'smooth'
      });
  };

    return (
        <Box
            sx={{
                minHeight: "100vh", // Changed from height to minHeight
                background: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.4)), url(${bg})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundAttachment: "fixed",
                position: "relative",
                display: "flex",
                justifyContent: "center" // Center the content container
            }}
        >
            {/* Mobile Header - Visible only on mobile */}
            <AppBar 
                position="fixed" 
                color="transparent" 
                elevation={0}
                sx={{
                    display: { xs: "block", md: "none" },
                    background: "rgba(0,0,0,0.85)",
                    backdropFilter: "blur(10px)",
                    borderBottom: "1px solid rgba(255,255,255,0.1)",
                }}
            >
                <Toolbar sx={{ justifyContent: "space-between" }}>
                    <Box>
                        <Typography 
                            variant="h5" 
                            component="h1"
                            sx={{ 
                                color: "white", 
                                fontWeight: "bold",
                            }}
                        >
                            Chris Wang
                        </Typography>
                        <Typography 
                            variant="body2" 
                            sx={{ 
                                color: "rgba(255,255,255,0.9)",
                            }}
                        >
                            Management Engineering Student | Developer
                        </Typography>
                    </Box>
                    <Box sx={{ display: "flex", gap: 1 }}>
                        <IconButton 
                            href="https://linkedin.com/in/yourprofile" 
                            target="_blank"
                            size="small"
                            sx={{ color: "white" }}
                        >
                            <LinkedInIcon />
                        </IconButton>
                        <IconButton 
                            href="https://github.com/yourusername" 
                            target="_blank"
                            size="small"
                            sx={{ color: "white" }}
                        >
                            <GitHubIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Main content container with whitespace on sides */}
            <Box
                sx={{
                    width: { xs: "100%", md: "66.67%" },
                    display: "flex",
                    maxWidth: "1400px", // Maximum width to maintain readability on very large screens
                    px: { xs: 2, md: 0 } // Add some padding on mobile
                }}
            >
                {/* Left Column - Static */}
                <Box
                    sx={{
                        width: { xs: "100%", md: "35%" },
                        display: { xs: "none", md: "flex" },
                        flexDirection: "column",
                        justifyContent: "space-between",
                        p: 4,
                        borderRight: "1px solid rgba(255,255,255,0.1)",
                        position: "sticky", // Make it sticky
                        top: 0,          // Stick to the top
                        height: "100vh"  // Full viewport height
                    }}
                >
                    {/* Name and Description */}
                    <Box>
                        <Typography 
                            variant="h2" 
                            component="h1"
                            sx={{ 
                                color: "white", 
                                fontWeight: "bold",
                                textShadow: "2px 2px 4px rgba(0,0,0,0.5)"
                            }}
                        >
                            Chris Wang
                        </Typography>
                        <Typography 
                            variant="h5" 
                            sx={{ 
                                color: "rgba(255,255,255,0.9)",
                                mt: 1,
                                mb: 6
                            }}
                        >
                            Management Engineering <br /> @ University of Waterloo
                        </Typography>
                        <TypeWriter phrases={phrases} />

                        {/* Navigation */}
                        <Stack spacing={2} sx={{ mt: 4 }}>
                            <Typography 
                                onClick={() => scrollToSection(aboutRef)}
                                sx={{ 
                                    color: activeSection === "about" ? "white" : "rgba(255,255,255,0.6)",
                                    fontWeight: activeSection === "about" ? "bold" : "normal",
                                    cursor: "pointer",
                                    fontSize: "1.2rem",
                                    transition: "all 0.3s ease",
                                    "&:hover": { color: "white" },
                                    borderLeft: activeSection === "about" ? "3px solid white" : "3px solid transparent",
                                    pl: 2
                                }}
                            >
                                About
                            </Typography>
                            <Typography 
                                onClick={() => scrollToSection(experienceRef)}
                                sx={{ 
                                    color: activeSection === "experience" ? "white" : "rgba(255,255,255,0.6)",
                                    fontWeight: activeSection === "experience" ? "bold" : "normal",
                                    cursor: "pointer",
                                    fontSize: "1.2rem",
                                    transition: "all 0.3s ease",
                                    "&:hover": { color: "white" },
                                    borderLeft: activeSection === "experience" ? "3px solid white" : "3px solid transparent",
                                    pl: 2
                                }}
                            >
                                Experience
                            </Typography>
                            <Typography 
                                onClick={() => scrollToSection(projectsRef)}
                                sx={{ 
                                    color: activeSection === "projects" ? "white" : "rgba(255,255,255,0.6)",
                                    fontWeight: activeSection === "projects" ? "bold" : "normal",
                                    cursor: "pointer",
                                    fontSize: "1.2rem",
                                    transition: "all 0.3s ease",
                                    "&:hover": { color: "white" },
                                    borderLeft: activeSection === "projects" ? "3px solid white" : "3px solid transparent",
                                    pl: 2
                                }}
                            >
                                Projects
                            </Typography>
                        </Stack>
                    </Box>

                    {/* Social Links */}
                    <Box sx={{ display: "flex", gap: 2 }}>
                        <IconButton 
                            href="https://linkedin.com/in/yourprofile" 
                            target="_blank"
                            sx={{ 
                                color: "white",
                                "&:hover": { color: "#0077B5" }
                            }}
                        >
                            <LinkedInIcon fontSize="large" />
                        </IconButton>
                        <IconButton 
                            href="https://github.com/yourusername" 
                            target="_blank"
                            sx={{ 
                                color: "white",
                                "&:hover": { color: "#6e5494" }
                            }}
                        >
                            <GitHubIcon fontSize="large" />
                        </IconButton>
                        <IconButton 
                          href='/Chris-Wang/Resume.pdf'
                          target="_blank"
                          sx={{ 
                              color: "white",
                              "&:hover": { color: "#4CAF50" }
                          }}
                      >
                          <DescriptionIcon fontSize="large" />
                          <Typography sx={{ ml: 1, color: "white" }}>Resume</Typography>
                      </IconButton>
                    </Box>

                </Box>

                {/* Right Column - Scrollable Content */}
                <Box
                    sx={{
                        width: { xs: "100%", md: "65%" },
                        px: { xs: 2, md: 4 },
                        py: { xs: 8, md: 4 },
                        mt: { xs: 8, md: 0 } // Add margin-top on mobile for the fixed header
                    }}
                >
                    {/* About Section */}
                    <Box ref={aboutRef} sx={{ mb: 8 }}>
                    <Paper 
                      elevation={6} 
                      sx={{ 
                        background: 'transparent', 
                        boxShadow: '0 4px 20px rgba(0,0,0,0.3)', 
                        borderRadius: 2, 
                        overflow: 'hidden' 
                      }}
                    >
                      <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
                        {/* Front Side - About */}
                        <Box>
                          <About />
                          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: 2 }}>
                            <Typography variant="h6" color="white">
                              I am more than just a developer...
                            </Typography>
                            <Button 
                              style={{marginBottom: "20px"}}
                              variant="contained" 
                              onClick={handleFlip}
                              sx={{ 
                                borderRadius: 4,
                                px: 3,
                                py: 1,
                                bgcolor: '#168d40',
                                '&:hover': {
                                  bgcolor: '#1ed760'  // Slightly lighter shade for hover
                                },
                                animation: 'pulse 2s infinite',
                                '@keyframes pulse': {
                                  '0%': {
                                    boxShadow: '0 0 0 0 rgba(29, 185, 84, 0.7)',
                                  },
                                  '70%': {
                                    boxShadow: '0 0 0 10px rgba(29, 185, 84, 0)',
                                  },
                                  '100%': {
                                    boxShadow: '0 0 0 0 rgba(29, 185, 84, 0)',
                                  },
                                }
                              }}
                            >
                              Click Me!
                            </Button>
                          </Box>
                        </Box>

                        {/* Back Side - Hobby */}
                        <Box>
                          <Hobby />
                          <Box sx={{ p: 1, display: 'flex', justifyContent: 'center' }} >
                          <Button 
                              variant="contained" 
                              onClick={handleFlip}
                              sx={{ 
                                borderRadius: 4,
                                px: 3,
                                py: 1,
                                bgcolor: '#168d40',
                                '&:hover': {
                                  bgcolor: '#1ed760'  // Slightly lighter shade for hover
                                },
                                animation: 'pulse 2s infinite',
                                '@keyframes pulse': {
                                  '0%': {
                                    boxShadow: '0 0 0 0 rgba(29, 185, 84, 0.7)',
                                  },
                                  '70%': {
                                    boxShadow: '0 0 0 10px rgba(29, 185, 84, 0)',
                                  },
                                  '100%': {
                                    boxShadow: '0 0 0 0 rgba(29, 185, 84, 0)',
                                  },
                                }
                              }}
                            >
                              Back !
                            </Button>
                          </Box>
                        </Box>
                      </ReactCardFlip>
                    </Paper>
                  </Box>

                    {/* Experience Section */}
                    <Box ref={experienceRef} sx={{ mb: 8 }}>
                        <Paper elevation={6} sx={{ 
                            background: 'transparent',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                            borderRadius: 2,
                            overflow: 'hidden'
                        }}>
                            <Experience />
                        </Paper>
                    </Box>

                    {/* Projects Section */}
                    <Box ref={projectsRef} sx={{ mb: 8 }}>
                        <Paper elevation={6} sx={{ 
                            background: 'transparent',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                            borderRadius: 2,
                            overflow: 'hidden'
                        }}>
                            <Projects />
                        </Paper>
                    </Box>

                    {/* Footer */}
                    <Box sx={{ 
                        textAlign: 'center', 
                        mt: 6, 
                        pb: 3
                    }}>
                        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>
                            © {new Date().getFullYear()} Chris Wang • All Rights Reserved
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Home;