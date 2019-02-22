import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { GridContainer } from './components/GridContainer';

class Application extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <h1>Puzzgrid</h1>
          <Switch>
            <Route path="/:gridId" component={GridContainer} />
            <Route component={() => <h2>Grid ID needed</h2>} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export { Application };
