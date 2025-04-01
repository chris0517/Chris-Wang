import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const sections = [
  { id: 'about', title: 'About Me'},
  { id: 'experience', title: 'Experience'},
  { id: 'projects', title: 'Projects'},
  { id: 'contact', title: 'Contact'}
];

const Nav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getCurrentSection = () => {
    const path = location.pathname.slice(1) || 'about';
    return sections.findIndex(section => section.id === path);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-center h-20">
          <div className="flex space-x-8">
            {sections.map((section, index) => (
              <button
                key={section.id}
                onClick={() => {
                  const path = section.id === 'about' ? '/' : `/${section.id}`;
                  navigate(path);
                }}
                className={`px-6 py-2 rounded-lg text-sm font-medium transition-all duration-300
                  ${getCurrentSection() === index 
                    ? 'text-white bg-black bg-opacity-30' 
                    : 'text-gray-300 hover:text-white hover:bg-black hover:bg-opacity-20'
                  }`}
              >
                {section.title}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav; 