import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { checkAuth, createUser, loginUser, resetPassword, resetPasswordRequest, signOut } from './AuthApi';

const initialState = {
  loggedInUserToken:null,
  error:null,
  status: 'idle',
  userChecked:false,
  mailSent:false,
  passwordReset:false
};

export const crateUserAsync = createAsyncThunk(
  'auth/crateUser',
  async (userData) => {
    const response = await createUser(userData);
    return response.data;
  }
);

export const loginUserAsync = createAsyncThunk(
  'auth/loginUser',
  async (loginInfo,{rejectWithValue}) => {  //set reject wala part
   try{
    const response = await loginUser(loginInfo);
    return response.data;
   }
   catch(err){
    return  rejectWithValue(err)  // ye action.payload me bhj dega error ko reject me
   }
  }
);


export const checkAuthAsync = createAsyncThunk(
  'auth/checkAuth',
  async () => {  //set reject wala part
   try{
    const response = await checkAuth();
    return response.data;
   }
   catch(err){
         console.log(err);    
  }
  }
);

export const resetPasswordRequestAsync = createAsyncThunk(
  'auth/resetPasswordRequest',
  async (email,{rejectWithValue}) => {  //set reject wala part
   try{
    const response = await resetPasswordRequest(email);
    return response.data;
   }
   catch(err){
    return  rejectWithValue(err) 
         
  }
  }
);

export const resetPasswordAsync = createAsyncThunk(
  'auth/resetPassword',
  async (data,{rejectWithValue}) => {  //set reject wala part
   try{
    const response = await resetPassword(data);
    return response.data;
   }
   catch(err){
    return  rejectWithValue(err) 
         
  }
  }
);


export const signOutAsync = createAsyncThunk(
  'auth/signOut',
  async () => {
    const response = await signOut();
    return response.data;
  }
);



export const authSlice = createSlice({
  name: 'auth',
  initialState,

  reducers: {
    increment: (state) => {
      state.value += 1;
    },  
  },
  extraReducers: (builder) => {
    builder
      .addCase(crateUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(crateUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUserToken = action.payload;
      })
      .addCase(loginUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUserToken = action.payload;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload;
      })
      .addCase(checkAuthAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(checkAuthAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUserToken = action.payload;
        state.userChecked = true;
      })
      .addCase(checkAuthAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.userChecked = true;
      })
      .addCase(signOutAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signOutAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUserToken = null;
      })
      .addCase(resetPasswordRequestAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(resetPasswordRequestAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.mailSent = true;
      })
      .addCase(resetPasswordRequestAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.mailSent = false;
        state.error = action.payload;
      })
      .addCase(resetPasswordAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(resetPasswordAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.passwordReset = true;
      })
      .addCase(resetPasswordAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.passwordReset = false;
        state.error = action.payload;
      })
      ;
  },
});

export const { increment } = authSlice.actions;
export const selectLoggedInUser=(state)=>state.auth.loggedInUserToken;
export const selectError=(state)=>state.auth.error
export const selectUserChecked=(state)=>state.auth.userChecked
export const selectMailSent=(state)=>state.auth.mailSent
export const selectPasswordReset=(state)=>state.auth.passwordReset
export default authSlice.reducer;
