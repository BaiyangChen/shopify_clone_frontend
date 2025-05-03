import axios from 'axios';

// 跟后端打交道，发的每个请求都会到后端http://localhost:3000去找
const API = axios.create({
    baseURL: 'https://shopify-clone-api.onrender.com',
  });
  
  // API就是刚刚的axios
  //interceptors就是拦截器，从axios拦截请求，interceptors.request.use在请求发出之前拦截下来的请求使用use函数
  //config就是这个请求
  API.interceptors.request.use((config) => {
    //从浏览器本地存储（localStorage）里拿出 token
    const token = localStorage.getItem('token');
    //如果有 token，就把它加到 HTTP 请求头里，告诉后端：“我已经登录了！
    if (token) {
        //把这个请求config的请求头的authorization赋值`Bearer ${token}`
        //`Bearer ${token}`为什么是反引号，意思就是把Bearer后面加上token的值（字符串里面插入变量）
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;//返回给axios
  });
  
  // 商品相关 定义一个fetchProducts函数，把网址后缀变成/products，然后发送到后端，http://localhost:3001/products，后端routes.rb会找到resources :products 设置好的路径，去数据库查商品，把商品列表返回给前端
  export const fetchProducts = () => API.get('/products');
  export const addProduct = (productData) => API.post('/products', { product: productData });
  export const deleteProduct = (id) => API.delete(`/products/${id}`);

  // 管理用户
  export const fetchUsers = () => API.get('/users');
  export const deleteUser = (id) => API.delete(`/users/${id}`);
  
  // 在网页上输入email, password，然后调用这个函数，就会把email, password发送给后端
  export const login = (email, password) => API.post('/login', { email, password });
  export const signup = (email, password) => API.post('/signup', { user: { email, password } });
  
  // 购物车相关
  export const fetchCartItems = () => API.get('/cart_items');
  export const addToCart = (productId, quantity) => API.post('/cart_items', { cart_item: { product_id: productId, quantity } });
  export const deleteCartItem = (id) => API.delete(`/cart_items/${id}`);

  //用户按按钮，就会调用函数，把网址后缀变成/cart_items/id，触发后端routes然后去controller找相对应函数，{ cart_item: { quantity }这个就是请求体body
  export const updateCartItem = (id, quantity) => API.patch(`/cart_items/${id}`, { cart_item: { quantity } });
  
  // 订单相关
  export const createOrder = () => API.post('/orders');
  export const fetchOrders = () => API.get('/orders');

  //分类
  export const fetchCategories = () => API.get('/categories');
  export const addCategory = (categoryName) => API.post('/categories', { category: { name: categoryName } });
  export const deleteCategory = (id) => API.delete(`/categories/${id}`);