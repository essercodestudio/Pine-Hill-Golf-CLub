import React, { useState } from 'react';
import Button from '../components/Button';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Login attempt with:', { email, password });
    alert(`Login attempt with: ${email}`);
  };
  
  const handleRegister = (e) => {
    e.preventDefault();
    console.log('Register attempt with:', { email, password });
    alert(`Register attempt with: ${email}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh]">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-xl shadow-lg">
        <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold text-white">
                Access Pine Hill Score
            </h2>
        </div>
        <form className="mt-8 space-y-4" onSubmit={handleLogin}>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="appearance-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="appearance-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

          <div className="flex items-center justify-between gap-4">
            <Button type="submit" className="w-full">
              Login
            </Button>
            <Button type="button" onClick={handleRegister} variant="secondary" className="w-full">
              Register
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;