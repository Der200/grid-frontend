import { Stack, Button, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logout } from '../services/redux/authorization-slice/authorization-slice';

const Profile = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const logoutHandler = (event) => {
    dispatch(logout());
    history.replace({ pathname: '/' })
  }

  return (
    <Stack 
      maxWidth="sm" 
      component="main" 
      sx={{margin: "30px auto"}}
      >
      <h2 style={{textAlign: "center"}}>Личный кабинет</h2>
      <div style={{margin: "20px"}}>
        <Typography sx={{marginBottom: "15px"}}>Статус:</Typography>
        <Typography>Email:</Typography>
      </div>
      <Button color="error" size="large" onClick={logoutHandler} type="submit">Выйти</Button>
    </Stack>
  )
}

export default Profile;