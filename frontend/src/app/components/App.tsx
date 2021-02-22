import { Route, Switch } from "react-router-dom";

import { Home, Issuer } from '../pages';

const App: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home}></Route>
      <Route path="/issuer" component={Issuer}></Route>
    </Switch>
  );
}

export default App;
