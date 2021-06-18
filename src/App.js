import React from 'react';
import {
  BrowserRouter, Switch, Route, Redirect,
} from 'react-router-dom';
import Loadable from 'react-loadable';
import PrivateRoute from './components/HOC/privateRoute';
import * as Cookies from './lib/Cookie';
import './App.css';

const loading = () => null;
const Join = Loadable({
  loader: () => import(/* webpackChunkName: "Join" */ './pages/join'),
  loading,
});
const Home = Loadable({
  loader: () => import(/* webpackChunkName: "Home" */ './pages/home'),
  loading,
});
const PageNotFound = Loadable({
  loader: () => import(/* webpackChunkName: "PageNotFound" */ './pages/pageNotFound'),
  loading,
});
const isLoggedIn = true;
function App() {
  const cookieId = Cookies.get('user_id');
  const checkAndRedirect = () => isLoggedIn && <Redirect to="/home" />;
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" render={() => checkAndRedirect() || <Home />} exact />
        <Route path="/join" component={PrivateRoute(Join)} exact />
        <Route component={PageNotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
