import React, { Component } from 'react';
import '../styles/login.css';


//login logout functions were written in App.js and will be passed here as props

class Login extends Component {
  render(){
    return (
      <div className="loginIntro">
        <h1><span>to doom</span> list</h1>
        <h2>What will you need to survive doomsday?</h2>
        <p>Join others in preparation for the end of the world!</p>
        {this.props.userName ? 
          <button onClick={this.props.logout}>Log Out</button>
         : 
          <button onClick={this.props.login} className="loginButton loginOne">
            Log In
          </button>
        }
        <button onClick={this.props.guest} className="loginButton">
          Guest
        </button>
      </div>
    );
  } //the button onclick functions are in App. So we're passing those functions in by props. The username is put in App (not login) bcuz we'll be accessing it in both components
}

export default Login;