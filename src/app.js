import React from 'react';
import ReactDOM from 'react-dom';

import IndexRoute from './components/events/IndexRoute';
import Navbar from './components/common/Navbar';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

import 'bulma';

import { BrowserRouter, Route, Switch } from 'react-router-dom';



class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <section>
          <Navbar />
          <main className="section">
            <Switch>
              <Route exact path="/events" component={IndexRoute} />
              <Route path="/register" component={Register} />
              <Route path="/" component={Login} />
            </Switch>
          </main>
        </section>
      </BrowserRouter>
    );
  }
}


ReactDOM.render(
  <App />,
  document.getElementById('root')
);
