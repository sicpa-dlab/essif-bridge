import { Route, Switch } from "react-router-dom";

import { Home, Issuer, Verifier } from '../pages';

// TODO this is just a example, remove before pushing to master
import ChapiExample from '../pages/chapi-playground/ChapiPlayground'

const App: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home}></Route>
      <Route path="/issuer" component={Issuer}></Route>
      <Route path="/verifier" component={Verifier}></Route>
      <Route path="/playground" component={ChapiExample} />
    </Switch>
  );
}

export default App;
