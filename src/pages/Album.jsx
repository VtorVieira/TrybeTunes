import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import Header from '../components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Carregando from './Carregando';
import MusicCard from '../components/MusicCard';

export default class Album extends Component {
  constructor() {
    super();
    this.state = {
      newTrackList: '',
      trackList: [],
      loading: false,
      favorites: [],
    };
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.returnMusics(id);
    this.returnFavorites();
  }

  returnMusics = async (id) => {
    const retonoAPI = await getMusics(id);
    this.setState({
      trackList: retonoAPI.filter((e) => e.kind === 'song'),
      newTrackList: retonoAPI[0],
    });
  };

  returnFavorites = async () => {
    this.setState({
      loading: true,
    });
    const retornoGet = await getFavoriteSongs();
    this.setState({
      loading: false,
      favorites: retornoGet,

    });
  };

  render() {
    const { newTrackList, trackList, favorites, loading } = this.state;
    return (
      <div>
        <Header />
        {
          loading ? (<Carregando />) : (
            <div data-testid="page-album">

              <h3 data-testid="artist-name">
                { newTrackList.artistName }
              </h3>
              <h3 data-testid="album-name">
                { newTrackList.collectionName }
              </h3>
              { trackList.map((trackMusic, index) => (
                <MusicCard
                  key={ index }
                  trackName={ trackMusic.trackName }
                  trackId={ trackMusic.trackId }
                  previewUrl={ trackMusic.previewUrl }
                  favorites={ favorites }
                  trackObj={ trackMusic }
                />
              )) }

            </div>
          )
        }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};
