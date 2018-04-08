import React from 'react';
import ReactDOM from 'react-dom';

import IndexRoute from './components/events/IndexRoute';
import ShowRoute from './components/events/ShowRoute';
import EditRoute from './components/events/EditRoute';
import NewRoute from './components/events/NewRoute';
import Navbar from './components/common/Navbar';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import NotFound from './components/common/NotFound';
import FlashMessages from './components/common/FlashMessages';
import Profile from './components/auth/Profile';

import './scss/style.scss';

import 'bulma';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ProtectedRoute from './components/common/ProtectedRoute';



class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <section>
          <Navbar />
          <FlashMessages />
          <main className="section">
            <Switch>
              <ProtectedRoute exact path="/events/new" component={NewRoute} />
              <Route exact path="/events/:id/edit" component={EditRoute} />
              <Route exact path="/users/" component={Profile} />
              <Route exact path="/events/:id" component={ShowRoute} />
              <Route exact path="/events" component={IndexRoute} />
              <Route path="/register" component={Register} />
              <Route path="/login" component={Login} />
              <Route component={NotFound} />
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
