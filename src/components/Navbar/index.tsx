import { useState } from 'react';
import { Link } from 'react-router-dom';
import { IonIcon } from '@ionic/react';
import { moon, sunny } from 'ionicons/icons';

import './Navbar.css';

const Navbar = () => {
  const [lightMode, setLightMode] = useState(
    document.documentElement.classList.contains('light-mode'),
  );

  const theme = localStorage.getItem('lightMode') === 'true';
  const mediaQuery = window.matchMedia('(prefers-color-scheme: light)').matches;

  if (theme || mediaQuery) document.documentElement.classList.add('light-mode');

  const handleMode = () => {
    document.documentElement.classList.toggle('light-mode');
    setLightMode(!lightMode);
    localStorage.setItem('lightMode', String(!lightMode));
  };

  return (
    <nav className="navbar">
      <Link to="/">
        <h1>Where in the world?</h1>
      </Link>
      <button
        aria-label={`Enable ${lightMode ? 'light' : 'dark'} mode`}
        onClick={handleMode}
      >
        <span>
          <IonIcon icon={lightMode ? moon : sunny} />
        </span>
        {lightMode ? 'Dark' : 'Light'} Mode
      </button>
    </nav>
  );
};

export default Navbar;
