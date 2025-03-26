import React, { useState, useEffect, useRef } from 'react';
import { Play, SkipForward, SkipBack, Pause, Menu, X, Shuffle, Repeat } from 'lucide-react';
import bg from '../assets/bg3.jpg';
import avatar from '../assets/pfp.jpg';
import { Grid2 } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const sections = [
  { id: 'about', title: 'About Me'},
  { id: 'experience', title: 'Experience'},
  { id: 'projects', title: 'Projects'},
  { id: 'contact', title: 'Contact'}
];

const About = () => {
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentLyricIndex, setCurrentLyricIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isShuffleOn, setIsShuffleOn] = useState(false);
  const [isRepeatOn, setIsRepeatOn] = useState(false);
  const [duration, setDuration] = useState(10); // Duration in seconds
  const [currentTime, setCurrentTime] = useState(0);
  const progressInterval = useRef(null);
  const containerRef = useRef(null);
  const isDragging = useRef(false);
  const lastScrollPosition = useRef(0);
  const scrollTimeout = useRef(null);
  
  const introLyrics = [
    "Hi, I'm Chris Wang,",
    "A 4th year Management Engineering student at the University of Waterloo",
    "With a passion for product management and software development",
    "Skilled in React, JavaScript, and UX design",
  ];

  const bgStyle = {
    backgroundImage: `url(${bg})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    position: "relative",
  };

  const overlayStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust the opacity as needed
    zIndex: 1,
  };
  

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getNextSection = () => {
    if (isShuffleOn) {
      const availableSections = sections.filter((_, index) => index !== currentSection);
      const randomIndex = Math.floor(Math.random() * availableSections.length);
      return sections.findIndex(section => section === availableSections[randomIndex]);
    }
    return (currentSection + 1) % sections.length;
  };

  const handleNext = () => {
    const nextSection = getNextSection();
    setCurrentSection(nextSection);
    setProgress(0);
    setCurrentTime(0);
    setCurrentLyricIndex(0);
  };

  const handlePrevious = () => {
    setCurrentSection((prev) => (prev - 1 + sections.length) % sections.length);
    setProgress(0);
    setCurrentTime(0);
    setCurrentLyricIndex(0);
  };

  // Update lyrics based on current time
  const updateLyricIndex = (time) => {
    const timePerLyric = duration / introLyrics.length;
    const exactLyricIndex = time / timePerLyric;
    const lyricIndex = Math.floor(exactLyricIndex);
    setCurrentLyricIndex(Math.min(lyricIndex, introLyrics.length - 1));
  };

  // Handle manual progress change through clicking/dragging on the progress bar
  const handleProgressBarClick = (e) => {
    if (!containerRef.current) return;
    
    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const clickPosition = e.clientX - rect.left;
    const progressPercentage = (clickPosition / rect.width) * 100;
    const newTime = (progressPercentage / 100) * duration;
    
    setProgress(progressPercentage);
    setCurrentTime(newTime);
    updateLyricIndex(newTime);
  };

  // Handle wheel scrolling to change progress with smoother transitions
  const handleWheel = (e) => {
    e.preventDefault();
    
    // Adjust sensitivity - make it smaller for finer control
    const scrollSensitivity = 0.01; 
    const scrollAmount = e.deltaY * scrollSensitivity;
    
    // Calculate new time with boundaries
    const newTime = Math.max(0, Math.min(duration, currentTime + scrollAmount));
    const newProgress = (newTime / duration) * 100;
    
    setCurrentTime(newTime);
    setProgress(newProgress);
    updateLyricIndex(newTime);
    
    // Clear any existing timeout
    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }
    
    // Set a new timeout - this prevents rapid consecutive wheel events from causing jumps
    scrollTimeout.current = setTimeout(() => {
      // Calculate the exact lyrics that should be displayed at this time
      const timePerLyric = duration / introLyrics.length;
      const exactPosition = newTime / timePerLyric;
      const closestLyricIndex = Math.round(exactPosition);
      
      // If we're close to the next lyric boundary, snap to it
      if (Math.abs(exactPosition - closestLyricIndex) < 0.2) {
        const snapTime = closestLyricIndex * timePerLyric;
        setCurrentTime(snapTime);
        setProgress((snapTime / duration) * 100);
        setCurrentLyricIndex(Math.min(closestLyricIndex, introLyrics.length - 1));
      }
    }, 150);
  };

  // Mouse events for drag functionality
  const handleMouseDown = (e) => {
    isDragging.current = true;
    handleProgressBarClick(e);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current || !containerRef.current) return;
    
    const progressBar = containerRef.current.querySelector('.progress-bar');
    if (!progressBar) return;
    
    const rect = progressBar.getBoundingClientRect();
    const movePosition = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
    const progressPercentage = (movePosition / rect.width) * 100;
    const newTime = (progressPercentage / 100) * duration;
    
    setProgress(progressPercentage);
    setCurrentTime(newTime);
    updateLyricIndex(newTime);
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  // Display next lyrics by time progression
  const handleLyricNavigation = (direction) => {
    if (direction === 'next' && currentLyricIndex < introLyrics.length - 1) {
      const nextIndex = currentLyricIndex + 1;
      setCurrentLyricIndex(nextIndex);
      
      // Calculate and set the corresponding time/progress
      const timePerLyric = duration / introLyrics.length;
      const newTime = nextIndex * timePerLyric;
      setCurrentTime(newTime);
      setProgress((newTime / duration) * 100);
    } else if (direction === 'prev' && currentLyricIndex > 0) {
      const prevIndex = currentLyricIndex - 1;
      setCurrentLyricIndex(prevIndex);
      
      // Calculate and set the corresponding time/progress
      const timePerLyric = duration / introLyrics.length;
      const newTime = prevIndex * timePerLyric;
      setCurrentTime(newTime);
      setProgress((newTime / duration) * 100);
    }
  };

  // Keyboard navigation for lyrics
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      handleLyricNavigation('next');
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      handleLyricNavigation('prev');
    } else if (e.key === ' ') { // Spacebar
      togglePlay();
    }
  };

  useEffect(() => {
    if (isPlaying) {
      progressInterval.current = setInterval(() => {
        setCurrentTime(prevTime => {
          const newTime = prevTime + 0.1;
          const progress = (newTime / duration) * 100;
          
          // Calculate which lyrics should be visible based on current time
          updateLyricIndex(newTime);
          
          if (newTime >= duration) {
            if (isRepeatOn) {
              setProgress(0);
              setCurrentTime(0);
              setCurrentLyricIndex(0);
              return 0;
            } else {
              clearInterval(progressInterval.current);
              setProgress(100);
              setCurrentTime(duration);
              handleNext();
              return duration;
            }
          }
          
          setProgress(progress);
          return newTime;
        });
      }, 100);
    } else {
      clearInterval(progressInterval.current);
    }
  
    return () => clearInterval(progressInterval.current);
  }, [isPlaying, duration, introLyrics.length, isRepeatOn]);

  // Add wheel event listener
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
      
      return () => {
        container.removeEventListener('wheel', handleWheel);
      };
    }
  }, [currentTime, duration]);

  // Add keyboard event listener
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentLyricIndex]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('keydown', handleKeyDown);
      clearTimeout(scrollTimeout.current);
    };
  }, []);

  const togglePlay = () => setIsPlaying(!isPlaying);
  const toggleShuffle = () => setIsShuffleOn(!isShuffleOn);
  const toggleRepeat = () => setIsRepeatOn(!isRepeatOn);

  // In your render method
  const visibleLyrics = introLyrics.slice(0, currentLyricIndex + 1);

  return (
    <div style={bgStyle} className="relative min-h-screen overflow-hidden" ref={containerRef} tabIndex={0}>
      <div style={overlayStyle}></div>
      <div className="relative z-10 min-h-screen p-8">
        {/* Hamburger Menu Button */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="cursor-pointer fixed top-6 right-6 z-50 text-white hover:text-gray-200 transition-colors cursor-pointer"
        >
          {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
        </button>

        {/* Navigation Menu Overlay */}
        <div 
          className={`fixed top-0 right-0 w-64 backdrop-blur-sm transition-all duration-300 z-40 
            ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        >
          <div 
            className={`bg-black bg-opacity-40 p-8 rounded-lg mt-20 mr-4 transform transition-all duration-300
              ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
          >
            <div className="grid gap-6">
            {sections.map((section, index) => (
              <button
                key={section.id}
                onClick={() => {
                  const path = section.id === 'about' ? '/' : `/${section.id}`;
                  navigate(path);
                  setIsMenuOpen(false);
                }}
                className={`px-8 py-3 rounded-lg text-xl transition-colors
                  ${currentSection === index 
                    ? 'text-white font-bold' 
                    : 'cursor-pointer text-gray-400 hover:text-white'
                  }`}
              >
                {section.title}
              </button>
            ))}
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Profile Section */}
            <div className="md:col-span-4 flex justify-center">
              <div className="w-48 h-48 rounded-lg overflow-hidden shadow-2xl">
                <img
                  src={avatar}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Content Section */}
            <div className="md:col-span-8">
              <div className="text-left">
                <h1 className="text-4xl font-bold text-white">About Me</h1>
              </div>
            </div>
          </div>

          <div className="absolute bottom-10 left-10 right-10 p-4">
            {/* Scroll Controls Visualization */}
            <div className="flex justify-center mb-4">
              <div className="text-white text-xs bg-black bg-opacity-30 rounded-full px-4 py-1 flex items-center">
                <span className="mr-3">Scroll to navigate</span>
                <span className="flex items-center justify-center w-6 h-6 bg-white bg-opacity-20 rounded-full mr-1">↑</span>
                <span className="flex items-center justify-center w-6 h-6 bg-white bg-opacity-20 rounded-full mr-2">↓</span>
                <span className="ml-3">Spacebar to play/pause</span>
              </div>
            </div>
          
            {/* Controls Section */}
            <div className="mt-4">
              {/* Progress Bar with Time */}
              <div className="flex items-center gap-2 text-gray-200 text-sm mb-4">
                <span>{formatTime(currentTime)}</span>
                <div 
                  className="flex-1 bg-gray-600 h-2 rounded-full overflow-hidden cursor-pointer progress-bar relative group"
                  onClick={handleProgressBarClick}
                  onMouseDown={handleMouseDown}
                >
                  <div 
                    className="h-full bg-white transition-all"
                    style={{ width: `${progress}%` }}
                  />
                  
                  {/* Current lyric markers */}
                  {introLyrics.map((_, index) => {
                    const markerPosition = (index / introLyrics.length) * 100;
                    const isCurrentLyric = index === currentLyricIndex;
                    return (
                      <div 
                        key={index}
                        className={`absolute top-0 w-1 h-4 transition-all transform -translate-y-1 ${
                          isCurrentLyric ? 'bg-green-400' : 'bg-white bg-opacity-60'
                        }`}
                        style={{ 
                          left: `${markerPosition}%`,
                          opacity: isCurrentLyric ? 1 : 0.7,
                          height: isCurrentLyric ? '10px' : '6px'
                        }}
                      />
                    );
                  })}
                </div>
                <span>{formatTime(duration)}</span>
              </div>

              {/* Player Controls */}
              <div className=" flex items-center justify-center space-x-8">
                <button 
                  onClick={toggleShuffle}
                  className={`cursor-pointer text-2xl transition-colors ${isShuffleOn ? 'text-green-500' : 'text-white hover:scale-105'}`}
                >
                  <Shuffle size={20} />
                </button>
                <button 
                  onClick={handlePrevious} 
                  className="cursor-pointer text-white hover:scale-105 transition-colors"
                >
                  <SkipBack size={20} style={{ fill: 'white' }} />
                </button>
                <button 
                  onClick={togglePlay} 
                  className="cursor-pointer text-white hover:scale-105 transition-colors p-2 rounded-full border-2 border-white"
                  style={{ backgroundColor: 'white' }}
                >
                  {isPlaying ? <Pause size={28} style={{ fill: 'black' }} /> : <Play size={28} style={{ fill: 'black' }} />}
                </button>
                <button 
                  onClick={handleNext} 
                  className="cursor-pointer text-white hover:scale-105 transition-colors"
                >
                  <SkipForward size={20} style={{ fill: 'white' }} />
                </button>
                <button 
                  onClick={toggleRepeat}
                  className={`cursor-pointer text-2xl transition-colors ${isRepeatOn ? 'text-green-500' : 'text-white hover:scale-105'}`}
                >
                  <Repeat size={20} />
                </button>
              </div>
            </div>
          </div>
          
          {/* Lyrics Section */}
          <div className="mt-8 max-w-xl mx-auto text-xl font-bold text-white">
            <div>
              {visibleLyrics.map((lyric, index) => (
                <p 
                  key={index} 
                  className={`mb-3 transition-all duration-300 ${
                    index === currentLyricIndex ? 'text-green-400' : 'text-white'
                  }`}
                  style={{
                    transform: index === currentLyricIndex ? 'scale(1.05)' : 'scale(1)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {lyric}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;