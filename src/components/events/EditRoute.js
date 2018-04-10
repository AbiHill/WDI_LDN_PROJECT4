import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';
import Form from './Form';

class EditRoute extends React.Component {

  state = {
    name: '',
    sport: '',
    address: '',
    image: '',
    date: 0,
    time: 0,
    description: '',
    teamSize: 0
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value }, () => console.log(this.state));
  }

  handleSubmit = (e) => {
    e.preventDefault();
    // use Auth.gettoken that we made in auth to get the token for the header
    axios.put(`/api/events/${this.props.match.params.id}`, this.state, {
      headers: { Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(() => this.props.history.push(`/events/${this.props.match.params.id}`));
  }

  componentDidMount() {
    axios.get(`/api/events/${this.props.match.params.id}`)
      .then(res => this.setState(res.data));
  }

  render() {
    return(
      <div className="container">
        <Form handleChange={this.handleChange} handleSubmit={this.handleSubmit} data={this.state}/>
      </div>
    );
  }
}

export default EditRoute;
