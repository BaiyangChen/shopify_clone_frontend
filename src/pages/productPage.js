import React, { useEffect, useState } from 'react';
import { fetchProducts, addToCart } from '../api';
import PropTypes from 'prop-types';

function ProductsPage({ isLoggedIn, onNeedLogin }) { //拿到app js的两个参数
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts()
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleAddToCart = (productId) => {
    if (!isLoggedIn) {
        onNeedLogin(); // 如果没登录，弹出登录框
        return;
      }
    addToCart(productId, 1)
      .then(() => alert('Added to cart'))
      .catch(err => alert('please login'));
  };

  return (
    <div className="p-4">
  <h1 className="text-2xl font-bold mb-4">Product</h1>
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {products.map(product => (
      <div key={product.id} className="border p-4 rounded shadow bg-white">
        <img src={product.image_url} alt={product.name} className="w-full h-40 object-cover mb-2" />
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-gray-700">Price: ${product.price}</p>
        <button
          className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded"
          onClick={() => handleAddToCart(product.id)}
        >
          Add to Cart
        </button>
      </div>
    ))}
  </div>
</div>
  );
  
}

ProductsPage.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    onNeedLogin: PropTypes.func.isRequired,
  };

export default ProductsPage;