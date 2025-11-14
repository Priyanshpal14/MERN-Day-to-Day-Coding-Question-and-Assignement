import React, { useState } from 'react';
import StatsCard from './StatsCard';

const PureComponentDemo = () => {
  const [stats, setStats] = useState({
    users: { title: 'Total Users', value: 1250, lastUpdated: new Date().toLocaleString() },
    revenue: { title: 'Revenue', value: '$45,000', lastUpdated: new Date().toLocaleString() },
    orders: { title: 'Orders', value: 890, lastUpdated: new Date().toLocaleString() }
  });

  const [counter, setCounter] = useState(0);

  const updateUsers = () => {
    setStats(prev => ({
      ...prev,
      users: {
        ...prev.users,
        value: prev.users.value + 10,
        lastUpdated: new Date().toLocaleString()
      }
    }));
  };

  const updateRevenue = () => {
    setStats(prev => ({
      ...prev,
      revenue: {
        ...prev.revenue,
        value: `$${parseInt(prev.revenue.value.replace(/[$,]/g, '')) + 1000}`,
        lastUpdated: new Date().toLocaleString()
      }
    }));
  };

  const updateOrders = () => {
    setStats(prev => ({
      ...prev,
      orders: {
        ...prev.orders,
        value: prev.orders.value + 5,
        lastUpdated: new Date().toLocaleString()
      }
    }));
  };

  return (
    <div className="container my-4">
      <h2 className="mb-4">Challenge 2: Pure Components</h2>
      
      <div className="alert alert-info">
        <strong>Note:</strong> Check the console to see which components re-render. 
        Only the updated card should re-render!
      </div>

      <div className="row g-3 mb-3">
        <div className="col-md-4">
          <StatsCard {...stats.users} />
        </div>
        <div className="col-md-4">
          <StatsCard {...stats.revenue} />
        </div>
        <div className="col-md-4">
          <StatsCard {...stats.orders} />
        </div>
      </div>

      <div className="d-flex gap-2 flex-wrap">
        <button className="btn btn-primary" onClick={updateUsers}>
          Update Users
        </button>
        <button className="btn btn-success" onClick={updateRevenue}>
          Update Revenue
        </button>
        <button className="btn btn-warning" onClick={updateOrders}>
          Update Orders
        </button>
        <button className="btn btn-secondary" onClick={() => setCounter(counter + 1)}>
          Force Parent Re-render (Counter: {counter})
        </button>
      </div>
    </div>
  );
};

export default PureComponentDemo;