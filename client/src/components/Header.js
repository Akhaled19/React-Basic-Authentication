import React from 'react';
import { Link } from 'react-router-dom';

export default class Header extends React.PureComponent {
  render() {
    const {context} = this.props;
    const authUser = context.authenticatedUser;
    return (
      <div className="header">
        <div className="bounds">
          <h1 className="header--logo">MyAuth</h1>
          <nav>
            {authUser ? 
              <React.Fragment>
                <span>Welcome, {authUser.name}!</span>
                <link to="/signout">Sign Out</link>
              </React.Fragment>
            : <React.Fragment>
              <link className="signup" to="/signup">Sign Up</link> 
              <link className="signin" to="/signin">Sign In</link>
            </React.Fragment> 
            }
          </nav>
        </div>
      </div>
    );
  }
};
