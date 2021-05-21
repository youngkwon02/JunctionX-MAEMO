import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MainView from './views/MainView'
import LoginView from './views/LoginView'

function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={MainView}></Route>
          <Route exact path="/login/" component={LoginView}></Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;