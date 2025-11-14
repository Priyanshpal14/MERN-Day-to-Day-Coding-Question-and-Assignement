// src/components/Footer.js
import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const Footer = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <footer className={`footer ${theme}`}>
      <p>Current Theme: <strong>{theme}</strong></p>
      <p>© 2025 Theme Context Challenge</p>
    </footer>
  );
};

export default Footer;