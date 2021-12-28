import React, { useState } from 'react';
import { Stack, Button, Container, TextField, Box, IconButton, InputAdornment, Typography } from '@mui/material';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import { Link, useHistory, Redirect } from 'react-router-dom';
import { register } from '../services/redux/authorization-slice/authorization-slice';
import { useDispatch } from 'react-redux';

const Register = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [registerData, setRegisterData] = useState({email: "", password: ""});
  const [passwordVisible, setPasswordVisible] = useState(false);

  const registerDataHandler = (event) => {
    setRegisterData({...registerData, [event.target.name]: event.target.value})
  }

  const handleClickShowPassword = () => {
    setPasswordVisible(!passwordVisible);
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(register({'email': registerData.email, 'password': registerData.password}));
    history.replace({ pathname: '/' });
  }

  if (localStorage.getItem('accessToken') !== null) {
    return <Redirect to='/profile'/>
  }

  return (
    <Container maxWidth="sm" component="main">
      <Stack 
        component="form"
        spacing={2}
        onSubmit={submitHandler}
      >
        <h1 style={{margin: "25px auto"}}>Регистрация аккаунта</h1>
        <div>
          <label htmlFor="email">Email</label>
          <TextField 
            id="email"
            label="Поле ввода почты" 
            variant="outlined"
            type="email"
            required
            name="email"
            value={registerData.email || ""}
            onChange={registerDataHandler}
            sx={{width: "100%", marginTop: "15px"}}
          />
        </div>
        <div>
          <label htmlFor="password">Пароль</label>
          <Box sx={{display: "flex", justifyContent: "space-between", marginTop: "15px"}}>
            <TextField
              sx={{width: "48%"}}
              id="password"
              label="Введите пароль" 
              variant="outlined"
              name="password"
              value={registerData.password || ""}
              type={!passwordVisible ? "password" : "text"} 
              required 
              onChange={registerDataHandler}
              InputProps={{endAdornment: <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {passwordVisible ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>}} 
            />
            <TextField
              sx={{width: "48%"}}
              label="Подтвердите пароль" 
              variant="outlined"
              value={registerData.rePassword || ""}
              name="rePassword"
              type={!passwordVisible ? "password" : "text"} 
              required 
              onChange={registerDataHandler}
              InputProps={{endAdornment: <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {passwordVisible ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>}} 
            />
          </Box>
        </div>
        <Typography>Уже есть аккаунт? <Link to="/">Войти</Link></Typography>
        <Button size="large" type="submit">Зарегистрироваться</Button>
      </Stack>
    </Container>
  )
}

export default Register;