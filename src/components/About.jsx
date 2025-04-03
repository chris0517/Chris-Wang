import React, { useState } from 'react';
import { SiKubernetes, SiFlask } from 'react-icons/si';
import { Box, Grid, Typography, Avatar, IconButton } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import avatar from '../assets/pfp.jpg';
import csharp from '../assets/icons/c-sharp-c.svg'; 
import java from '../assets/icons/java.svg';
import python from '../assets/icons/python.svg';
import javascript from '../assets/icons/javascript.svg';
import typescript from '../assets/icons/file-type-typescript-official.svg';
import arduino from '../assets/icons/apps-arduino.svg';
import react from '../assets/icons/react.svg';
import redux from '../assets/icons/redux-original.svg';
import nodejs from '../assets/icons/file-type-node.svg';
import docker from '../assets/icons/docker.svg';
import sql from '../assets/icons/x-sql.svg';
import r from '../assets/icons/r-letter.svg';
import excel from '../assets/icons/ms-excel.svg'; 
import rest from '../assets/icons/rest-api.svg';
import databricks from '../assets/icons/databricks.svg';
import fastEndpoint from '../assets/icons/fastendpoint.png';
import dotNet from '../assets/icons/dotnet-official.svg';
import mui from '../assets/icons/material-ui.svg';
import kendo from '../assets/icons/kendo.png';
const About = () => {
  const skillCategories = {
    Languages: [
      { 
        name: 'Java', 
        icon: <img src={java} alt="Java" width={24} height={24} />
      },
      { 
        name: 'Python', 
        icon: <img src={python} alt="Python" width={24} height={24} />
      },
      { 
        name: 'JavaScript', 
        icon: <img src={javascript} alt="JavaScript" width={24} height={24} />
      },
      { 
        name: 'TypeScript', 
        icon: <img src={typescript} alt="TypeScript" width={24} height={24} />
      },
      { 
        name: 'C#', 
        icon: <img src={csharp} alt="C#" width={24} height={24} />
      },
      { 
        name: 'Arduino', 
        icon: <img src={arduino} alt="Arduino" width={24} height={24} />
      },
    ],
    Frontend: [
      { 
        name: 'React.js', 
        icon: <img src={react} alt="React" width={24} height={24} />
      },
      { 
        name: 'Redux', 
        icon: <img src={redux} alt="Redux" width={24} height={24} />
      },
      { 
        name: 'Material UI', 
        icon: <img src={mui} alt="Redux" width={24} height={24} />
      },
      { 
        name: 'Telerik Kendo React', 
        icon: <img src={kendo} alt="Redux" width={24} height={24} />
      },
    ],
    Backend: [
      { 
        name: 'Node.js', 
        icon: <img src={nodejs} alt="Node.js" width={24} height={24} />
      },
      { 
        name: 'REST API', 
        icon: <img src={rest} alt="REST API" width={24} height={24} />
      },
      { 
        name: 'Flask', 
        icon: <SiFlask color="white" size={24} />
      },
      { 
        name: '.Net', 
        icon: <img src={dotNet} alt="DotNet" width={24} height={24} />
      },
      { 
        name: 'Fast Endpoints', 
        icon: <img src={fastEndpoint} alt="FastEndpoint" width={24} height={24} />
      },
    ],
    Data: [
      { 
        name: 'SQL', 
        icon: <img src={sql} alt="SQL" width={24} height={24} />
      },
      { 
        name: 'R', 
        icon: <img src={r} alt="R" width={24} height={24} />
      },
      { 
        name: 'Excel VBA', 
        icon: <img src={excel} alt="Excel VBA" width={24} height={24} />
      },
      { 
        name: 'Databricks', 
        icon: <img src={databricks} alt="Databricks" width={24} height={24} style={{ filter: 'brightness(0) invert(1)' }} />
      },
    ],
    DevOps: [
      { 
        name: 'Docker', 
        icon: <img src={docker} alt="Docker" width={24} height={24} />
      },
      { 
        name: 'Kubernetes', 
        icon: <SiKubernetes color="white" size={24} />
      },
    ],
  };
  const intro = [
    "I'm a 4th year Management Engineering student at the University of Waterloo, with specializations in Computing and Artificial Intelligence options.",
    "I am passionate about human-computer interaction, designing software applications and haptic devices to solve real-world problems", 
    
  ];

  const contactLinks = [
    { text: 'GitHub', url: 'https://github.com/chris0517' },
    { text: 'LinkedIn', url: 'https://linkedin.com/in/chriswang517' },
    { text: 'Resume', url: '/Chris-Wang/Resume.pdf' }
  ];

  return (
    <Box sx={{ p: { xs: 1, md: 2 }, height: '100%', overflowX: 'hidden' }}>
      {/* Profile Section */}
      <Box 
        sx={{ 
          mb: 4,
          p: { xs: 2, md: 3 },
          bgcolor: 'rgba(0, 0, 0, 0.5)',
          borderRadius: 2,
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          gap: { xs: 2, md: 3 },
          textAlign: { xs: 'center', md: 'left' }
        }}
      >
        <Avatar
          src={avatar}
          alt="Profile"
          sx={{ width: { xs: 80, md: 100 }, height: { xs: 80, md: 100 }, mb: { xs: 2, md: 0 } }}
        />
        <Box>
          <Typography variant="h4" color="white" gutterBottom>
            Hello, I'm Chris!
          </Typography>
          {intro.map((line, index) => (
            <Typography key={index} variant="body1" color="white" sx={{ mb: 1 }}>
              {line}
            </Typography>
          ))}
        </Box>
      </Box>
      {/* Skills Section */}
      <Box sx={{ mb: 4, p: { xs: 2, md: 3 }, bgcolor: 'rgba(0, 0, 0, 0.5)', borderRadius: 2 }}>
        <Typography variant="h4" color="white" gutterBottom>
          Skills
        </Typography>
        {Object.entries(skillCategories).map(([category, skills]) => (
          <Box key={category} sx={{ mb: 3 }}>
            <Typography variant="h6" color="white" sx={{ mb: 2, borderBottom: '1px solid rgba(255,255,255,0.1)', pb: 1 }}>
              {category}
            </Typography>
            <Grid container spacing={2}>
              {skills.map((skill, index) => (
                <Grid item xs={6} md={4} key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {skill.icon}
                  <Typography variant="body1" color="white">{skill.name}</Typography>
                </Grid>
              ))}
            </Grid>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default About;