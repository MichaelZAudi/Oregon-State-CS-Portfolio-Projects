import React from 'react';
import { Link } from 'react-router-dom';

// Change the function names and links
// to fit your portfolio topic.

function navMenu() {
  return (
    <nav>
        {/* Add links to Home, Topics, Gallery, Contact, and Staff Pages  */}
        <Link to="/">Home</Link>
        <Link to="/TopicsPage">Topics</Link>
        <Link to="/MusicalPage">Musical List</Link>
        
    </nav>
  );
}

export default navMenu;
