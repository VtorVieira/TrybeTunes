import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

export default class Album extends Component {
  constructor() {
    super();
    this.state = {
      trackList: [],
      newTrackList: '',
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const retonoAPI = await getMusics(id);
    this.setState({
      trackList: retonoAPI.filter((e) => e.kind === 'song'),
      newTrackList: retonoAPI[0],
    });
  }

  render() {
    const { trackList, newTrackList } = this.state;
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
            trackId={ trackMusic.trackId }
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
