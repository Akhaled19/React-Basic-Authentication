import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

export default class UserSignIn extends Component {
  state = {
    username: '',
    password: '',
    errors: [],
  }

  render() {
    const {
      username,
      password,
      errors,
    } = this.state;

    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign In</h1>
          <Form 
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Sign In"
            elements={() => (
              <React.Fragment>
                <input 
                  id="username" 
                  name="username" 
                  type="text"
                  value={username} 
                  onChange={this.change} 
                  placeholder="User Name" />
                <input 
                  id="password" 
                  name="password"
                  type="password"
                  value={password} 
                  onChange={this.change} 
                  placeholder="Password" />                
              </React.Fragment>
            )} />
          <p>
            Don't have a user account? <Link to="/signup">Click here</Link> to sign up!
          </p>
        </div>
      </div>
    );
  }

  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value
      };
    });
  }

  submit = () => {
    const { context } = this.props;
    const { form } = this.props.location.state || { form: { pathname: '/authenticated'} };
    const { username, password } = this.state;

    context.actions.signIn(username, password)
      .then((user) => {
        if(user === null) {
          this.setState(() => {
            return {errors: ['sign-in was unsuccessful'] };
          });
        } else {
          this.props.history.push(form);
          console.log(`SUCESS: ${username} is now signed in!`);
        }
      })
      .catch( (err) => {
        console.errors(err);
        this.props.history.push('/error');
      });
  }

  cancel = () => {
    this.props.history.push('/');
  }
}
