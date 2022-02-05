import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      check: false,
    };
  }

  addFavorites = async () => {
    const { check } = this.state;
    const { id } = this.props;

    if (!check) {
      this.setState({ loading: true, check: true });
      await addSong(id);
      this.setState({ loading: false });
    } else this.setState({ check: false });
  }

  render() {
    const { loading, check } = this.state;
    const { nome, value, id } = this.props;
    const loadingElement = <h2>Carregando...</h2>;
    return (
      <div>
        <h3>{ nome }</h3>
        <audio data-testid="audio-component" src={ value } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code> audio </code>
          .
        </audio>
        <label htmlFor="check">
          Favorita
          <input
            type="checkbox"
            data-testid={ `checkbox-music-${id}` }
            checked={ check }
            onChange={ this.addFavorites }
          />
        </label>
        { loading ? loadingElement : null }
      </div>
    );
  }
}

export default MusicCard;

MusicCard.propTypes = {
  nome: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};
