import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './components/About';
import Contact from './components/Contact';
import Projects from './components/Projects';
import Experience from './components/Experience';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Chris-Wang" element={<About />} />
        <Route path="Chris-Wang/contact" element={<Contact />} />
        <Route path="Chris-Wang/projects" element={<Projects />} />
        <Route path="Chris-Wang/experience" element={<Experience />} />
      </Routes>
    </Router>
  );
}

export default App;