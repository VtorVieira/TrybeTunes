import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';

const NUMBER_LOGIN = 3;
const NUMBER_SEARCH = 2;

class App extends React.Component {
  constructor() {
    super();
    this.onValidNameLogin = this.onValidNameLogin.bind(this);
    this.onValidNameSearch = this.onValidNameSearch.bind(this);
    this.pegaAPI = this.pegaAPI.bind(this);

    this.state = {
      name: '',
      loading: false,
      isValid: true,
    };
  }

  onValidNameLogin({ target }) {
    if (target.value.length >= NUMBER_LOGIN) {
      this.setState({
        name: target.value,
        isValid: false,
      });
    } else {
      this.setState({
        isValid: true,
      });
    }
  }

  onValidNameSearch({ target }) {
    if (target.value.length >= NUMBER_SEARCH) {
      this.setState({
        name: target.value,
        isValid: false,
      });
    } else {
      this.setState({
        isValid: true,
      });
    }
  }

  pegaAPI(booleano) {
    this.setState({
      loading: booleano,
    });
  }

  render() {
    const { name, isValid, loading } = this.state;
    return (
      <Switch>
        <Route
          exact
          path="/"
          render={ (props) => (<Login
            { ...props }
            validName={ this.onValidNameLogin }
            isValid={ isValid }
            name={ name }
            loading={ loading }
            pegaAPI={ this.pegaAPI }
          />) }
        />
        <Route
          path="/search"
          render={ (props) => (<Search
            { ...props }
            isValid={ isValid }
            name={ name }
            loading={ loading }
            pegaAPI={ this.pegaAPI }
            validNameSearch={ this.onValidNameSearch }
          />) }
        />
        <Route path="/album/:id" component={ Album } />
        <Route path="/favorites" component={ Favorites } />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/profile/edit" component={ ProfileEdit } />
        <Route component={ NotFound } />
      </Switch>
    );
  }
}

export default App;
