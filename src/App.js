import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Redirect } from 'react-router'
import Login from './components/login';
import Main from './components/main';
import Callback from './components/callback';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      access_token: null                        
    }    
  }

  componentDidMount(){
    this.setState({ access_token: localStorage.getItem('access_token') });
  }
  render() {
    return (<Router>
            <div>
              <Route exact path="/" component={Login} />
              <Route path="/callback" component={Callback} />
              <Route path="/main" render={() => ( this.state.access_token ? <Main /> : <Redirect to="/"/>)} />
            </div>
          </Router>);

  }
}
export default App;