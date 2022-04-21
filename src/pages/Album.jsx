import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

export default class Album extends Component {
  constructor() {
    super();
    this.state = {
      trackList: [],
      newTrackList: '',
      favorites: [],
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const retonoAPI = await getMusics(id);
    this.setState({
      trackList: retonoAPI.filter((e) => e.kind === 'song'),
      newTrackList: retonoAPI[0],
    });
    const retornoGet = await getFavoriteSongs();
    this.setState({
      favorites: retornoGet,
    });
  }

  render() {
    const { trackList, newTrackList, favorites } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <div data-testid="artist-name">
          { newTrackList.artistName }
        </div>
        <div data-testid="album-name">
          { newTrackList.collectionName }
        </div>
        <div>
          { trackList.map((trackMusic, index) => (<MusicCard
            key={ index }
            trackName={ trackMusic.trackName }
            previewUrl={ trackMusic.previewUrl }
            trackObj={ trackMusic }
            favorites={ favorites }
          />
          )) }
        </div>
      </div>);
  }
}

Album.propTypes = {
  match: PropTypes.string.isRequired,
  params: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
