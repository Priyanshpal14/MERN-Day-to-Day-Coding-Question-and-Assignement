import React, { Suspense, useState } from 'react';
import LoadingSpinner from './LoadingSpinner';

// Lazy load components
const CourseDetails = React.lazy(() => import('./CourseDetails'));
const InstructorProfile = React.lazy(() => import('./InstructorProfile'));

const LazyLoadingDemo = () => {
  const [showCourse, setShowCourse] = useState(false);
  const [showInstructor, setShowInstructor] = useState(false);

  return (
    <div className="container my-4">
      <h2 className="mb-4">Challenge 1: Lazy Loading & Code Splitting</h2>
      
      <div className="d-flex gap-2 mb-3">
        <button 
          className="btn btn-primary"
          onClick={() => setShowCourse(!showCourse)}
        >
          {showCourse ? 'Hide' : 'View'} Course Details
        </button>
        
        <button 
          className="btn btn-success"
          onClick={() => setShowInstructor(!showInstructor)}
        >
          {showInstructor ? 'Hide' : 'View'} Instructor Profile
        </button>
      </div>

      {showCourse && (
        <Suspense fallback={<LoadingSpinner />}>
          <CourseDetails />
        </Suspense>
      )}

      {showInstructor && (
        <Suspense fallback={<LoadingSpinner />}>
          <InstructorProfile />
        </Suspense>
      )}
    </div>
  );
};

export default LazyLoadingDemo;