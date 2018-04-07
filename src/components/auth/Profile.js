import React from 'react';
import axios from 'axios';
// import Auth from './Auth';

class Profile extends React.Component {

  state = {
    user: null
  };

  componentDidMount() {
    axios.get(`/api/users/${this.props.match.params.id}`)
      // .then(res => this.setState({ user: res.data }));
      .then(res => console.log(res.data));
  }

  render() {
    return (
      <div className="container">
        <h1 className="title">{this.state.user.name}</h1>

      </div>
    );
  }
}

export default Profile;
