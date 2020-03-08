import * as React from "react";
import { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Navbar from "./Navbar";
import NoMatch from "./NoMatch";
import routes from "./routes";

interface IProps {
  data?: any[];
}

class App extends Component<IProps> {
  public render() {
    const data = this.props.data;
    return (
      <div>
        <Navbar />

        <Switch>
          {routes.map(({ path, exact, component, ...rest }) => (
            <Route key={path} path={path} exact={exact} render={(props) => (
              React.createElement(component, {data}, {...rest})
            )} />
          ))}
          <Route render={(props) => <NoMatch /> } />
        </Switch>
      </div>
    );
  }
}

export default App;
