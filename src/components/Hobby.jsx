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

function srcset(image, size, rows = 1, cols = 1) {
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
    title: 'rockyhui',
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
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const cols = isMobile ? 2 : 4;
  const baseRowHeight = isMobile ? 160 : isTablet ? 140 : 200;
  const galleryWidth = isMobile ? '100%' : isTablet ? '95%' : 800;
  const galleryHeight = isMobile ? 1200 : isTablet ? 1000 : 1250;
  
  // Adjust item data for mobile - maintain 2 column layout but simplify large items
  const adjustedItemData = React.useMemo(() => {
    if (!isMobile) return itemData;
    
    // For mobile, adjust items that span more than 2 columns
    return itemData.map(item => ({
      ...item,
      // Limit column span to 2 on mobile (full width)
      cols: item.cols > 2 ? 2 : item.cols || 1,
      // Keep row spans but adjust for better mobile viewing
      rows: item.rows || 1
    }));
  }, [isMobile]);
  
  return (
    <Box sx={{ 
      p: { xs: 1, sm: 1.5, md: 2 }, 
      height: 'auto',
      width: '100%'
    }}>
      <Typography 
        variant="h5" 
        sx={{ 
          mb: 2, 
          fontSize: { xs: '1.75rem', sm: '1.75rem' },
          textAlign: 'left',
          fontFamily: ['Monoton', 'cursive'],
          position: 'relative',
          display: 'inline-block',
          letterSpacing: { xs: '1px', sm: '2px' },
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
        p: { xs: 0.5, sm: 1, md: 1.5 }, 
        bgcolor: 'rgba(0, 0, 0, 0.5)', 
        borderRadius: 2,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
      }}>
        <ImageList
          sx={{ 
            width: galleryWidth, 
            height: galleryHeight,
            overflow: 'auto' // Allow scrolling when needed
          }}
          variant="quilted"
          cols={cols}
          rowHeight={baseRowHeight}
          gap={isMobile ? 4 : 8}
        >
          {(isMobile ? adjustedItemData : itemData).map((item) => (
            <ImageListItem key={item.img} cols={item.cols || 1} rows={item.rows || 1}>
              <img
                {...srcset(item.img, baseRowHeight, item.rows, item.cols)}
                alt={item.title || "Gallery image"}
                loading="lazy"
                style={{
                  objectFit: item.title === 'rockyhui' ? 'cover' : 'cover',
                  objectPosition: item.title === 'rockyhui' ? 'center top' : 'center',
                  width: '100%',
                  height: '100%',
                  borderRadius: '4px'
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  return (
    <Box ref={ref} sx={{ 
      mb: { xs: 4, md: 8 },
      mx: { xs: 1, sm: 2, md: 'auto' },
      maxWidth: '100%'
    }}>
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