// src/components/Content.js
import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const Content = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`content ${theme}`}>
      <h2>Welcome to the {theme} theme!</h2>
      <p>This content automatically adapts to the selected theme.</p>
      <p>The theme preference is saved in localStorage and persists across sessions.</p>
    </div>
  );
};

export default Content;