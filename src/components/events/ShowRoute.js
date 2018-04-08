import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';
import GoogleMap from './GoogleMap';

import { Link } from 'react-router-dom';

class ShowRoute extends React.Component {

  state = {
    event: null
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
    console.log(this.state.event._id);
    axios.put(`/api/users/${Auth.getUserByID()}`, {body: this.state.event._id});
  }

  render() {
    return (
      this.state.event ? (
        <div className="container">
          <h1 className="title">{this.state.event.name}</h1>
          <h2 className="subtitle">{this.state.event.sport}</h2>
          <p>{this.state.event.date} @ {this.state.event.time}</p>
          <p>{this.state.event.description}</p>
          <p>Team Size: {this.state.event.teamSize}</p>
          <p>ID: {this.state.event._id} </p>
          <img src={`${this.state.event.image}`} />
          <Link className="button is-primary" to={`/events/${this.state.event._id}/edit`}>Edit</Link>
          <button className="button is-danger" onClick={this.handleDelete}>Delete</button>
          <button className="button" onClick={this.joinEvent} >Join Event</button>
          <p>Address: {this.state.event.address}</p>
          <GoogleMap center={this.state.event.location} />
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
