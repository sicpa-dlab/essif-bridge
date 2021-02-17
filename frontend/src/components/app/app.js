import { Route, Switch, Redirect } from "react-router-dom";
import './app.css';
import Home from '../home'
import Issuer from '../issuer'


function App() {
  return (
    <div className="App">
      <Switch>
        {/* <Route path="/" exact component={Default} />
        <Route path="/issuer" render={routerProps => <Sample {...routerProps} sampleProp={"sample"}/>} />
        <Route path="/verifier" component={Something} />
        <Route path='/default' render={() => <Redirect to= "/" />} /> */}
        <Route path="/" exact component={Home}></Route>
        <Route path="/issuer" component={Issuer}></Route>
      </Switch>
    </div>
  );
}

export default App;
