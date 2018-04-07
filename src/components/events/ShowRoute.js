import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';

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

  render() {
    return (
      this.state.event ? (
        <div className="container">
          <h1 className="title">{this.state.event.name}</h1>

          <Link className="button is-primary" to={`/events/${this.state.event._id}/edit`}>Edit</Link>
          {' '}
          <button className="button is-danger" onClick={this.handleDelete}>Delete</button>
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
