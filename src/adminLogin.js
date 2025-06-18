import React, { useState } from 'react';

const AdminLogin = ({ onLoginSuccess }) => {
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (password === 'admin123') { // Thay bằng mật khẩu thật
      localStorage.setItem('isAdmin', 'true');
      onLoginSuccess();
    } else {
      alert('Sai mật khẩu!');
    }
  };

  return (
    <div className="p-4 border rounded w-64 mx-auto mt-20 bg-white shadow-lg">
      <h2 className="text-xl font-bold mb-4">Đăng nhập Admin</h2>
      <input
        type="password"
        placeholder="Nhập mật khẩu"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full mb-2 p-2 border rounded"
      />
      <button onClick={handleLogin} className="bg-blue-600 text-white p-2 rounded w-full">
        Đăng nhập
      </button>
    </div>
  );
};

export default AdminLogin;
