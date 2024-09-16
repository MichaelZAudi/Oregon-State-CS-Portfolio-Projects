// Import dependencies
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import Components, styles, media
import Navigation from './components/NavMenu';


import './App.css';

// Import pages you have completed:
// Home, Topics, Gallery, Contact, and Staff Pages 

import HomePage from './pages/HomePage';
import TopicsPage from './pages/TopicsPage';
import MusicalPage from './pages/MusicalPage';

// For Create and Edit, use the form OR table design; not both.
// If your schema requires LONG data input, then use the FORM design:
// import AddMusicalPageForm from './pages/AddMusicalPageForm';
// import EditMusicalPageForm from './pages/EditMusicalPageForm';

// If your schema requires SHORT data input, then use the TABLE design.
import EditMusicalPageTable from './pages/EditMusicalPageTable';
import AddMusicalPageTable from './pages/AddMusicalPageTable';

// Define the function that renders the content in Routes, using State.
function App() {

  const [musical, setMusicalToEdit] = useState([])

  return (
    <>
      <BrowserRouter>

          <header>
            <h1>
              Michael Audi
              <img src="android-chrome-192x192.png" alt="Michael Audi" />
            </h1>
            <p>Welcome to my full stack MERN portfolio website.</p>
          </header>

          <Navigation />

          <main>
            <section>
                <Routes> 
                    {/* Add Routes for Home, Topics, Gallery, Contact, and Staff Pages.  */}
                    <Route path="/TopicsPage" element={<TopicsPage/>} />
                    <Route path="/" element={<HomePage/>} />
                    <Route path="/MusicalPage" element={<MusicalPage setMusicalToEdit={setMusicalToEdit}/>} />
                 
                    {/* Use these if your schema requires LONG data input: */}
                    <Route path="/create" element={<AddMusicalPageTable />} /> 
                    <Route path="/update" element={<EditMusicalPageTable musicalToEdit={musical} />} />

                </Routes>
              </section>
          </main>

          <footer>
            <p>
              &copy; 2024 Michael Audi
            </p>
          </footer>

      </BrowserRouter>
    </>
  );
}

export default App;