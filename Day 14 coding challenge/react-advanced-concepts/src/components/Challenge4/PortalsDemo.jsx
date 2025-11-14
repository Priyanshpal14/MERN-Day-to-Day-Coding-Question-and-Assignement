import React, { useState } from 'react';
import Modal from './Modal';
import Notification from './Notification';

const PortalsDemo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notification, setNotification] = useState({ visible: false, message: '', type: 'info' });

  const showNotification = (message, type = 'info') => {
    setNotification({ visible: true, message, type });
    setTimeout(() => {
      setNotification({ visible: false, message: '', type: 'info' });
    }, 3000);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsModalOpen(false);
    showNotification('Form submitted successfully!', 'success');
  };

  return (
    <div className="container my-4">
      <h2 className="mb-4">Challenge 4: Portals</h2>
      
      <div className="alert alert-info mb-4">
        <strong>About Portals:</strong> Modals and notifications render outside the main DOM hierarchy,
        appearing above all other elements regardless of parent component styling.
      </div>

      <div className="d-flex gap-2 flex-wrap">
        <button 
          className="btn btn-primary"
          onClick={() => setIsModalOpen(true)}
        >
          Open Modal
        </button>
        
        <button 
          className="btn btn-success"
          onClick={() => showNotification('This is a success notification!', 'success')}
        >
          Show Success Notification
        </button>
        
        <button 
          className="btn btn-warning"
          onClick={() => showNotification('This is a warning notification!', 'warning')}
        >
          Show Warning Notification
        </button>
        
        <button 
          className="btn btn-danger"
          onClick={() => showNotification('This is an error notification!', 'danger')}
        >
          Show Error Notification
        </button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Contact Form"
      >
        <form onSubmit={handleFormSubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input type="text" className="form-control" required />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" required />
          </div>
          <div className="mb-3">
            <label className="form-label">Message</label>
            <textarea className="form-control" rows="3" required></textarea>
          </div>
          <div className="d-flex gap-2">
            <button type="submit" className="btn btn-primary">Submit</button>
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>

      <Notification
        message={notification.message}
        type={notification.type}
        isVisible={notification.visible}
        onClose={() => setNotification({ ...notification, visible: false })}
      />
    </div>
  );
};

export default PortalsDemo;