import { createSlice } from '@reduxjs/toolkit';

import { registerUser, loginUser } from './authenticationCreators';

export const authenticationSlice = createSlice({
   name: 'auth',
   initialState: {
      login: {
         data: {},
         errorData: {},
         isAuthenticated: false,
         loading: false,
         error: false,
      },
      register: {
         data: {},
         errorData: {},
         loading: false,
         error: false,
      },
   },
   reducers: {
      clearRegister(state) {
         state.register.data = {};
         state.register.errorData = {};
         state.register.loading = false;
         state.register.error = false;
      },
   },
   extraReducers: (builder: any) => {
      //* registerUser
      builder.addCase(registerUser.pending, (state: any) => {
         console.log('pending:');
         state.register.loading = true;
      });
      builder.addCase(registerUser.fulfilled, (state: any, action: any) => {
         console.log('fulfilled:');
         console.log('action:', action);
         state.register.data = action.payload;
         state.register.loading = false;
         state.register.error = false;
      });

      builder.addCase(registerUser.rejected, (state: any, action: any) => {
         console.log('rejected:');
         console.log('action:', action);
         state.register.errorData = action.payload;
         state.register.loading = false;
         state.register.error = true;
      });

      //*loginUser
      //   login: {
      //     data: {},
      //     isAuthenticated: false,
      //     loading: false,
      //     error: false,
      //  },
      builder.addCase(loginUser.pending, (state: any) => {
         state.login.loading = true;
      });
      builder.addCase(loginUser.fulfilled, (state: any, action: any) => {
         state.login.loading = false;
         state.login.data = action.payload;
         state.login.isAuthenticated = true;
         state.login.error = false;
      });
      builder.addCase(loginUser.rejected, (state: any, action: any) => {
         state.login.loading = false;
         state.login.errorData = action.payload;
         state.login.isAuthenticated = false;
         state.login.error = true;
      });
   },
});

// Action creators are generated for each case reducer function
export const { clearRegister } = authenticationSlice.actions;

export default authenticationSlice.reducer;
