// src/components/WorkoutTracker.js
import React, { useState, useEffect, useCallback } from 'react';
import useTimer from '../hooks/useTimer';
import './WorkoutTracker.css';

const WorkoutTracker = () => {
  const [sets, setSets] = useState(0);
  const [restTime, setRestTime] = useState(60);
  const [isResting, setIsResting] = useState(false);
  
  const workoutTimer = useTimer(0, false);
  const restTimer = useTimer(0, false);

  // Use useCallback to memoize completeRest function
  const completeRest = useCallback(() => {
    setIsResting(false);
    restTimer.reset();
    alert('Rest complete! Ready for next set.');
  }, [restTimer]);

  // Auto-reset rest timer when rest time is complete
  useEffect(() => {
    if (isResting && restTimer.seconds >= restTime) {
      completeRest();
    }
  }, [restTimer.seconds, restTime, isResting, completeRest]);

  const completedSet = () => {
    setSets(prevSets => prevSets + 1);
    workoutTimer.pause();
    startRest();
  };

  const startRest = () => {
    setIsResting(true);
    restTimer.reset();
    restTimer.start();
  };

  const resetWorkout = () => {
    setSets(0);
    setIsResting(false);
    workoutTimer.reset();
    restTimer.reset();
  };

  return (
    <div className="workout-tracker">
      <h1>💪 Workout Tracker</h1>
      
      <div className="stats">
        <div className="stat-card">
          <h3>Sets Completed</h3>
          <p className="stat-number">{sets}</p>
        </div>
        
        <div className="stat-card">
          <h3>Workout Time</h3>
          <p className="stat-number">{workoutTimer.formatTime()}</p>
        </div>
      </div>

      {isResting ? (
        <div className="rest-section">
          <h2>Rest Time</h2>
          <p className="timer">{restTimer.formatTime()} / {Math.floor(restTime / 60)}:{(restTime % 60).toString().padStart(2, '0')}</p>
          <button onClick={completeRest} className="btn btn-success">
            Skip Rest
          </button>
        </div>
      ) : (
        <div className="workout-section">
          <h2>Working Out</h2>
          {!workoutTimer.isActive && (
            <button onClick={workoutTimer.start} className="btn btn-primary">
              Start Workout
            </button>
          )}
          {workoutTimer.isActive && (
            <>
              <button onClick={completedSet} className="btn btn-success">
                Complete Set
              </button>
              <button onClick={workoutTimer.pause} className="btn btn-warning">
                Pause
              </button>
            </>
          )}
        </div>
      )}

      <div className="controls">
        <label>
          Rest Time (seconds):
          <input
            type="number"
            value={restTime}
            onChange={(e) => setRestTime(Number(e.target.value))}
            min="10"
            max="300"
          />
        </label>
        <button onClick={resetWorkout} className="btn btn-danger">
          Reset All
        </button>
      </div>
    </div>
  );
};

export default WorkoutTracker;