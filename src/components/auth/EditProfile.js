import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';
import AutoComplete from '../common/AutoComplete';

//filestack
import ReactFilestack from 'filestack-react';
const apiKey = 'AU5Uo7xXbRUezl3OcFq3Zz';

class EditProfile extends React.Component {

  state = {}


  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value }, () => console.log(this.state));
  }

  handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/register', this.state)
      .then(res => {
        //save the token that came in the response to local storage using the function we made in Auth, like a dummy satellizer
        Auth.setToken(res.data.token);
      })
      //redirect to index
      .then(() => this.props.history.push('/events'));
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="field">
          <label htmlFor="firstName">First Name</label>
          <input className="input"
            placeholder="First Name"
            name="firstName"
            onChange={this.handleChange}
          />
        </div>
        <div className="field">
          <label htmlFor="username">Username</label>
          <input className="input"
            placeholder="Username"
            name="username"
            onChange={this.handleChange}
          />
        </div>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            className="input"
            placeholder="Email"
            name="email"
            onChange={this.handleChange}
          />
        </div>
        {/* <div className="field">
          <label htmlFor="image">Profle Picture</label>
          <input
            className="input"
            placeholder="Image"
            name="image"
            onChange={this.handleChange}
          />
        </div> */}
        <ReactFilestack
          apikey={apiKey}
          buttonText="Upload Image"
          buttonClass="classname"
          // onSuccess={res => this.setState({ image: res.filesUploaded[0].url}, () => console.log(this.state))}
          // options={options}
          onSuccess={res => this.setState({ image: res.filesUploaded[0].url })}
        />
        {this.state.image &&
        <img src={`${this.state.image}`} />
        }
        <div className="field">
          <label htmlFor="address">Address</label>
          <AutoComplete className="input"
            placeholder="Address"
            name="address"
            onChange={this.handleChange}
          />
        </div>
        <div className="field">
          <label htmlFor="tel">Mobile Number</label>
          <input
            type="tel"
            className="input"
            placeholder="tel"
            name="tel"
            onChange={this.handleChange}
          />
        </div>
        <div className="field">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="input"
            placeholder="Password"
            name="password"
            onChange={this.handleChange}
          />
        </div>
        <div className="field">
          <label htmlFor="passwordConfirmation">Password Confirmation</label>
          <input
            type="password"
            className="input"
            placeholder="Password Confirmation"
            name="passwordConfirmation"
            onChange={this.handleChange}
          />
        </div>

        <button className="button is-primary">Submit</button>
        <a href="/Login">Login</a>
      </form>

    );
  }
}

export default EditProfile;
