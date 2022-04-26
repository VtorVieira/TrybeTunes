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

  componentDidMount() { // iniciando o component chamando as funcoes
    const { match: { params: { id } } } = this.props;
    this.returnMusics(id); // passando o parametro recebido da props do Router
    this.returnFavorites(); // chamada da funcação para pegar as favoritas, esta no did, pois precisa chegar todas vez que entrar no componente
  }

  returnMusics = async (id) => {
    const retonoAPI = await getMusics(id); // pegando as musicas da API após a requisicao
    this.setState({
      trackList: retonoAPI.filter((e) => e.kind === 'song'), // Filter para "cortar" o primeiro elmento
      newTrackList: retonoAPI[0], // passando a posicao 0 para pegar apenas o primeiro elemento
    });
  };

  returnFavorites = async () => {
    this.setState({
      loading: true, // add carregando
    });
    const retornoGet = await getFavoriteSongs(); // pegando as favoritas da API após a requisicao
    this.setState({
      loading: false, // remove carregando
      favorites: retornoGet, // Gravando o retorno dentro do state favorites, que são as musicas favoritas
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
