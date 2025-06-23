// import React, { useState } from 'react';
// import { signInWithEmailAndPassword } from 'firebase/auth';
// import { auth } from './firebase';

// const AdminLogin = ({ onLoginSuccess }) => {
//   // const [password, setPassword] = useState('');

//   // const handleLogin = () => {
//   //   if (password === 'admin123') { // Thay bằng mật khẩu thật
//   //     localStorage.setItem('isAdmin', 'true');
//   //     onLoginSuccess();
//   //   } else {
//   //     alert('Sai mật khẩu!');
//   //   }
//   // };

//   // return (
//   //   <div className="p-4 border rounded w-64 mx-auto mt-20 bg-white shadow-lg">
//   //     <h2 className="text-xl font-bold mb-4">Đăng nhập Admin</h2>
//   //     <input
//   //       type="password"
//   //       placeholder="Nhập mật khẩu"
//   //       value={password}
//   //       onChange={(e) => setPassword(e.target.value)}
//   //       className="w-full mb-2 p-2 border rounded"
//   //     />
//   //     <button onClick={handleLogin} className="bg-blue-600 text-white p-2 rounded w-full">
//   //       Đăng nhập
//   //     </button>
//   //   </div>
//   // );


//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = async e => {
//     e.preventDefault();
//     try {
//       const userCred = await signInWithEmailAndPassword(auth, email, password);
//       onLoginSuccess(userCred.user); // gọi callback báo đã đăng nhập
//     } catch (err) {
//       alert("Sai tài khoản hoặc mật khẩu");
//     }
//   };

//   return (
//     <form onSubmit={handleLogin}>
//       <h2>Admin Login</h2>
//       <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
//       <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Mật khẩu" required />
//       <button type="submit">Đăng nhập</button>
//     </form>
//   );
// };

// export default AdminLogin;




import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';

const AdminLogin = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      // ✅ Lưu trạng thái admin vào localStorage
      localStorage.setItem('isAdmin', 'true');
      localStorage.setItem('adminEmail', email);
      onLoginSuccess(userCred.user);
    } catch (err) {
      alert('Sai tài khoản hoặc mật khẩu');
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="p-4 border rounded w-72 mx-auto mt-20 bg-white shadow-lg"
    >
      <h2 className="text-xl font-bold mb-4 text-center">Đăng nhập Admin</h2>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email"
        required
        className="w-full mb-2 p-2 border rounded"
      />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Mật khẩu"
        required
        className="w-full mb-4 p-2 border rounded"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white p-2 rounded w-full"
      >
        Đăng nhập
      </button>
    </form>
  );
};

export default AdminLogin;
