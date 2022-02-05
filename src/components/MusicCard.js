import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MusicCard extends Component {
  render() {
    const { trackName, previewUrl, trackId, addFavorites, checked } = this.props;
    return (
      <div>
        <h3>{ trackName }</h3>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code> audio </code>
          .
        </audio>
        <label htmlFor="check">
          Favorita
          <input
            type="checkbox"
            name="songFav"
            data-testid={ `checkbox-music-${trackId}` }
            checked={ checked }
            onChange={ () => addFavorites(this.props) }
          />
        </label>
      </div>
    );
  }
}

export default MusicCard;

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  addFavorites: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
};
