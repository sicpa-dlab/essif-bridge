import { Route, Switch } from "react-router-dom";

import { Home, Issuer, Verifier } from '../pages';

const App: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home}></Route>
      <Route path="/issuer" component={Issuer}></Route>
      <Route path="/verifier" component={Verifier}></Route>
    </Switch>
  );
}

export default App;
