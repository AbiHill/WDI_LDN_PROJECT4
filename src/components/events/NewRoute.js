
import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';
import Form from './Form';

class NewRoute extends React.Component {

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
    const errors = { ...this.state.errors, [name]: '' };
    this.setState({ [name]: value, errors }, () => console.log(this.state));
  }


  handleSubmit = (e) => {
    e.preventDefault();
    //change our axios request using the docs to put the user's token in the header since this is behind a secureRoute and to pass it it needs a valid token in the header of the request.
    // use Auth.gettoken that we made in auth to get the token for the header
    axios.post('/api/events', this.state, {
      headers: { Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(() => this.props.history.push('/events'))
      .catch(err => this.setState({ errors: err.response.data.errors }));
  }




  render(){
    return(
      <div className="container">
        <Form handleChange={this.handleChange} handleSubmit={this.handleSubmit} data={this.state} />
      </div>
    );
  }
}

export default NewRoute;
