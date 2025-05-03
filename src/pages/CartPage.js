import React, { useEffect, useState } from 'react';
import { fetchCartItems, deleteCartItem, createOrder, updateCartItem } from '../api';
import PropTypes from 'prop-types';

function CartPage({ isLoggedIn, onNeedLogin }) {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (!isLoggedIn) {
      onNeedLogin(); // 如果没登录，就弹登录框
      return;
    }
    fetchCartItems()
      .then(res => setCartItems(res.data))
      .catch(err => console.error(err));
  }, [isLoggedIn, onNeedLogin]);

  const handleDeleteItem = (itemId) => {
    deleteCartItem(itemId)
      .then(() => {
        // 删除成功后，刷新购物车
        setCartItems(prev => prev.filter(item => item.id !== itemId));
      })
      .catch(err => console.error(err));
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    const quantity = parseInt(newQuantity, 10); //因为html的input永远都是string，要改成int
    if (quantity < 1) return; // 数量不能小于1
  
    updateCartItem(itemId, quantity)
      .then(res => {
        // 更新本地 cartItems
        setCartItems(prev => prev.map(item => 
          item.id === itemId ? { ...item, quantity: quantity } : item
        ));
      })
      .catch(err => alert('Quantity change fail, please try again'));
  };

  const handleCheckout = () => {
    createOrder()
      .then(() => {
        alert('Pay Success! Order Ready');
        setCartItems([]); // 支付后清空购物车页面
      })
      .catch(err => alert('Payment fail, please try again'));
  };

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div className="p-4">
  <h1 className="text-2xl font-bold mb-4">购物车</h1>
  {cartItems.length === 0 ? (
    <p>Shopping Cart Empty</p>
  ) : (
    <div className="space-y-4">
      {cartItems.map(item => (
        <div key={item.id} className="border p-4 rounded shadow flex items-center gap-4 bg-white">
          <img src={item.product.image_url} alt={item.product.name} className="w-20 h-20 object-cover" />
          <div className="flex-1">
            <h3 className="text-lg font-semibold">{item.product.name}</h3>
            <p>Price: ${item.product.price}</p>
            <input
              type="number"
              value={item.quantity}
              min="1"
              className="border w-16 p-1 my-1"
              onChange={(e) => handleQuantityChange(item.id, e.target.value)}
            />
            <p>SubTotal: ${(item.product.price * item.quantity).toFixed(2)}</p>
          </div>
          <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={() => handleDeleteItem(item.id)}>
            Remove
          </button>
        </div>
      ))}
      <h2 className="text-xl font-bold text-right">Total: ${calculateTotal()}</h2>
      <button className="bg-green-500 text-white px-6 py-2 rounded" onClick={handleCheckout}>Submit Order</button>
    </div>
  )}
</div>
  );
}

CartPage.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  onNeedLogin: PropTypes.func.isRequired,
};

export default CartPage;