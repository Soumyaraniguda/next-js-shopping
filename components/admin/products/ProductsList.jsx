import React from "react";

function ProductsList({ products }) {
  return (
    <div>
      {products.map((product) => (
        <div key={product._id}>{product.name}</div>
      ))}
    </div>
  );
}

export default ProductsList;
