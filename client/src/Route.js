import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link,} from 'react-router-dom';
import App from './App';
import SingleLink from './components/SingleLink';
import Facebook from './components/Facebook';
import Google from './components/Google';

class Routing extends Component {
  render() {

    return (
        <Router>
          <Switch>
          <Route exact={true} path="/" component={App}/>
          <Route path="/SingleLink" component={SingleLink}/> 
          <Route path="/Facebook" component={Facebook}/> 
          <Route path="/Google" component={Google}/> 
          </Switch>
      </Router>
    );
  }
}

export default Routing;