import { Route, Switch } from "react-router-dom";

import { Issuer } from '../pages';

const App: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={Issuer}></Route>
    </Switch>
  );
}

export default App;
