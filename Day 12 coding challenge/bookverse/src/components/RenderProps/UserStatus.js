import React, { useState } from 'react';

const UserStatus = ({ children }) => {
  const [user] = useState({ 
    name: "Book Lover", 
    memberSince: "2024",
    booksRead: 42 
  });
  
  return children({
    greeting: `Welcome back, ${user.name}!`,
    memberSince: user.memberSince,
    userName: user.name,
    booksRead: user.booksRead,
    renderGreeting: () => (
      <div className="text-right">
        <p className="text-sm font-semibold text-gray-700">
          Welcome back, {user.name}!
        </p>
        <p className="text-xs text-gray-500">
          Member since {user.memberSince} • {user.booksRead} books read
        </p>
      </div>
    )
  });
};

export default UserStatus;