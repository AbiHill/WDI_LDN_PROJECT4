import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';
import Flash from '../../lib/Flash';


class Login extends React.Component{

  state = {}

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value }, () => console.log(this.state));
  }

  handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/login', this.state)
      .then(res => {
        //save the token that came in the response to local storage using a function we built in Auth.js
        Auth.setToken(res.data.token);
      })
      .then(() => Flash.setMessage('success', 'Welcome back!'))
      // redirect to index
      .then(() => this.props.history.push('/events'));
  }

  render(){
    return(
      <section>
        <div className="fullscreen-bg">
          {/* <!-- The video --> */}
          <video autoPlay muted loop poster="../../scss/images/basketball.jpg" id="myVideo" className="fullscreen-bg_video">
            <source src="../../scss/images/rec_head_homepage.mp4" type="video/mp4" />
          </video>
        </div>


        <div>
          <h1>REC HEAD</h1>
          <div className="loginBox">
            <form className="loginForm" onSubmit={this.handleSubmit}>
              <div className="field">
                <label htmlFor="email">Email</label>
                <input
                  className="input"
                  placeholder="Email"
                  name="email"
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
              <button>Submit</button>
              <a href="/Register">Register</a>
            </form>
          </div>
        </div>
      </section>

    );
  }
}

export default Login;
