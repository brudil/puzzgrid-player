import React from 'react';
import { BrowserRouter } from 'react-router-dom';

class Application extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <h1>Application</h1>
      </BrowserRouter>
    );
  }
}

export { Application };
