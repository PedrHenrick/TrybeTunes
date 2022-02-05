import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      album: {},
      music: [],
      loading: true,
      songFav: [],
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;

    const favs = await getFavoriteSongs();
    this.setState({ songFav: favs });

    const album = await getMusics(id);
    const colection = album[0];
    const songs = album.filter((_song, index) => index !== 0);
    this.setState({
      album: colection,
      music: songs,
      loading: false,
    });
  }

  addFavorites = async (song) => {
    // const { songFav } = this.state;
    this.setState((state) => ({
      loading: true,
      songFav: [...state.songFav, song],
    }));
    await addSong(song);
    this.setState({ loading: false });
  }

  renderPage = () => {
    const { album, music, songFav } = this.state;
    return (
      <section>
        <h3 data-testid="artist-name">{ album.artistName }</h3>
        <h3 data-testid="album-name">{ album.collectionName }</h3>
        { music.map((song) => (
          <MusicCard
            { ...song }
            checked={ songFav.some((favorite) => favorite.trackId === song.trackId) }
            addFavorites={ this.addFavorites }
            key={ song.trackId }
          />
        ))}
      </section>
    );
  }

  render() {
    const { loading } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        { loading ? <Loading /> : this.renderPage() }
        <Link to="/search">Voltar</Link>
      </div>
    );
  }
}

export default Album;

Album.propTypes = {
  match: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.bool,
  ]).isRequired,
};
