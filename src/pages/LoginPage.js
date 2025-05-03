import React, { useState } from 'react';
import { login, signup } from '../api';

function LoginPage({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    login(email, password)   //这里调用login函数，会把网页用户输入的email和password都传到后端去，后端会在数据库找，如果成功，会返回包含用户邮箱和密码，和一个token给前端。
      .then(res => { //拿到后端饭回来的数据（res）之后，把里面的token拿出来，放到localstorage中，取名问token
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('isAdmin', res.data.user.admin ? 'true' : 'false'); 
        alert('login successful');
        onLoginSuccess(); //告诉app.js已经登陆了，app js是控制用户看那一页的，appjs里的isLoggedIn变成true
      })
      .catch(err => {
        alert('login fail, please check email and password');
      });
  };

  const handleSignup = () => {
    signup(email, password)
      .then(res => {
        localStorage.setItem('token', res.data.token);
        alert('Register successful');
        onLoginSuccess();
      })
      .catch(err => {
        if (err.response?.data?.error?.includes('Email')) {
          alert('Email address exist');
        } else {
          alert('Regitration fail, please check emaill or password');
        }
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
  <div className="bg-white p-6 rounded shadow w-80">
    <h1 className="text-xl font-bold mb-4">Login/Signup</h1>
    <input
      type="email"
      placeholder="Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="w-full mb-2 p-2 border rounded"
    />
    <input
      type="password"
      placeholder="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className="w-full mb-2 p-2 border rounded"
    />
    <button className="bg-blue-500 text-white px-4 py-2 w-full rounded mb-2" onClick={handleLogin}>
      Login
    </button>
    <button className="bg-gray-500 text-white px-4 py-2 w-full rounded" onClick={handleSignup}>
      Register
    </button>
  </div>
</div>
  );
}

export default LoginPage;