import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import {useSelector} from 'react-redux'
import MainView from './views/MainView'
import LoginView from './views/LoginView'
import BookView from './views/BookView'
import TimeView from './views/TimeView'

function App() {
  const isLogin = useSelector(state => state.user.isLogin)
  const loginRouter = (
    <>
      <Route path="/login" component={LoginView} />
      <Redirect from ="*" to="/login" />
    </>
  )

  const serviceRouter = (
    <>
      <Switch>
        <Route exact path="/" component={MainView}></Route>
        <Route path ="/book" component={BookView}></Route>
        <Route path ="/time" component={TimeView}></Route>
      </Switch>
    </>
  )

  return (
    <>
      <BrowserRouter>
        {isLogin ? serviceRouter : loginRouter}
      </BrowserRouter>
    </>
  );
}

export default App;