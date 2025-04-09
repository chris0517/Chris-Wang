import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import ATS from '../assets/Companies/ATS.png';
import RC from '../assets/Companies/rc1.png';
import HXLAB from '../assets/Companies/hxlab.png';
import UWAFT from '../assets/Companies/uwaft.png';

const experienceSections = [
  {
    company: "ATS Corporation - Innovation",
    title: "Software Developer (Innovation)",
    period: "January 2025 - Present | Cambridge",
    details: [
      "Developed IIoT API library in C# and REST API for real-time machine data exchange",
      "Built React frontend for real-time mechatronics visualization and control",
      "Containerized web applications with Docker for Edge Device deployment"
    ],
    image: ATS, 
    url: "https://atsautomation.com/"
  },
  {
    company: "ATS Corporation - Services",
    title: "Toolset Software Developer",
    period: "May 2024 - August 2024 | Cambridge",
    details: [
      "Enhanced data processing with Python, PySpark and SQL in Databricks",
      "Developed Excel VBA scripts improving workflow speed by 50%",
      "Created dynamic dashboards using Excel VBA and Power Query"
    ],
    image: ATS, 
    url: "https://atsautomation.com/"
  },
  {
    company: "Royal Canin",
    title: "Data Science Analyst",
    period: "September 2023 - December 2023 | Guelph",
    details: [
      "Analyzed Petcare data using Python Pandas for data processing",
      "Implemented regression models achieving 15.63% sales improvement",
      "Created visualizations with Matplotlib for executive reporting"
    ],
    image: RC, 
    url: "https://www.royalcanin.com/ca"
  },
  {
    company: "University of Waterloo Haptic Experience Lab",
    title: "Haptic Interactions Research Assistant",
    period: "January 2023 - August 2023 | Waterloo",
    details: [
      "Led NFRF project research initiatives and team coordination",
      "Developed Unity/C# prototypes for haptic and VR experiences",
      "Built Arduino-based haptic device prototypes with various sensors"
    ],
    image: HXLAB, 
    url: "https://uwaterloo.ca/haptic-experience-lab/"
  },
  {
    company: "University of Waterloo Alternative Fuels Team (UWAFT)",
    title: "Connected & Automated Vehicles Student Developer",
    period: "April 2023 - April 2024 | Waterloo",
    details: [
      "Utilizing Python, ROS 2 and RVIZ 2 to extract Control Area Network (CAN) data, visualize extracted information",
      "Analyzing and improving the accuracy of lidar detection machine learning models through the use of PyTorch in Python"
    ],
    image: UWAFT, 
    url: "https://www.uwaft.ca/"
  }
];

export default function ExperienceTimeline() {
  return (
    <Box sx={{
      width: '100%',
      overflowX: 'hidden',
      padding: { xs: 1, md: 2 },
    }}>     
    <Box sx={{ 
      p: 3,
      bgcolor: 'rgba(0, 0, 0, 0.5)',
      borderRadius: 2,
    }}>
      <Typography variant="h4" sx={{ mb: 2, textAlign: 'left', color: 'white' }}>
        Experiences
      </Typography>
 
        <Timeline
          position="right"
          sx={{
            padding: { xs: 0, md: 'inherit' },
            overflowX: 'hidden',
            '& .MuiTimelineItem-root': {
              '&::before': {
                display: 'none', // Remove the opposite content space
              },
            },
          }}
        >
          {experienceSections.map((experience, index) => (
            <TimelineItem key={index}>
              <TimelineSeparator>
                <TimelineConnector />
                <TimelineDot sx={{ 
                  p: 0, 
                  width: { xs: 60, md: 80 }, 
                  height: { xs: 60, md: 80 }, 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center',
                  backgroundColor: 'transparent', 
                  boxShadow: 'none',
                }}>
                  <img 
                    src={experience.image} 
                    alt={experience.company} 
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'contain',
                      borderRadius: '50%',
                      objectPosition: experience.image === ATS ? 'left 30%' : 'center center',
                    }} 
                  />            
                </TimelineDot>
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent sx={{ py: '12px', px: 2 }}>
                <Typography
                  component="a"
                  onClick={() => window.open(experience.url, '_blank')}
                  target="_blank"
                  color="white"
                  variant="h6"
                  sx={{
                    textDecoration: 'none',
                    cursor: 'pointer', // Add cursor pointer for hand icon
                    '&:hover': { textDecoration: 'underline', color: 'rgba(255, 255, 255, 0.8)' },
                  }}
                >
                  {experience.title}
                </Typography>
                <Typography color='rgba(255, 255, 255, 0.7)'>{experience.company}</Typography>
                <Typography variant="body2" color="rgba(255, 255, 255, 0.7)" sx={{ mt: 1 }}>
                  {experience.period}
                </Typography>
                {experience.details.map((detail, i) => (
                  <Typography key={i} variant="body2" color="white" sx={{ mt: 1 }}>
                    {detail}
                  </Typography>
                ))}
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </Box>
    </Box>
  );
}