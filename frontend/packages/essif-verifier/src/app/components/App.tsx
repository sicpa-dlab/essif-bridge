import { Route, Switch } from "react-router-dom";

import { Verifier } from '../pages';


const App: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={Verifier}></Route>
    </Switch>
  );
}

export default App;
