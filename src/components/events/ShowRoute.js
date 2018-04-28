import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';
import GoogleMap from './GoogleMap';

import { Link } from 'react-router-dom';

class ShowRoute extends React.Component {

  state = {
    event: null,
    message: '',
    joined: null,
    checked: true
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

  handleToggle = () => {
    this.setState({ checked: !this.state.checked });
  }

  render() {
    console.log(this.state.event);
    const userId = Auth.getPayload().sub;
    return (
      this.state.event ? (
        <div className="container">
          <div className="show-container">
            <i id="falcon-pages" className="fab fa-phoenix-framework"></i>
            <h1 className="title">{this.state.event.name}</h1>
            <h2 className="subtitle">{this.state.event.sport}</h2>

            <div className="event-show-top">
              <div className="columns is-multiline">
                <div className="column is-half">
                  <img className="image" src={`${this.state.event.image}`} />
                </div>

                <div className="column is-half">
                  <h4>{this.state.event.name}</h4>
                  <h5>{this.state.event.sport}</h5>
                  <h6>Event Organiser:<br/><span>{this.state.event.createdBy.username}</span></h6>
                  <h6>Date:<br/><span>{this.state.event.dateTime.split('T')[0].split('-')[2]}/{this.state.event.dateTime.split('T')[0].split('-')[1]}/{this.state.event.dateTime.split('T')[0].split('-')[0]}</span></h6>
                  <h6>Time:<br/> <span>{this.state.event.dateTime.split('T')[1].split(':00.')[0]}</span></h6>
                  <h6>Team Size:<br/> <span>{this.state.event.teamSize}</span></h6>
                  <h6>Address:<br/><span>{this.state.event.address}</span></h6>
                  <h6>Info:<br/> <span>{this.state.event.description}</span></h6>
                  {this.state.event.createdBy && this.state.event.createdBy._id === userId &&
                    <div className="delete-edit-container">
                      <Link className="edit-button-show-page" to={`/events/${this.state.event._id}/edit`}>Edit</Link>
                      <button onClick={this.handleDelete}>Delete</button>
                    </div>
                  }

                  { this.state.event.createdBy && this.state.event.createdBy._id !== userId && Auth.isAuthenticated() && this.state.event.joinedUsers.findIndex(user => user._id === userId) === -1 && !this.state.message &&
                  <button className="button" onClick={this.joinEvent}>Join Event</button>
                  }
                  { this.state.event.joinedUsers.findIndex(user => user._id === userId) !== -1 &&
                    <button className="button" onClick={this.leaveEvent}>Leave Event</button>
                  }
                  <p>{this.state.message}</p>
                </div>
              </div>
            </div>

            <div className="ex2">
              <button><label htmlFor="item-2">Attendees</label></button>
              <input onChange={this.handleToggle} checked={this.state.checked} type="checkbox" name="rwo" id="item-2" />
              <div className="inner">
                <div className="hide2">

                  <h2 className="Title">Attendees</h2>
                  <ul className="columns">
                    {this.state.event.joinedUsers.map((user, i) =>
                      <li key={i} className="column is-one-third">
                        <div className="card">
                          <div className="card-content">
                            <h5>{user.firstName}</h5>
                            <h6>{user.username}</h6>
                            <img className="image" src={`${user.image}`} />
                          </div>
                        </div>
                      </li>
                    )}
                  </ul>

                </div>
              </div>
              <p className="follow"></p>
            </div>







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
