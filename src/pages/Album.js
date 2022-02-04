import React, { Component } from 'react';
import Header from '../components/Header';
// import { Route, Switch } from 'react-router-dom';

class Album extends Component {
  render() {
    return (
      <div data-testid="page-album">
        <Header />
      </div>
    );
  }
}

export default Album;
