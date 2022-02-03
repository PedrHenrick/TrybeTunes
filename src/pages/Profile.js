import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import ProfileEdit from './ProfileEdit';

class Profile extends Component {
  render() {
    return (
      <div data-testid="page-profile">
        <h1>Profile</h1>
        <Route path="/profile/edit">
          <ProfileEdit />
        </Route>
      </div>
    );
  }
}

export default Profile;
