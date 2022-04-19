import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

export default class Search extends Component {
  render() {
    const { isValid, validNameSearch } = this.props;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            data-testid="search-artist-input"
            type="text"
            onChange={ validNameSearch }
          />
          <button
            data-testid="search-artist-button"
            type="button"
            disabled={ isValid }
          >
            Pesquisar
          </button>
        </form>
      </div>);
  }
}

Search.propTypes = {
  isValid: PropTypes.bool.isRequired,
  validNameSearch: PropTypes.func.isRequired,
};
