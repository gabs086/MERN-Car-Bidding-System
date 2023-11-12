import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();
  return (
    <div>
      Register <button onClick={() => navigate(-1)}>Go back</button>
    </div>
  );
}
