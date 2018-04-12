import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';
import { Link } from 'react-router-dom';

class ShowProfile extends React.Component {

  state = {
    user: null
  };

  componentDidMount() {
    axios.get('/api/me', {
      headers: { Authorization: `Bearer ${Auth.getToken()}`}
    })
      // .then(res =>  console.log('USER ========>', res.data));
      .then(res => this.setState({ user: res.data }));

  }

  render() {
    //this stops the rendering of the page until the user has been set in the componentDidMount stage
    if (!this.state.user) return false;
    console.log(this.state.user);
    return (
      <div className="profile-container">
        <div className="container">
          <h1>{this.state.user.firstName}</h1>

          <div className="card">
            <div className="card-content">
              <img src={`${this.state.user.image}`} />
              <h4>Username:</h4>
              <p>{this.state.user.username}</p>
              <h4>Email:</h4>
              <p>{this.state.user.email}</p>
              <h4>Address:</h4>
              <p>{this.state.user.address}</p>
              <h4>Mobile:</h4>
              <p>{this.state.user.tel}</p>
            </div>
          </div>

          <h3>Your Events</h3>
          <div className="columns is-multiline">
            {this.state.user.events.map((event, i) =>
              <li key={i} className="column is-one-third">
                <Link to={`/events/${event._id}`}>
                  <div className="card">
                    <div className="card-content">
                      <h4>{event.name}</h4>
                      <h5>{event.sport}</h5>
                      <img src={`${event.image}`} />
                    </div>
                  </div>
                </Link>
              </li>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default ShowProfile;
