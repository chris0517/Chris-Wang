import React, { useState, useEffect, useRef } from 'react';
import { Play, SkipForward, SkipBack, Pause, Menu, X, Shuffle, Repeat } from 'lucide-react';
import bg from '../assets/bg3.jpg';
import avatar from '../assets/pfp.jpg'; // Using as placeholder
import { useNavigate } from 'react-router-dom';

const sections = [
  { id: 'about', title: 'About Me'},
  { id: 'experience', title: 'Experience'},
  { id: 'projects', title: 'Projects'},
  { id: 'contact', title: 'Contact'}
];

const Contact = () => {
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState(3); // Set to contact section
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentLinkIndex, setCurrentLinkIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isShuffleOn, setIsShuffleOn] = useState(false);
  const [isRepeatOn, setIsRepeatOn] = useState(false);
  const [duration, setDuration] = useState(10); // Duration in seconds
  const [currentTime, setCurrentTime] = useState(0);
  const progressInterval = useRef(null);
  const containerRef = useRef(null);
  const isDragging = useRef(false);
  const scrollTimeout = useRef(null);
  
  const contactLinks = [
    { text: "Check out my work on GitHub", url: "https://github.com/chris0517" },
    { text: "Connect with me on LinkedIn", url: "https://linkedin.com/in/chriswang517" },
    { text: "Download my resume to learn more", url: "/Resume.pdf" }
  ];

  const bgStyle = {
    backgroundImage: `url(${bg})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  }
  
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
    setCurrentLinkIndex(0);
  };

  const handlePrevious = () => {
    setCurrentSection((prev) => (prev - 1 + sections.length) % sections.length);
    setProgress(0);
    setCurrentTime(0);
    setCurrentLinkIndex(0);
  };

  // Update selected link based on current time
  const updateLinkIndex = (time) => {
    const timePerLink = duration / contactLinks.length;
    const exactLinkIndex = time / timePerLink;
    const linkIndex = Math.floor(exactLinkIndex);
    setCurrentLinkIndex(Math.min(linkIndex, contactLinks.length - 1));
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
    updateLinkIndex(newTime);
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
    updateLinkIndex(newTime);
    
    // Clear any existing timeout
    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }
    
    // Set a new timeout - this prevents rapid consecutive wheel events from causing jumps
    scrollTimeout.current = setTimeout(() => {
      // Calculate the exact link that should be displayed at this time
      const timePerLink = duration / contactLinks.length;
      const exactPosition = newTime / timePerLink;
      const closestLinkIndex = Math.round(exactPosition);
      
      // If we're close to the next link boundary, snap to it
      if (Math.abs(exactPosition - closestLinkIndex) < 0.2) {
        const snapTime = closestLinkIndex * timePerLink;
        setCurrentTime(snapTime);
        setProgress((snapTime / duration) * 100);
        setCurrentLinkIndex(Math.min(closestLinkIndex, contactLinks.length - 1));
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
    updateLinkIndex(newTime);
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  // Change selected link
  const handleLinkNavigation = (direction) => {
    if (direction === 'next' && currentLinkIndex < contactLinks.length - 1) {
      const nextIndex = currentLinkIndex + 1;
      setCurrentLinkIndex(nextIndex);
      
      // Calculate and set the corresponding time/progress
      const timePerLink = duration / contactLinks.length;
      const newTime = nextIndex * timePerLink;
      setCurrentTime(newTime);
      setProgress((newTime / duration) * 100);
    } else if (direction === 'prev' && currentLinkIndex > 0) {
      const prevIndex = currentLinkIndex - 1;
      setCurrentLinkIndex(prevIndex);
      
      // Calculate and set the corresponding time/progress
      const timePerLink = duration / contactLinks.length;
      const newTime = prevIndex * timePerLink;
      setCurrentTime(newTime);
      setProgress((newTime / duration) * 100);
    }
  };

  // Keyboard navigation for links
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      handleLinkNavigation('next');
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      handleLinkNavigation('prev');
    } else if (e.key === ' ') { // Spacebar
      togglePlay();
    } else if (e.key === 'Enter') {
      // Trigger the current link when Enter is pressed
      window.open(contactLinks[currentLinkIndex].url, '_blank');
    }
  };


  useEffect(() => {
    if (isPlaying) {
      progressInterval.current = setInterval(() => {
        setCurrentTime(prevTime => {
          const newTime = prevTime + 0.1;
          const progress = (newTime / duration) * 100;
          
          // Calculate which link should be selected based on current time
          updateLinkIndex(newTime);
          
          if (newTime >= duration) {
            if (isRepeatOn) {
              setProgress(0);
              setCurrentTime(0);
              setCurrentLinkIndex(0);
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
  }, [isPlaying, duration, contactLinks.length, isRepeatOn]);

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
  }, [currentLinkIndex]);

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

  // Link handling
  const handleLinkClick = (index) => {
    setCurrentLinkIndex(index);
    const link = contactLinks[index];
    
    if (link.text.toLowerCase().includes('resume')) {
      // Open resume in new window instead of downloading
      window.open('/Chris-Wang/Resume.pdf', '_blank');
    } else {
      // Handle external links
      window.open(link.url, '_blank');
    }
  };

  return (
    <div style={bgStyle} className="relative min-h-screen overflow-hidden" ref={containerRef} tabIndex={0}>
      <div style={overlayStyle}/>

      <div className="relative z-10 min-h-screen p-8">
        {/* Hamburger Menu Button */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="fixed top-6 right-6 z-50 text-white hover:text-gray-200 transition-colors cursor-pointer"
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
          {/* Centered "Contact" Title */}
          <div className="text-center mb-16 mt-6">
            <h1 className="text-5xl font-bold text-white">Contact</h1>
          </div>
          
          {/* Content Area with Links and Profile Picture */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-4xl mx-auto">
            {/* Links Section */}
            <div className="mt-8 text-xl font-bold text-white">
              {contactLinks.map((link, index) => (
                <div key={index} className="mb-12">
                  <button 
                    onClick={() => handleLinkClick(index)}
                    className={`relative text-left w-full py-2 transition-all duration-300 group cursor-pointer ${
                      index === currentLinkIndex ? 'text-green-400' : 'text-white hover:text-gray-300'
                    }`}
                  >
                    {link.text}
                    <span className={`ml-2 text-sm opacity-0 group-hover:opacity-50 ${
                      index === currentLinkIndex ? 'opacity-50' : ''
                    }`}>
                    </span>
                    <div 
                      className={`absolute bottom-0 left-0 w-full h-0.5 transition-all duration-300 ${
                        index === currentLinkIndex ? 'bg-green-400 w-full' : 'bg-white w-0'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
            
            {/* Profile Picture Section */}
            <div className="flex justify-center">
              <div className="w-64 h-64 rounded-lg overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src={avatar} // Placeholder using pfp
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-10 right-10 p-4">
          {/* Scroll Controls Visualization */}
          <div className="flex justify-center mb-4">
            <div className="text-white text-xs bg-black bg-opacity-30 rounded-full px-4 py-1 flex items-center">
              <span className="mr-3">Arrow keys to navigate</span>
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
                
                {/* Current link markers */}
                {contactLinks.map((_, index) => {
                  const markerPosition = (index / contactLinks.length) * 100;
                  const isCurrentLink = index === currentLinkIndex;
                  return (
                    <div 
                      key={index}
                      className={`absolute top-0 w-1 h-4 transition-all transform -translate-y-1 ${
                        isCurrentLink ? 'bg-green-400' : 'bg-white bg-opacity-60'
                      }`}
                      style={{ 
                        left: `${markerPosition}%`,
                        opacity: isCurrentLink ? 1 : 0.7,
                        height: isCurrentLink ? '10px' : '6px'
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
      </div>
    </div>
  );
};

export default Contact;