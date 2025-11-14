import React, { useState } from 'react';
import ErrorBoundary from './ErrorBoundary';
import ProductCard from './ProductCard';

const ErrorBoundaryDemo = () => {
  const [breakProduct, setBreakProduct] = useState(null);

  const products = [
    { id: 1, name: 'Laptop', description: 'High-performance laptop', price: 999 },
    { id: 2, name: 'Phone', description: 'Latest smartphone', price: 699 },
    { id: 3, name: 'Tablet', description: 'Portable tablet', price: 449 }
  ];

  return (
    <div className="container my-4">
      <h2 className="mb-4">Challenge 3: Error Boundary</h2>
      
      <div className="alert alert-warning mb-3">
        <strong>Test Error Handling:</strong> Click the "Break Product" buttons to simulate errors.
        The Error Boundary will catch them gracefully!
      </div>

      <div className="row g-3">
        {products.map(product => (
          <div key={product.id} className="col-md-4">
            <ErrorBoundary>
              <ProductCard 
                product={product} 
                shouldBreak={breakProduct === product.id}
              />
              <button 
                className="btn btn-danger btn-sm mt-2 w-100"
                onClick={() => setBreakProduct(product.id)}
              >
                Break This Product
              </button>
            </ErrorBoundary>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ErrorBoundaryDemo;