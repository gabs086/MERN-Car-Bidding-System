import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/services';
import { setAuthToken } from '@/services';

export const registerUser = createAsyncThunk(
   'user/registerUser',
   async (payload: any, { rejectWithValue }) => {
      try {
         console.log('payload:', payload);
         const res = await api.post('/api/users/register', payload);
         console.log('res:', res);
         return res.data;
      } catch (error: any) {
         return rejectWithValue(error.response.data);
      }
   }
);

export const loginUser = createAsyncThunk(
   'user/loginUser',
   async (payload: any, { rejectWithValue }) => {
      try {
         console.log('payload:', payload);
         const res = await api.post('/api/users/login', payload);
         const token: string = res.headers['authorization'].split(' ')[1];
         localStorage.setItem('token', token);

         setAuthToken(token);
         return res.data;
      } catch (error: any) {
         return rejectWithValue(error.response.data);
      }
   }
);
