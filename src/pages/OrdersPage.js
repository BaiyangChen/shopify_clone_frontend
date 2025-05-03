import React, { useEffect, useState } from 'react';
import { fetchOrders } from '../api';
import PropTypes from 'prop-types';

function OrdersPage({ isLoggedIn, onNeedLogin }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!isLoggedIn) {
      onNeedLogin();
      return;
    }
    fetchOrders()
      .then(res => setOrders(res.data))
      .catch(err => console.error(err));
  }, [isLoggedIn, onNeedLogin]);//只有 isLoggedIn 或 onNeedLogin 有变化，才重新执行里面的代码

  return (
    <div className="p-4">
  <h1 className="text-2xl font-bold mb-4">Order History</h1>
  {orders.length === 0 ? (
    <p>Order Empty</p>
  ) : (
    orders.map(order => (
      <div key={order.id} className="border rounded p-4 shadow bg-white mb-4">
        <h3 className="text-lg font-bold">Order #{order.id}</h3>
        <p>Total: ${order.total_price}</p>
        <p>Status: {order.status}</p>
        <p>Order Date: {new Date(order.created_at).toLocaleString()}</p>
        <div className="ml-4 mt-2 text-sm text-gray-700">
          {order.order_items?.map(item => (
            <p key={item.id}>· {item.product.name} × {item.quantity}</p>
          ))}
        </div>
      </div>
    ))
  )}
</div>
  );
}

OrdersPage.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  onNeedLogin: PropTypes.func.isRequired,
};

export default OrdersPage;