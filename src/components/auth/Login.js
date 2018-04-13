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
          <video autoPlay muted loop id="myVideo" className="fullscreen-bg_video">
            <source src="/assets/basketball3.mp4" type="video/mp4" />
          </video>
        </div>



        <div className="loginBox">
          <i id="falcon" className="fab fa-phoenix-framework"></i>

          {/* <img src="../../scss/images/rechead_logo.gif" /> */}

          <h1 className="rechead">REC HEAD</h1>
          <form className="loginForm" onSubmit={this.handleSubmit}>
            <div className="loginField">
              <label htmlFor="email"></label>
              <input
                className="loginInput"
                placeholder="Email"
                name="email"
                onChange={this.handleChange}
              />
            </div>
            <div className="loginField">
              <label htmlFor="password"></label>
              <input className="loginInput"
                type="password"
                placeholder="Password"
                name="password"
                onChange={this.handleChange}
              />
            </div>
            <button>LOGIN</button>
            <a href="/Register">Register</a>
          </form>
        </div>

      </section>

    );
  }
}

export default Login;
