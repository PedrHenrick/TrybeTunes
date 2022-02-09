import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

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

  checkTheCheck = async (song) => {
    if (!song.checked) {
      this.setState((state) => ({
        loading: true,
        songFav: [...state.songFav, song],
      }));
      await addSong(song);
      this.setState({ loading: false });
    } else {
      this.setState({ loading: true });
      await removeSong(song);

      const favs = await getFavoriteSongs();
      this.setState({ loading: false, songFav: favs });
    }
  }

  renderPage = () => {
    const { album, music, songFav } = this.state;
    console.log(album);
    return (
      <section className="songsContain">
        <section className="albumCardClicked">
          <img
            src={ album.artworkUrl100 }
            alt={ `Foto do album ${album.collectionName}` }
          />
          <h3 className="artistName" data-testid="artist-name">{ album.artistName }</h3>
          <h3 className="albumName" data-testid="album-name">{ album.collectionName }</h3>
        </section>
        <section className="songList">
          { music.map((song) => (
            <MusicCard
              trackName={ song.trackName }
              previewUrl={ song.previewUrl }
              trackId={ parseInt(song.trackId, 10) }
              checked={ songFav.some((favorite) => favorite.trackId === song.trackId) }
              checkTheCheck={ this.checkTheCheck }
              key={ parseInt(song.trackId, 10) }
            />
          ))}
        </section>
      </section>
    );
  }

  render() {
    const { loading } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        { loading ? <Loading /> : this.renderPage() }
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
