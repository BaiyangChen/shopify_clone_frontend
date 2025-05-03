import React, { useEffect, useState } from 'react';
import {
  fetchProducts,
  fetchUsers,
  addProduct,
  deleteProduct,
  deleteUser,
  fetchCategories,
  addCategory,
  deleteCategory
} from '../api';
import PropTypes from 'prop-types';

function AdminPage({ isLoggedIn, onNeedLogin }) {
  // 所有状态变量都保留，必须用
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    image_url: '',
    category_id: ''
  });
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [filterCategoryId, setFilterCategoryId] = useState('');

  // 页面一加载就拉数据（用户、商品、分类）
  useEffect(() => {
    if (!isLoggedIn) {
      onNeedLogin();
      return;
    }
    fetchProducts().then(res => setProducts(res.data));
    fetchUsers().then(res => setUsers(res.data));
    fetchCategories().then(res => setCategories(res.data));
  }, [isLoggedIn, onNeedLogin]);

  // 添加商品
  const handleAddProduct = () => {
    addProduct(newProduct)
      .then(() => {
        alert('Product add Success');
        setNewProduct({ name: '', description: '', price: '', image_url: '', category_id: '' }); // 清空输入框
        return fetchProducts(); // 重新拉数据
      })
      .then(res => setProducts(res.data))
      .catch(err => alert('Product add fail'));
  };

  // 删除商品 → 后端删完，再拉一次商品列表
  const handleDeleteProduct = (id) => {
    deleteProduct(id)
      .then(() => fetchProducts())
      .then(res => setProducts(res.data))
      .catch(err => {
        if (err.response?.data?.error) {
          alert(err.response.data.error);  // 这里才会显示你后端的英文错误信息
        } else {
          alert('Delete Fail');
        }
      });
  };

  // 删除用户 → 后端删完，再拉一次用户列表
  const handleDeleteUser = (id) => {
    deleteUser(id)
      .then(() => fetchUsers())
      .then(res => setUsers(res.data))
      .catch(err => {
        if (err.response?.data?.error) {
          alert(err.response.data.error); // 比如“该用户有订单，不能删除”
        } else {
          alert('fail deleting');
        }
      });
  };
  //删除分类
  const handleDeleteCategory = (id) => {
    deleteCategory(id)
      .then(() => fetchCategories())
      .then(res => setCategories(res.data))
      .catch(err => {
        if (err.response?.data?.error) {
          alert(err.response.data.error);  // 比如“该分类下有商品，不能删除”
        } else {
          alert('fail deleting');
        }
      });
  };

  // 添加分类 → 后端添加成功后刷新分类列表
  const handleAddCategory = () => {
    if (newCategoryName.trim() === '') {
      alert('category empty');
      return;
    }
    addCategory(newCategoryName)
      .then(() => {
        alert('category add success');
        setNewCategoryName('');
        return fetchCategories(); // 重新拉分类
      })
      .then(res => setCategories(res.data))
      .catch(err => alert('fail deleting'));
  };

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold text-center">Admin Page</h1>

      {/* 添加分类 */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Add Category</h2>
        <input
          className="border p-2 rounded w-full max-w-md"
          placeholder="Category name"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
        />
        <button
          className="ml-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          onClick={handleAddCategory}
        >
          Add Category
        </button>
      </div>
      {/*删除分类*/}
      <div className="space-y-2">
      <h2 className="text-lg font-semibold mt-6">Category List</h2>
      <div className="space-y-2">
          {categories.map(cat => (
            <div key={cat.id} className="border p-2 rounded flex justify-between items-center">
              <span>{cat.name}</span>
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                onClick={() => handleDeleteCategory(cat.id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 添加商品 */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Add New Product</h2>
        <input className="border p-2 rounded w-full" placeholder="Name" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} />
        <input className="border p-2 rounded w-full" placeholder="Description" value={newProduct.description} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} />
        <input className="border p-2 rounded w-full" placeholder="Price" type="number" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} />
        <input className="border p-2 rounded w-full" placeholder="Image url" value={newProduct.image_url} onChange={(e) => setNewProduct({ ...newProduct, image_url: e.target.value })} />
        <select className="border p-2 rounded w-full" value={newProduct.category_id} onChange={(e) => setNewProduct({ ...newProduct, category_id: e.target.value })}>
          <option value="">Choose Category</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </select>
        <button
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          onClick={handleAddProduct}
        >
          Add Product
        </button>
      </div>

      {/* 商品列表 */}
      <div className="mb-4">
        <label className="mr-2 font-semibold">Category:</label>
        <select
          className="border p-2 rounded"
          value={filterCategoryId}
          onChange={(e) => setFilterCategoryId(e.target.value)}
        >
          <option value="">All</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
      </div>
      <div>
        <h2 className="text-lg font-semibold mb-2">Product List</h2>
        <div className="space-y-2">
          {products
            .filter(p => !filterCategoryId || p.category_id == filterCategoryId)
            .map(p => (
              <div key={p.id} className="border p-2 rounded flex justify-between items-center">
                <span>{p.name} - ${p.price}</span>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  onClick={() => handleDeleteProduct(p.id)}
                >
                  Delete
                </button>
              </div>
          ))}
        </div>
      </div>

      {/* 用户列表 */}
      <div>
        <h2 className="text-lg font-semibold mb-2">User List</h2>
        <div className="space-y-2">
          {users.map(u => (
            <div key={u.id} className="border p-2 rounded flex justify-between items-center">
              <span>{u.email}{u.admin && <span className="text-sm text-green-600 ml-2">(Admin)</span>}</span>
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                onClick={() => handleDeleteUser(u.id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

AdminPage.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  onNeedLogin: PropTypes.func.isRequired,
};

export default AdminPage;