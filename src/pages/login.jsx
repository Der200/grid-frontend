import { Stack, Button, Container, TextField, Typography, InputAdornment, IconButton } from '@mui/material';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import { Link, useHistory, Redirect } from 'react-router-dom';
import { useState } from 'react';
import { login } from '../services/redux/authorization-slice/authorization-slice';
import { useDispatch } from 'react-redux';

const Login = () => {
  const [showPasswordFlag, setShowPasswordFlag] = useState(false)
  const dispatch = useDispatch();
  const history = useHistory();
 
  const handleClickShowPassword = () => {
    setShowPasswordFlag(!showPasswordFlag);
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [loginData, setLoginData] = useState({username: "", password: ""});

  const loginDataHandler = (event) => {
    setLoginData({...loginData, [event.target.name]: event.target.value});
  }

  const replaceRequestData = (obj) => {
    let formUrlencoded = [];
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        formUrlencoded.push(key + "=" + obj[key])
      }
    }
    formUrlencoded = formUrlencoded.join("&");
    return formUrlencoded;
  }

  const submitHandler = (event) => {
    event.preventDefault()
    dispatch(login(replaceRequestData(loginData)))
    history.replace({ pathname: '/stats' })
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
        <h1  style={{margin: "25px auto"}}>Вход в личный кабинет</h1>
        <label htmlFor="email">Email</label>
        <TextField 
          id="email"
          label="Поле ввода почты" 
          variant="outlined"
          type="email"
          required
          name="username"
          onChange={loginDataHandler}
          value={loginData.username || ''}
        />
        <label htmlFor="password">Пароль</label>
        <TextField 
          id="password"
          label="Введите пароль" 
          variant="outlined"
          name="password"
          type={showPasswordFlag ? "text" : "password"} 
          required 
          onChange={loginDataHandler}
          value={loginData.password || ''}
          InputProps={{endAdornment: <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPasswordFlag ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>}} 
        />
        <Typography>Ещё нет аккаунта? <Link to="/register">Зарегистрироваться</Link></Typography>
        <Button size="large" type="submit">Войти</Button>
      </Stack>
    </Container>
  )
}


export default Login;