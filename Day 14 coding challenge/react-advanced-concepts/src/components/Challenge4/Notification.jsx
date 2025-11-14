import React from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Notification = ({ message, type = 'info', isVisible, onClose }) => {
  if (!isVisible) return null;

  const notificationContent = (
    <AnimatePresence>
      <motion.div
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 300, opacity: 0 }}
        transition={{ type: 'spring', damping: 20 }}
        className={`alert alert-${type} alert-dismissible`}
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 1060,
          minWidth: '300px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}
      >
        {message}
        <button
          type="button"
          className="btn-close"
          onClick={onClose}
          aria-label="Close"
        ></button>
      </motion.div>
    </AnimatePresence>
  );

  return ReactDOM.createPortal(
    notificationContent,
    document.getElementById('notification-root')
  );
};

export default Notification;