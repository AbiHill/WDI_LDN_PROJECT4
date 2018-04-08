import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';

class ShowProfile extends React.Component {

  state = {
    user: {}
  };

  componentDidMount() {
    axios.get(`/api/users/${Auth.getUserByID()}`)
      .then(user => this.setState({ user: user.data }));

  }

  render() {
    console.log(this.state.user);
    return (
      <div className="container">
        <h1 className="title">{this.state.user.firstName}</h1>
        <h2 className='subtitle'>{this.state.user.username}</h2>
        <h2 className='subtitle'>{this.state.user.email}</h2>
        <h2 className='subtitle'>{this.state.user.address}</h2>
        <h2 className='subtitle'>{this.state.user.mobileNumber}</h2>

      </div>
    );
  }
}

export default ShowProfile;
