import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MusicCard extends Component {
  render() {
    const { nome, value } = this.props;
    return (
      <div>
        <h3>{ nome }</h3>
        <audio data-testid="audio-component" src={ value } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code> audio </code>
          .
        </audio>
      </div>
    );
  }
}

export default MusicCard;

MusicCard.propTypes = {
  nome: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};
