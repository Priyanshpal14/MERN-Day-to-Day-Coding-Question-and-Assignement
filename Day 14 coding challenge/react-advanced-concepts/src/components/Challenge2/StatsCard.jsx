import React from 'react';

const StatsCard = React.memo(({ title, value, lastUpdated }) => {
  console.log(`StatsCard "${title}" rendered at ${new Date().toLocaleTimeString()}`);
  
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <h2 className="card-text text-primary">{value}</h2>
        <small className="text-muted">Last updated: {lastUpdated}</small>
      </div>
    </div>
  );
});

export default StatsCard;