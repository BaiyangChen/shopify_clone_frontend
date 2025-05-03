import ProductsPage from './pages/productPage';
import LoginPage from './pages/LoginPage';
import CartPage from './pages/CartPage'; 
import React, { useState } from 'react';
import OrdersPage from './pages/OrdersPage'
import AdminPage from './pages/AdminPage';

function App() {
  //这里！！是强制改成bool，因为getItem只会返回null或者token，加了！！就会变成true或者false，把这个结果传给isLoggedIn
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token')); 
  const [page, setPage] = useState('products');

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setPage('products'); // 登录成功后跳回产品页
  };
  const handleNeedLogin = () => {
    setPage('login'); // 需要登录时，弹出登录框
  };

  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  return (
    <div className="p-4">
  {/* 页面导航按钮区，点击按钮切换页面 */}
  <div className="flex flex-wrap justify-center gap-4 mb-6">
    <button
      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
      onClick={() => setPage('products')}
    >
      Product list
    </button>

    <button
      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
      onClick={() => setPage('cart')}
    >
      Shopping Cart
    </button>

    <button
      className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
      onClick={() => setPage('orders')}
    >
      Order History
    </button>

    {!isLoggedIn && (
      <button
        className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
        onClick={() => setPage('login')}
      >
        Sigup / Login
      </button>
    )}
    {/* 如果用户已登录，就显示管理员按钮，非管理员会提示无权限 */}
    {isLoggedIn && (
      <button
        className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded"
        onClick={() => {
          if (!isAdmin) {
            alert('你不是管理员，不能进入后台');
            return;
          }
          setPage('admin');
        }}
      >
        Admin
      </button>
    )}

    {/* 登出按钮,在isLoggedIn是true的时候，显示这个按钮 */}
    {isLoggedIn && (
      <button
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        onClick={() => {
          localStorage.removeItem('token'); // 删除 token
          localStorage.removeItem('isAdmin');
          setIsLoggedIn(false); // 把登录状态设为 false
          setPage('products'); // 回到商品列表页
          alert('Log out success');
        }}
      >
        Logout
      </button>
    )}
  </div>

  {/*按按钮之后page就变成products，然后就显示products， 给productpage传两个变量 */}
  {page === 'products' && <ProductsPage isLoggedIn={isLoggedIn} onNeedLogin={handleNeedLogin} />}

  {/*按按钮之后page就变成cart，然后就显示购物车内容， 给cartpage传两个变量 */}
  {page === 'cart' && <CartPage isLoggedIn={isLoggedIn} onNeedLogin={handleNeedLogin} />}

  {/*按按钮之后page就变成orders，然后就显示订单内容， 给OrderPages传两个变量 */}
  {page === 'orders' && <OrdersPage isLoggedIn={isLoggedIn} onNeedLogin={handleNeedLogin} />}

  {/* 转admin页面 */}
  {page === 'admin' && <AdminPage isLoggedIn={isLoggedIn} onNeedLogin={handleNeedLogin} />}

  {/* 如果 showLogin 是 true，就把 <LoginPage /> 显示出来；否则什么都不显示 */}
  {page === 'login' && <LoginPage onLoginSuccess={handleLoginSuccess} />}
</div>
  );
}

export default App;