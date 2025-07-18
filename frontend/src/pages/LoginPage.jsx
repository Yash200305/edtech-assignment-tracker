import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api';

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await login({ username: email, password });
      const token = response.data.access_token;

      // Decode JWT to extract role
      const payload = JSON.parse(atob(token.split('.')[1]));
      const role = payload.role;

      onLogin(token, role);
      navigate(`/${role}`);
    } catch (error) {
      setMessage('❌ Invalid credentials');
      console.error(error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-semibold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>
      {message && <p className="mt-4 text-center text-sm text-red-600">{message}</p>}
      <p className="mt-4 text-center text-sm">
        Don't have an account? <a href="/signup" className="text-blue-600 underline">Sign up</a>
      </p>
    </div>
  );
};

export default LoginPage;
