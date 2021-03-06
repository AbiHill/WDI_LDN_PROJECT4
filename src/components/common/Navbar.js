import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Auth from '../../lib/Auth';

class Navbar extends React.Component {

  state = {
    navIsOpen: false
  }

  //to avoid binding the method inside a constructor we can just use an arrow function, because they don't care about 'this' they will just look for something to bind to
  handleToggle = () => {
    this.setState({ navIsOpen: !this.state.navIsOpen });
  }

  //will fire everytime the navbar receives new props, which it does whenever a link is clicked. Also fires whenever the state changes which is why we neede this.state.navIsOpen &&, so we don't get stuck in an infinite loop of state changes. This will now only fire when this.state.navIsOpen = true;
  componentWillUpdate() {
    this.state.navIsOpen && this.setState({ navIsOpen: false  });
  }

  handleLogout = () => {
    Auth.logout();
    this.props.history.push('/events');
  }

  render() {
    return (
      <nav className="navbar">
        <div className="navbar-brand">
          <Link className="navbar-item" to="/events">
            <i id="falcon-logo" className="fab fa-phoenix-framework"></i><p className="logo-text"> R H</p>
          </Link>
          <div className={`navbar-burger ${this.state.navIsOpen? 'is-active' : ''}`}
            onClick={this.handleToggle}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div className={`navbar-menu ${this.state.navIsOpen ? 'is-active' : ''}`}>
          <div className="navbar-end">
            {Auth.isAuthenticated() && <Link id="navlink" className="navbar-item" to="/events">events</Link>}
            {Auth.isAuthenticated() && <Link id="navlink" className="navbar-item" to="/events/new">add</Link>}
            {/* below is the link to profile page....FIX */}
            {Auth.isAuthenticated() && <Link id="navlink" className="navbar-item" to="/me">profile</Link>}
            {Auth.isAuthenticated() && <a id="navlink" className="navbar-item" onClick={this.handleLogout}>logout</a>}
            {!Auth.isAuthenticated() && <Link id="navlink" className="navbar-item" to="/events">events</Link> }
            {!Auth.isAuthenticated() && <Link id="navlink" className="navbar-item" to="/login">login</Link> }
            {!Auth.isAuthenticated() && <Link id="navlink" className="navbar-item" to="/register">register</Link> }
          </div>
        </div>
      </nav>
    );
  }
}

//need with router so that it's as if it's wrapped in Route in the app.js, this passes it history, location and match into the props
export default withRouter(Navbar);
