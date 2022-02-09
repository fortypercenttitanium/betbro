import React from 'react';
import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import NavBar from './components/Navbar';
import BreakdownsLayout from './components/Breakdowns/BreakdownsLayout';
import NotFound from './components/NotFound';
import Contact from './components/Contact';

const StyledApp = styled.div`
  height: 100%;
  overflow: auto;

  .main-container {
    display: flex;
    width: 100%;
  }
`;

function App() {
  return (
    <StyledApp>
      <NavBar />
      <div className="main-container">
        <Routes>
          <Route exact path="/" element={<BreakdownsLayout />} />
          {/* Old pages removed from site */}
          {/* <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} /> */}
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </StyledApp>
  );
}

export default App;
