import { Turnstile } from '@marsidev/react-turnstile';

import axios from 'axios';
import { useState } from 'react';
import './App.css';

function App() {
  const [token, setToken] = useState<string>('');

  return (
    <>
      <input placeholder="OTP"></input>
      <input placeholder="New password"></input>

      <Turnstile
        onSuccess={(token) => {
          setToken(token);
        }}
        siteKey="0x4AAAAAAAeM6ALXlIJzk30v"
      />

      <button
        onClick={() => {
          axios.post('http://localhost:3000/reset-password', {
            email: 'ishan@gmail.com',
            otp: '948161',
            token: token,
            newPassword: 'ishan@2000',
          });
        }}
      >
        Update password
      </button>
    </>
  );
}

export default App;
