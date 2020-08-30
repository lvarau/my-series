import React from 'react';

import Header from './component/Header'
import Home from './component/Home'
import Series from './component/Series'
import NewSerie from './component/NewSerie'
import InfoSerie from './component/InfoSerie'
import Genres from './component/Genres'
import NewGenre from './component/NewGenre'
import EditGenre from './component/EditGenre'

import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/series' exact component={Series} />
        <Route path='/series/new' exact component={NewSerie} />
        <Route path='/series/:id'exact component={InfoSerie}/>
        <Route path='/genres' exact component={Genres} />
        <Route path='/genres/new'exact component={NewGenre} />
        <Route path='/genres/:id'exact component={EditGenre}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
