import AppHeader from '../app-header/app-header';
import Login from '../../pages/login';
import Register from '../../pages/register';
import Offers from '../../pages/offers';
import Stats from '../../pages/stats';
import { Switch, Route } from 'react-router-dom';
import DateAdapter from '@mui/lab/AdapterMoment';
import { LocalizationProvider } from '@mui/lab';
import { ruLocale } from 'moment/locale/ru';
import Profile from '../../pages/profile';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOffersStatus, getOffers } from '../../services/redux/offers-slice/offers-slice';
import { loginStatus } from '../../services/redux/authorization-slice/authorization-slice';


function App() {
  const offersStatus = useSelector(getOffersStatus);
  const currentUser = useSelector(loginStatus);
  const dispatch = useDispatch();
  const token = localStorage.getItem('accessToken');

  useEffect(() => {
    if (token !== null) {
      dispatch(getOffers(token));
    }
  }, [token])

  return (
    <LocalizationProvider dateAdapter={DateAdapter} locale={ruLocale}>
      <AppHeader />
      <Switch>
        <Route path="/stats" component={Stats} />
        <Route path="/offers" component={Offers} />
        <Route path="/profile" component={Profile} />
        <Route path="/register" component={Register} />
        <Route exact path="/" component={Login} />
      </Switch>
    </LocalizationProvider>
  );
}

export default App;
