import React from 'react';
import { Route, Switch } from "react-router-dom";

import { Home } from '../pages';

const App: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home}></Route>
    </Switch>
  );
}

export default App;
