import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API = 'url';

export const register = createAsyncThunk('authorization/register', async (data) => {
  try {
    const registerApiUrl = API + 'users/'
    const res = await fetch(registerApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
    
    if(!res.ok) {
      throw new Error('сервер не смог обработать наш запрос')
    }

    const registerData = await res.json();
    return registerData
        
  } catch(error) {
    console.log(`Что-то пошло не так. Ошибка: ${error}`)
  }
})

export const login = createAsyncThunk('authorization/login', async (data) => {
  const loginApiUrl = API + 'auth/';
  const res = await fetch(loginApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: data
    });
    
    if(!res.ok) {
      console.log(`Email or password incorrect`)
      throw new Error('сервер не смог обработать наш запрос')
    }

    const loginData = await res.json();
    return loginData
})

export const getUsers = createAsyncThunk('authorization/getUsers', async () => {
  const registerApiUrl = API + 'users/';
  try {
    const res = await fetch(registerApiUrl);
    
    if(!res.ok) {
      throw new Error('сервер не смог обработать наш запрос')
    }
    const users = await res.json();

    return users
            
  } catch(e) {
      alert(`Что-то пошло не так. Ошибка: ${e}`)
  }
})

const initialState = {
  user: {name: null, token: null},
  token: null,
  loginStatus: false,
  totalUsers: [],
  authorizationStatus: `idle`,
  otherRequestsStatus: 'idle',
  recoveryCodeSent: false,
}

export const authorizationSlice = createSlice({
  name: 'authorization',
  initialState,
  reducers: {
    logout: (state) => {
      state.authorizationStatus = `idle`;
      state.user = {};
      localStorage.removeItem('accessToken');
      state.loginStatus = false;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state) => {
      state.authorizationStatus = 'loading';
    })
    builder.addCase(register.fulfilled, (state, { payload }) => {
      state.authorizationStatus = 'succeeded';
      if (payload !== undefined) {
        state.user = payload;
      }
    })
    builder.addCase(register.rejected, (state) => {
      state.authorizationStatus = 'failed';
    })
    builder.addCase(login.pending, (state) => {
      state.authorizationStatus = 'loading';
    })
    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.authorizationStatus = 'succeeded';
      if (payload !== undefined) {
        console.log(payload)
        const accessToken = 'Bearer ' + payload.access_token;
        state.user.token = accessToken;
        state.token = accessToken;
        localStorage.setItem('accessToken', accessToken);
        state.loginStatus = true;
      }
    })
    builder.addCase(login.rejected, (state) => {
      state.authorizationStatus = 'failed';
    })
    builder.addCase(getUsers.pending, (state) => {
      state.otherRequestsStatus = 'loading';
    })
    builder.addCase(getUsers.fulfilled, (state, { payload }) => {
      state.otherRequestsStatus = 'succeeded';
      state.totalUsers = payload;
    })
    builder.addCase(getUsers.rejected, (state) => {
      state.otherRequestsStatus = 'failed';
    })
  },
})

export const loginStatus = (state) => state.authorization.loginStatus;
export const user = (state) => state.authorization.user;
export const token = (state) => state.authorization.token;
export const { logout } = authorizationSlice.actions
export default authorizationSlice.reducer