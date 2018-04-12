import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';
import GoogleMap from './GoogleMap';

import { Link } from 'react-router-dom';

class ShowRoute extends React.Component {

  state = {
    event: null,
    message: '',
    joined: null
  };

  componentDidMount() {
    axios.get(`/api/events/${this.props.match.params.id}`)
      .then(res => this.setState({ event: res.data }));

  }

  handleDelete = () => {
    axios.delete(`/api/events/${this.props.match.params.id}`, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(() => this.props.history.push('/events'));
  }

  joinEvent = () => {
    this.setState({ message: 'You\'ve Successfully Joined!'});
    console.log(this.state.event._id);
    console.log(Auth.getToken());
    axios.put(`/api/me/join/${this.state.event._id}`, this.state.event._id, {
      headers: { Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(res => console.log(res))
      .catch(err => console.error(err));
  }

  leaveEvent = () => {
    this.setState({ message: 'You\'ve Successfully left this event!'});
    axios.put(`/api/me/leave/${this.state.event._id}`, this.state.event._id, {
      headers: { Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(res => console.log(res))
      .catch(err => console.error(err));
  }

  render() {
    console.log(this.state.event);
    const userId = Auth.getPayload().sub;
    return (
      this.state.event ? (
        <div className="container">
          <div className="show-container">
            <h1 className="title">{this.state.event.name}</h1>
            <h2 className="subtitle">{this.state.event.sport}</h2>
            <p>{this.state.event.dateTime.split('T')[0].split('-')[2]}/{this.state.event.dateTime.split('T')[0].split('-')[1]}/{this.state.event.dateTime.split('T')[0].split('-')[0]}</p>
            <p>{this.state.event.dateTime.split('T')[1].split(':00.')[0]}</p>
            <p>{this.state.event.description}</p>
            <p>Team Size: {this.state.event.teamSize}</p>
            <p>ID: {this.state.event._id} </p>
            <img src={`${this.state.event.image}`} />
            <h2>Event Organiser</h2>
            <p>{this.state.event.createdBy.username}</p>
            <h2 className="Title">Attendies</h2>

            <ul>
              {this.state.event.joinedUsers.map((user, i) =>
                <li key={i} className="column is-one-third">
                  <div className="card">
                    <div className="card-content">
                      <h3 className="title is-4">{user.firstName}</h3>
                      {/* <img src={`${uer.image}`} /> */}
                    </div>
                  </div>
                </li>
              )}
            </ul>

            {this.state.event.createdBy && this.state.event.createdBy._id === userId &&
              <div>
                <Link className="button is-primary" to={`/events/${this.state.event._id}/edit`}>Edit</Link>
                <button className="button is-danger" onClick={this.handleDelete}>Delete</button>
              </div>
            }

            { this.state.event.createdBy && this.state.event.createdBy._id !== userId && Auth.isAuthenticated() && this.state.event.joinedUsers.findIndex(user => user._id === userId) === -1 && !this.state.message &&
            <button className="button" onClick={this.joinEvent}>Join Event</button>
            }
            { this.state.event.joinedUsers.findIndex(user => user._id === userId) !== -1 &&
              <button className="button" onClick={this.leaveEvent}>Leave Event</button>
            }
            <p>{this.state.message}</p>


            <p>Address: {this.state.event.address}</p>
            <GoogleMap center={this.state.event.location} />
          </div>
        </div>
      ) : (
        <div className="container">
          <h1 className="title">LOADING</h1>
        </div>

      )
    );
  }
}

export default ShowRoute;
