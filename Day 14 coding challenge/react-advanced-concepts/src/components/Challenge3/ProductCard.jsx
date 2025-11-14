import React from 'react';

const ProductCard = ({ product, shouldBreak }) => {
  if (shouldBreak) {
    throw new Error('Product component intentionally crashed!');
  }

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">{product.description}</p>
        <p className="text-success fw-bold">${product.price}</p>
        <button className="btn btn-primary">Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductCard;