import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MainView from './views/MainView'

function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={MainView}></Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;