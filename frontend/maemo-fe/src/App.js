import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import {useSelector} from 'react-redux'
import EnterView from './views/EnterView'
import MainView from './views/MainView'
import LoginView from './views/LoginView'
import BookView from './views/BookView'
import TimeView from './views/TimeView'
import PositionView from './views/PositionView'
import RequestView from './views/RequestView'

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
        <Route exact path="/" component={EnterView}></Route>
        <Route exact path="/main" component={MainView}></Route>
        <Route path ="/book" component={BookView}></Route>
        <Route path ="/time" component={TimeView}></Route>
        <Route path ="/position" component={PositionView}></Route>
        <Route path ="/request" component={RequestView}></Route>
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