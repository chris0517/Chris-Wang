import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Typography, useMediaQuery, useTheme } from '@mui/material';

const images = import.meta.glob('../assets/Gallery/*.(png|jpg|jpeg|svg)', { eager: true });
const galleryImages = Object.fromEntries(
  Object.entries(images).map(([path, module]) => [
    path.split('/').pop(),
    module.default
  ])
);


function srcset(image, size = 180, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}


const itemData = [
  {
    img: galleryImages['hui.jpg'],
    rows: 2,
    cols: 2,
  },
  {
    img: galleryImages['scene1.jpg'],
  },
  {
    img: galleryImages['vict.jpg'],
  },
  {
    img: galleryImages['ATS group.jpg'],
    cols: 2,
  },
  {
    img: galleryImages['scene4.jpg'],
    cols: 2,
  },
  {
    img: galleryImages['elora.jpg'],
    rows: 2,
    cols: 2,
  },
  {
    img: galleryImages['rockyhui.jpg'],
  },
  {
    img: galleryImages['dino.jpg'],
  },
  {
    img: galleryImages['tuan.jpg'],
    rows: 2,
    cols: 2,
  },
  {
    img: galleryImages['group.jpg'],
    cols: 2,
  },
  {
    img: galleryImages['scene2.jpg'],
  },
  {
    img: galleryImages['algonhui.jpg'],
  },
];
const Hobby = React.forwardRef((props, ref) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  // Base row height
  const rowHeight = isMobile ? 135 : 180;
  
  // Calculate total height based on images and their row spans
  const calculateTotalRows = () => {
    let rowsNeeded = 0;
    let currentRowFill = 0;
    const totalCols = 4;
    
    // Go through each item and track rows needed
    itemData.forEach(item => {
      const itemCols = item.cols || 1;
      const itemRows = item.rows || 1;
      
      // If item doesn't fit in current row, move to next row
      if (currentRowFill + itemCols > totalCols) {
        rowsNeeded += 1;
        currentRowFill = itemCols;
      } else {
        currentRowFill += itemCols;
      }
      
      // Account for items that span multiple rows
      if (itemRows > 1) {
        rowsNeeded = Math.max(rowsNeeded + itemRows - 1, rowsNeeded);
      }
      
      // If row is filled exactly, reset for next row
      if (currentRowFill === totalCols) {
        rowsNeeded += 1;
        currentRowFill = 0;
      }
    });
    
    // If there's anything in the last row
    if (currentRowFill > 0) {
      rowsNeeded += 1;
    }
    
    return rowsNeeded;
  };
  
  // Calculate the height needed
  const totalRows = calculateTotalRows();
  const calculatedHeight = totalRows * rowHeight;
  
  // Add some padding
  const paddingY = isMobile ? 24 : 36; // 12px or 18px on top and bottom
  const totalHeight = calculatedHeight + paddingY;
  
  return (
    <Box sx={{ 
      p: { xs: 1.5, md: 2 }, 
      height: 'auto',
      width: '100%'
    }}>
      <Typography 
        variant="h6" 
        sx={{ 
          mb: 2, 
          textAlign: 'left',
          fontFamily: "'Monoton', cursive",
          position: 'relative',
          display: 'inline-block',
          letterSpacing: '2px',
          background: 'linear-gradient(90deg, #79E0EE 15%, #98EECC 40%, #D0F5BE 65%, #FBFFDC 90%)',
          backgroundSize: '300% auto',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: '0 0 3px rgba(121, 224, 238, 0.6), 0 0 5px rgba(152, 238, 204, 0.4)',
          animation: 'neon-move 12s linear infinite',
          '@keyframes neon-move': {
            '0%': {
              backgroundPosition: '0% center'
            },
            '100%': {
              backgroundPosition: '300% center'
            }
          }
        }}>
        I am more than just a developer
      </Typography>
      <Box sx={{ 
        p: { xs: 1, md: 1.5 }, 
        bgcolor: 'rgba(0, 0, 0, 0.5)', 
        borderRadius: 2,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
      }}>
    <ImageList
      sx={{ width: 800, height: 1200, overflowY: 'hidden' }}
      variant="quilted"
      cols={4}
      rowHeight={200}
    >
      {itemData.map((item) => (
        <ImageListItem key={item.img} cols={item.cols || 1} rows={item.rows || 1}>
          <img
            {...srcset(item.img, 180, item.rows, item.cols)}
            alt={item.title}
            loading="lazy"
            style={{
              objectFit: 'cover',
              // objectPosition: item.img === ATS ? 'center 30%' : // Adjust hui image position
              //               item.img === tuan ? 'center 30%' : // Adjust tuan image position
              //               item.img === scene2 ? 'center 50%' : // Adjust scene2 image position
              //               'center center' // Default position for other images
            }}
          />
        </ImageListItem>
      ))}
    </ImageList>
      </Box>
    </Box>
  );
});

// Main component that wraps Hobby in a dynamically sized Paper
const DynamicHobbyContainer = React.forwardRef((props, ref) => {
  return (
    <Box ref={ref} sx={{ mb: 8 }}>
      <Paper elevation={6} sx={{ 
        background: 'transparent',
        boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
        borderRadius: 2,
        overflow: 'hidden',
        height: 'auto' // Allow paper to adjust to content height
      }}>
        <Hobby />
      </Paper>
    </Box>
  );
});

export default DynamicHobbyContainer;