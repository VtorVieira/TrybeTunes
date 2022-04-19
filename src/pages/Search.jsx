import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Carregando from './Carregando';

export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      loadingSearch: false,
      albumList: [],
      name: '',
      nameArtist: '',
    };
    this.enviaAPI = this.enviaAPI.bind(this);
    this.validNameSearch = this.validNameSearch.bind(this);
  }

  validNameSearch({ target }) {
    this.setState({
      name: target.value,
    });
  }

  enviaAPI() {
    const { name } = this.state;
    this.setState({
      loadingSearch: true,
    }, async () => {
      const retornoAPI = await searchAlbumsAPI(name);
      this.setState((prevState) => ({
        albumList: retornoAPI,
        loadingSearch: false,
        nameArtist: prevState.name,
        name: '',
      }));
    });
  }

  render() {
    const { albumList, loadingSearch, name, nameArtist } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            data-testid="search-artist-input"
            type="text"
            value={ name }
            onChange={ this.validNameSearch }
          />
          <button
            data-testid="search-artist-button"
            type="button"
            disabled={ name.length < 2 }
            onClick={ () => this.enviaAPI() }
          >
            Pesquisar
          </button>
        </form>
        <div>
          { loadingSearch && <Carregando /> }
          <h2>{ `Resultado de álbuns de: ${nameArtist}` }</h2>
          { albumList.length < 1 ? 'Nenhum álbum foi encontrado'
            : albumList.map((element, index) => (
              <div
                key={ index }
              >
                <Link
                  data-testid={ `link-to-album-${element.collectionId}` }
                  to={ `/album/${element.collectionId}` }
                >
                  <img src={ element.artworkUrl100 } alt="Foto do album" />
                  <p>{ element.collectionName }</p>
                  <p>{ element.artistName }</p>
                </Link>
              </div>
            )) }
        </div>
      </div>);
  }
}
