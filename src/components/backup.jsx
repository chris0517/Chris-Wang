import React, { useState, useEffect, useRef } from 'react';
import { Play, SkipForward, SkipBack, Pause, Menu, X, Shuffle, Repeat } from 'lucide-react';
import bg from '../assets/bg3.jpg';
import avatar from '../assets/pfp.jpg';
import { useNavigate } from 'react-router-dom';
import ATS from '../../public/Companies/ATS.png';
import RC from '../../public/Companies/rc1.png';
import HXLAB from '../../public/Companies/hxlab.png';
import UWAFT from '../../public/Companies/uwaft.png';
import PlayBar from './PlayBar';
const sections = [
  { id: 'about', title: 'About Me'},
  { id: 'experience', title: 'Experience'},
  { id: 'projects', title: 'Projects'},
  { id: 'contact', title: 'Contact'}
];

// Group experiences by company
const experienceSections = [
  {
    company: "ATS Corporation - Innovation",
    title: "Software Developer (Innovation)",
    period: "January 2025 - Present | Cambridge",
    details: [
      "• Developed IIoT API library in C# and REST API for real-time machine data exchange",
      "• Built React frontend for real-time mechatronics visualization and control",
      "• Containerized web applications with Docker for Edge Device deployment"
    ], 
    images: [
      ATS
    ]
  },
  {
    company: "ATS Corporation - Services",
    title: "Toolset Software Developer",
    period: "May 2024 - August 2024 | Cambridge",
    details: [
      "• Enhanced data processing with Python, PySpark and SQL in Databricks",
      "• Developed Excel VBA scripts improving workflow speed by 50%",
      "• Created dynamic dashboards using Excel VBA and Power Query"
    ], 
    images: [
      ATS,
    ]
  },
  {
    company: "Royal Canin",
    title: "Data Science Analyst",
    period: "September 2023 - December 2023 | Guelph",
    details: [
      "• Analyzed Petcare data using Python Pandas for data processing",
      "• Implemented regression models achieving 15.63% sales improvement",
      "• Created visualizations with Matplotlib for executive reporting"
    ], 
    images: [
      RC
    ]
  },
  {
    company: "University of Waterloo Haptic Experience Lab",
    title: "Haptic Interactions Research Assistant",
    period: "January 2023 - August 2023 | Waterloo",
    details: [
      "• Led NFRF project research initiatives and team coordination",
      "• Developed Unity/C# prototypes for haptic and VR experiences",
      "• Built Arduino-based haptic device prototypes with various sensors"
    ], 
    images: [
      HXLAB
    ]
  },
  {
    company: "University of Waterloo Alternative Fuels Team (UWAFT) ",
    title: "Connected & Automated Vehicles Student Developer",
    period: "April 2023 - April 2024 | Waterloo",
    details: [
      "•  Utilizing Python, ROS 2 and RVIZ 2 to extract Control Area Network (CAN) data, visualize extracted information",
      "•  Analyzing and improving the accuracy of lidar detection machine learning models through the use of PyTorch in python ",
    ], 
    images: [
      UWAFT
    ]
  }
];

