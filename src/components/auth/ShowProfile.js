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
      <div className="container">
        <h1 className="title">{this.state.user.firstName}</h1>
        <img src={`${this.state.user.image}`} />
        <h2 className='subtitle'>{this.state.user.username}</h2>
        <h2 className='subtitle'>{this.state.user.email}</h2>
        <h2 className='subtitle'>{this.state.user.address}</h2>
        <h2 className='subtitle'>{this.state.user.tel}</h2>
        <h2 className="title">Your Events</h2>
        {this.state.user.events.map((event, i) =>
          <li key={i} className="column is-one-third">
            <Link to={`/events/${event._id}`}>
              <div className="card">
                <div className="card-content">
                  <h3 className="title is-4">{event.name}</h3>
                  <h4 className="subtitle">{event.sport}</h4>
                  <h4></h4>
                  <img src={`${event.image}`} />
                </div>
              </div>
            </Link>
          </li>
        )}
      </div>
    );
  }
}

export default ShowProfile;