const Experience = () => {
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentExperienceIndex, setCurrentExperienceIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isShuffleOn, setIsShuffleOn] = useState(false);
  const [isRepeatOn, setIsRepeatOn] = useState(false);
  const [duration, setDuration] = useState(10); // Duration in seconds
  const [currentTime, setCurrentTime] = useState(0);
  const [showAll, setShowAll] = useState(true);

  const progressInterval = useRef(null);
  const containerRef = useRef(null);
  const isDragging = useRef(false);
  const scrollTimeout = useRef(null);

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

  useEffect(() => {
    const currentPath = window.location.pathname;
    const sectionIndex = sections.findIndex(section => 
      currentPath === (section.id === 'about' ? '/' : `/${section.id}`)
    );
    if (sectionIndex !== -1) {
      setCurrentSection(sectionIndex);
    }
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getNextSection = () => {
    if (isShuffleOn) {
      const availableIndices = Array.from(
        { length: experienceSections.length }, 
        (_, i) => i
      ).filter(i => i !== currentExperienceIndex);
      
      const randomIndex = Math.floor(Math.random() * availableIndices.length);
      return availableIndices[randomIndex];
    }
    return (currentExperienceIndex + 1) % experienceSections.length;
  };

  const handleNext = () => {
    const nextIndex = getNextSection();
    setCurrentExperienceIndex(nextIndex);
    setProgress(calculateProgress(nextIndex));
    setCurrentTime(calculateTime(nextIndex));
  };

  const handlePrevious = () => {
    const prevIndex = (currentExperienceIndex - 1 + experienceSections.length) % experienceSections.length;
    setCurrentExperienceIndex(prevIndex);
    setProgress(calculateProgress(prevIndex));
    setCurrentTime(calculateTime(prevIndex));
  };

  // Calculate progress percentage based on experience index
  const calculateProgress = (index) => {
    // For the last item, set progress to 100%
    if (index === experienceSections.length - 1) {
      return 100;
    }
    // For other items, calculate proportionally
    return (index / (experienceSections.length - 1)) * 100;
  };

  // Calculate time based on experience index
  const calculateTime = (index) => {
    // For the last item, return full duration
    if (index === experienceSections.length - 1) {
      return duration;
    }
    // For other items, calculate proportionally
    return (index / (experienceSections.length - 1)) * duration;
  };

  // Jump to a specific experience based on progress
  const jumpToExperience = (time) => {
    // Calculate which experience to show based on the time
    const percentageComplete = time / duration;
    
    // Find the index based on percentage
    let targetIndex;
    if (percentageComplete >= 1) {
      targetIndex = experienceSections.length - 1;
    } else if (percentageComplete <= 0) {
      targetIndex = 0;
    } else {
      // Calculate the target index based on the percentage
      targetIndex = Math.round(percentageComplete * (experienceSections.length - 1));
    }
    
    setCurrentExperienceIndex(targetIndex);
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
    jumpToExperience(newTime);
  };

  // Modify the wheel event listener useEffect
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
      
      return () => {
        container.removeEventListener('wheel', handleWheel);
      };
    }
  }, [currentExperienceIndex, showAll]); // Add showAll to dependencies
  
  const handleWheel = (e) => {
    if (!showAll) {
      e.preventDefault();
      
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
      
      scrollTimeout.current = setTimeout(() => {
        if (e.deltaY > 0) {
          // Scroll down - next experience
          if (currentExperienceIndex < experienceSections.length - 1) {
            const nextIndex = currentExperienceIndex + 1;
            setCurrentExperienceIndex(nextIndex);
            setProgress(calculateProgress(nextIndex));
            setCurrentTime(calculateTime(nextIndex));
          } else if (isRepeatOn) {
            setCurrentExperienceIndex(0);
            setProgress(0);
            setCurrentTime(0);
          }
        } else if (e.deltaY < 0) {
          // Scroll up - previous experience
          if (currentExperienceIndex > 0) {
            const prevIndex = currentExperienceIndex - 1;
            setCurrentExperienceIndex(prevIndex);
            setProgress(calculateProgress(prevIndex));
            setCurrentTime(calculateTime(prevIndex));
          }
        }
      }, 50);
    }
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
    jumpToExperience(newTime);
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      handleNext();
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      handlePrevious();
    } else if (e.key === ' ') { // Spacebar
      togglePlay();
    }
  };

  useEffect(() => {
    if (isPlaying) {
      progressInterval.current = setInterval(() => {
        setCurrentTime(prevTime => {
          const newTime = prevTime + 0.1;
          
          if (newTime >= duration) {
            if (isRepeatOn) {
              setProgress(0);
              setCurrentTime(0);
              setCurrentExperienceIndex(0);
              return 0;
            } else {
              clearInterval(progressInterval.current);
              setProgress(100);
              setCurrentTime(duration);
              setIsPlaying(false);
              return duration;
            }
          }
          
          const progress = (newTime / duration) * 100;
          setProgress(progress);
          
          // Determine which experience should be shown based on progress
          jumpToExperience(newTime);
          
          return newTime;
        });
      }, 100);
    } else {
      clearInterval(progressInterval.current);
    }
  
    return () => clearInterval(progressInterval.current);
  }, [isPlaying, duration, isRepeatOn]);

  // Add wheel event listener
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
      
      return () => {
        container.removeEventListener('wheel', handleWheel);
      };
    }
  }, [currentExperienceIndex]);

  // Add keyboard event listener
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentExperienceIndex]);

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

  // Get current experience to display
  const currentExperience = experienceSections[currentExperienceIndex];

  return (
    <div style={bgStyle} className="relative min-h-screen overflow-hidden" ref={containerRef} tabIndex={0}>
      <div style={overlayStyle}></div>
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
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">

            {/* Content Section */}
            <div className="md:col-span-8">
              <div className="text-left">
                <h1 className="text-4xl font-bold text-white">Experiences</h1>
              </div>
            </div>
          </div>

          <PlayBar />
          
          {/* Experience Section */}
          <div className="mt-8 mb-48 max-w-6xl mx-auto text-white h-[calc(100vh-350px)]">
            <div 
              className="transform transition-all duration-500 h-full overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent"
              style={{
                scrollbarWidth: 'thin',
                msOverflowStyle: 'none'
              }}
            >             
            {showAll ? (
                // Show all experiences
                <div className="space-y-16 max-w-6xl mx-auto">
                  {experienceSections.map((experience, index) => (
                    <div key={index} className="animate-fadeIn flex flex-col md:flex-row gap-8">
                      {/* Images Column */}
                      <div className="flex-shrink-0 space-y-4">
                        {experience.images.map((image, idx) => (
                          <div key={idx} className="w-40 h-40 md:w-52 md:h-52 rounded-lg overflow-hidden shadow-2xl">
                            <img
                              src={image}
                              alt={`${experience.company} image ${idx + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>

                      {/* Experience Details Column */}
                      <div className="flex-grow">
                        <h2 className="text-xl md:text-2xl font-bold text-green-400 mb-2">{experience.company}</h2>
                        <h3 className="text-lg md:text-xl font-bold mb-1">{experience.title}</h3>
                        <p className="text-md md:text-lg text-gray-300 mb-4">{experience.period}</p>
                        
                        {experience.details.map((detail, idx) => (
                          <p 
                            key={idx} 
                            className="mb-3 text-md md:text-lg"
                          >
                            {detail}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                // Show current experience only (existing code)
                <div key={currentExperienceIndex} className="animate-fadeIn flex flex-col md:flex-row gap-8">
                    {/* Experience Section */}
                    <div className="mt-8 max-w-5xl mx-auto text-white">
                      <div className="transform transition-all duration-500">
                        <div key={currentExperienceIndex} className="animate-fadeIn flex flex-col md:flex-row gap-8">
                          {/* Images Column */}
                          <div className="flex-shrink-0 space-y-4">
                            {currentExperience.images.map((image, idx) => (
                              <div key={idx} className="w-40 h-40 md:w-52 md:h-52 rounded-lg overflow-hidden shadow-2xl">
                                <img
                                  src={image}
                                  alt={`${currentExperience.company} image ${idx + 1}`}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            ))}
                          </div>

                          {/* Experience Details Column */}
                          <div className="flex-grow">
                            <h2 className="text-xl md:text-2xl font-bold text-green-400 mb-2">{currentExperience.company}</h2>
                            <h3 className="text-lg md:text-xl font-bold mb-1">{currentExperience.title}</h3>
                            <p className="text-md md:text-lg text-gray-300 mb-4">{currentExperience.period}</p>
                            
                            {currentExperience.details.map((detail, idx) => (
                              <p 
                                key={idx} 
                                className="mb-3 text-md md:text-lg"
                                style={{
                                  animation: `fadeIn 0.5s ease ${idx * 0.2}s forwards`,
                                  opacity: 0
                                }}
                              >
                                {detail}
                              </p>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>      
                    </div>
              )}
            </div>

            {/* Toggle Button */}
            <div className="fixed bottom-6 right-6 z-50">
            <button
                onClick={() => setShowAll(!showAll)}
                className="flex items-center gap-2 px-4 py-2 bg-black bg-opacity-40 hover:bg-opacity-60 
                  text-white rounded-full transition-all duration-300"
              >
                <span>{showAll ? 'Show Current' : 'Show All'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Add CSS animation */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease;
        }
      `}</style>

      <style jsx global>{`
        /* Hide default scrollbar for Chrome, Safari and Opera */
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }

        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }

        .scrollbar-thin::-webkit-scrollbar-thumb {
          background-color: rgba(156, 163, 175, 0.5);
          border-radius: 3px;
        }

        /* For Firefox */
        .scrollbar-thin {
          scrollbar-width: thin;
          scrollbar-color: rgba(156, 163, 175, 0.5) transparent;
        }
      `}</style>
    </div>
  );
};

export default Experience;

import React, { useState, useEffect, useRef } from 'react';
import { Play, SkipForward, SkipBack, Pause, Menu, X, Shuffle, Repeat } from 'lucide-react';
import bg from '../assets/bg3.jpg';
import avatar from '../assets/pfp.jpg';
import { useNavigate } from 'react-router-dom';
import ATS from '../../public/Companies/ATS.png';
import RC from '../../public/Companies/rc1.png';
import HXLAB from '../../public/Companies/hxlab.png';
import UWAFT from '../../public/Companies/uwaft.png';
const sections = [
  { id: 'about', title: 'About Me'},
  { id: 'experience', title: 'Experience'},
  { id: 'projects', title: 'Projects'},
  { id: 'contact', title: 'Contact'}
];

const projectsSections = [
  {
    project: "Mental Note",
    location: "HackPrinceton (Princeton University)",
    period: "Technologies: React, Flask, Firebase, OpenAI, HuggingFace, Python, HTML, CSS",
    details: [
      "• Built a personal mood tracker, allowing users to document their daily emotions in the form of a sentiment journal",
      "• Utilizes the open-source code of the sentiment analysis ML model on HuggingFace to detect the user emotion",
      "• Implemented an image generating system using Firebase, Python and Flask as the backend with the OpenAI’s API and neural style transfer ML model API to produce a combined image that reflects the user’s detected emotion"
    ], 
    images: [
      ATS, RC, HXLAB
    ]
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
    images: [
      ATS,
    ]
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
    images: [
      RC
    ]
  },
];

const Experience = () => {
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentExperienceIndex, setCurrentExperienceIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isShuffleOn, setIsShuffleOn] = useState(false);
  const [isRepeatOn, setIsRepeatOn] = useState(false);
  const [duration, setDuration] = useState(10); // Duration in seconds
  const [currentTime, setCurrentTime] = useState(0);
  const [showAll, setShowAll] = useState(false);

  const progressInterval = useRef(null);
  const containerRef = useRef(null);
  const isDragging = useRef(false);
  const scrollTimeout = useRef(null);

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

  useEffect(() => {
    const currentPath = window.location.pathname;
    const sectionIndex = sections.findIndex(section => 
      currentPath === (section.id === 'about' ? '/' : `/${section.id}`)
    );
    if (sectionIndex !== -1) {
      setCurrentSection(sectionIndex);
    }
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getNextSection = () => {
    if (isShuffleOn) {
      const availableIndices = Array.from(
        { length: projectsSections.length }, 
        (_, i) => i
      ).filter(i => i !== currentExperienceIndex);
      
      const randomIndex = Math.floor(Math.random() * availableIndices.length);
      return availableIndices[randomIndex];
    }
    return (currentExperienceIndex + 1) % projectsSections.length;
  };

  const handleNext = () => {
    const nextIndex = getNextSection();
    setCurrentExperienceIndex(nextIndex);
    setProgress(calculateProgress(nextIndex));
    setCurrentTime(calculateTime(nextIndex));
  };

  const handlePrevious = () => {
    const prevIndex = (currentExperienceIndex - 1 + projectsSections.length) % projectsSections.length;
    setCurrentExperienceIndex(prevIndex);
    setProgress(calculateProgress(prevIndex));
    setCurrentTime(calculateTime(prevIndex));
  };

  // Calculate progress percentage based on experience index
  const calculateProgress = (index) => {
    // For the last item, set progress to 100%
    if (index === projectsSections.length - 1) {
      return 100;
    }
    // For other items, calculate proportionally
    return (index / (projectsSections.length - 1)) * 100;
  };

  // Calculate time based on experience index
  const calculateTime = (index) => {
    // For the last item, return full duration
    if (index === projectsSections.length - 1) {
      return duration;
    }
    // For other items, calculate proportionally
    return (index / (projectsSections.length - 1)) * duration;
  };

  // Jump to a specific experience based on progress
  const jumpToExperience = (time) => {
    // Calculate which experience to show based on the time
    const percentageComplete = time / duration;
    
    // Find the index based on percentage
    let targetIndex;
    if (percentageComplete >= 1) {
      targetIndex = projectsSections.length - 1;
    } else if (percentageComplete <= 0) {
      targetIndex = 0;
    } else {
      // Calculate the target index based on the percentage
      targetIndex = Math.round(percentageComplete * (projectsSections.length - 1));
    }
    
    setCurrentExperienceIndex(targetIndex);
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
    jumpToExperience(newTime);
  };

  // Modify the wheel event listener useEffect
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
      
      return () => {
        container.removeEventListener('wheel', handleWheel);
      };
    }
  }, [currentExperienceIndex, showAll]); // Add showAll to dependencies
  
  const handleWheel = (e) => {
    if (!showAll) {
      e.preventDefault();
      
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
      
      scrollTimeout.current = setTimeout(() => {
        if (e.deltaY > 0) {
          // Scroll down - next experience
          if (currentExperienceIndex < projectsSections.length - 1) {
            const nextIndex = currentExperienceIndex + 1;
            setCurrentExperienceIndex(nextIndex);
            setProgress(calculateProgress(nextIndex));
            setCurrentTime(calculateTime(nextIndex));
          } else if (isRepeatOn) {
            setCurrentExperienceIndex(0);
            setProgress(0);
            setCurrentTime(0);
          }
        } else if (e.deltaY < 0) {
          // Scroll up - previous experience
          if (currentExperienceIndex > 0) {
            const prevIndex = currentExperienceIndex - 1;
            setCurrentExperienceIndex(prevIndex);
            setProgress(calculateProgress(prevIndex));
            setCurrentTime(calculateTime(prevIndex));
          }
        }
      }, 50);
    }
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
    jumpToExperience(newTime);
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      handleNext();
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      handlePrevious();
    } else if (e.key === ' ') { // Spacebar
      togglePlay();
    }
  };

  useEffect(() => {
    if (isPlaying) {
      progressInterval.current = setInterval(() => {
        setCurrentTime(prevTime => {
          const newTime = prevTime + 0.1;
          
          if (newTime >= duration) {
            if (isRepeatOn) {
              setProgress(0);
              setCurrentTime(0);
              setCurrentExperienceIndex(0);
              return 0;
            } else {
              clearInterval(progressInterval.current);
              setProgress(100);
              setCurrentTime(duration);
              setIsPlaying(false);
              return duration;
            }
          }
          
          const progress = (newTime / duration) * 100;
          setProgress(progress);
          
          // Determine which experience should be shown based on progress
          jumpToExperience(newTime);
          
          return newTime;
        });
      }, 100);
    } else {
      clearInterval(progressInterval.current);
    }
  
    return () => clearInterval(progressInterval.current);
  }, [isPlaying, duration, isRepeatOn]);

  // Add wheel event listener
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
      
      return () => {
        container.removeEventListener('wheel', handleWheel);
      };
    }
  }, [currentExperienceIndex]);

  // Add keyboard event listener
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentExperienceIndex]);

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

  // Get current experience to display
  const currentExperience = projectsSections[currentExperienceIndex];

  return (
    <div style={bgStyle} className="relative min-h-screen overflow-hidden" ref={containerRef} tabIndex={0}>
      <div style={overlayStyle}></div>
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
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Profile Section */}
            {/* <div className="md:col-span-4 flex justify-center">
              <div className="w-48 h-48 rounded-lg overflow-hidden shadow-2xl">
                <img
                  src={avatar}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div> */}

            {/* Content Section */}
            <div className="md:col-span-8">
              <div className="text-left">
                <h1 className="text-4xl font-bold text-white">Experiences</h1>
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
                  
                  {/* Experience markers */}
                  {projectsSections.map((_, index) => {
                    // Calculate position for markers evenly across the progress bar
                    const markerPosition = (index / projectsSections.length) * 100;
                    const isCurrentExperience = index === currentExperienceIndex;
                  
                    return (
                      <div 
                        key={index}
                        className={`absolute top-0 w-1 h-4 transition-all transform -translate-y-1 ${
                          isCurrentExperience ? 'bg-green-400' : 'bg-white bg-opacity-60'
                        }`}
                        style={{ 
                          left: `${markerPosition}%`,
                          opacity: isCurrentExperience ? 1 : 0.7,
                          height: isCurrentExperience ? '10px' : '6px'
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
          
          {/* Experience Section */}
          <div className="mt-8 mb-48 max-w-6xl mx-auto text-white h-[calc(100vh-350px)]">
            <div 
              className="transform transition-all duration-500 h-full overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent"
              style={{
                scrollbarWidth: 'thin',
                msOverflowStyle: 'none'
              }}
            >             
            {showAll ? (
                // Show all experiences
                <div className="space-y-16 max-w-6xl mx-auto">
                  {projectsSections.map((experience, index) => (
                    <div key={index} className="animate-fadeIn flex flex-col md:flex-row gap-8">
                      {/* Images Column */}
                      <div className="flex-shrink-0 space-y-4">
                        {experience.images.map((image, idx) => (
                          <div key={idx} className="w-40 h-40 md:w-52 md:h-52 rounded-lg overflow-hidden shadow-2xl">
                            <img
                              src={image}
                              alt={`${experience.project} image ${idx + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>

                      {/* Experience Details Column */}
                      <div className="flex-grow">
                        <h2 className="text-xl md:text-2xl font-bold text-green-400 mb-2">{experience.project}</h2>
                        <h3 className="text-lg md:text-xl font-bold mb-1">{experience.location}</h3>
                        <p className="text-md md:text-lg text-gray-300 mb-4">{experience.period}</p>
                        
                        {experience.details.map((detail, idx) => (
                          <p 
                            key={idx} 
                            className="mb-3 text-md md:text-lg"
                          >
                            {detail}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                // Show current experience only (existing code)
                <div key={currentExperienceIndex} className="animate-fadeIn flex flex-col md:flex-row gap-8">
                    {/* Experience Section */}
                    <div className="mt-8 max-w-5xl mx-auto text-white">
                      <div className="transform transition-all duration-500">
                        <div key={currentExperienceIndex} className="animate-fadeIn flex flex-col md:flex-row gap-8">
                          {/* Images Column */}
                          <div className="flex-shrink-0 space-y-4">
                            {currentExperience.images.map((image, idx) => (
                              <div key={idx} className="w-40 h-40 md:w-52 md:h-52 rounded-lg overflow-hidden shadow-2xl">
                                <img
                                  src={image}
                                  alt={`${currentExperience.project} image ${idx + 1}`}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            ))}
                          </div>

                          {/* Experience Details Column */}
                          <div className="flex-grow">
                            <h2 className="text-xl md:text-2xl font-bold text-green-400 mb-2">{currentExperience.project}</h2>
                            <h3 className="text-lg md:text-xl font-bold mb-1">{currentExperience.location}</h3>
                            <p className="text-md md:text-lg text-gray-300 mb-4">{currentExperience.period}</p>
                            
                            {currentExperience.details.map((detail, idx) => (
                              <p 
                                key={idx} 
                                className="mb-3 text-md md:text-lg"
                                style={{
                                  animation: `fadeIn 0.5s ease ${idx * 0.2}s forwards`,
                                  opacity: 0
                                }}
                              >
                                {detail}
                              </p>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>      
                    </div>
              )}
            </div>

            {/* Toggle Button */}
            <div className="fixed bottom-6 right-6 z-50">
            <button
                onClick={() => setShowAll(!showAll)}
                className="flex items-center gap-2 px-4 py-2 bg-black bg-opacity-40 hover:bg-opacity-60 
                  text-white rounded-full transition-all duration-300"
              >
                <span>{showAll ? 'Show Current' : 'Show All'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Add CSS animation */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease;
        }
      `}</style>

      <style jsx global>{`
        /* Hide default scrollbar for Chrome, Safari and Opera */
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }

        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }

        .scrollbar-thin::-webkit-scrollbar-thumb {
          background-color: rgba(156, 163, 175, 0.5);
          border-radius: 3px;
        }

        /* For Firefox */
        .scrollbar-thin {
          scrollbar-width: thin;
          scrollbar-color: rgba(156, 163, 175, 0.5) transparent;
        }
      `}</style>
    </div>
  );
};

export default Experience