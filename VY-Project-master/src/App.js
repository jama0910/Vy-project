import React from 'react';
import {BrowserRouter as Router, Route, Link, Redirect, Switch } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import './App.css';
import Homepage from './Frontend/Homepage/Homepage';
import Cards from './Frontend/Card/Cards';
import Rewardlog from './Frontend/Rewardlog/Rewardlog';
import Account from './Frontend/Account/Account';
import Login from './Frontend/Login/Login';
import User from './Frontend/Login/User';
import VyPoints from './Frontend/Vypoints/Vypoints'
import fire from './config/fire';
import { db } from "./config/fire"; 
import Logo from './Frontend/images/vy.logo.png'
import ShopLog from './Frontend/Rewardlog/ShopLog';
import Locations from './Frontend/Card/Locations';


class App extends React.Component {

constructor(props) {
  super(props);
  this.state = {
    user: {},
    hidden: true,
    name:'',
    vyPoints: 0,
    title: "VY Miljø",
    headerLinks: [
      { title: 'Hjem', path: '/'},
      { title: 'Belønninger', path: '/'},
      { title: 'Belønningslogg', path: '/'},
      { title: 'Konto', path: '/'}
    ],

    Hjem: {
      title: 'Vy stuff',
      text: 'bro'
    },

    Belønninger: {
      title: 'Vy stuff',
      text: 'Belønninger'
    },

    Belønningslogg: {
      title: 'Vy stuff',
      text: 'Belønningslogg'
    },

    Konto: {
      title: 'Vy stuff',
      text: 'Konto'
    }
  }
  
  this.authListener = this.authListener.bind(this);
  this.logout = this.logout.bind(this);
}


componentDidMount() {
  this.authListener();
}

authListener() {
  fire.auth().onAuthStateChanged((user) => {
    console.log(user);
    if (user) {
      this.setState({ user });
      localStorage.setItem('user', user.uid);
      this.setState({hidden: false });
    } else {
      this.setState({ user: null });
      localStorage.removeItem('user');
    }
  });
}


logout() {
  fire.auth().signOut();
  if (false) {
    this.setState({hidden: false });
  } else {
    this.setState({hidden: true });
  }
}

  render () {
    return (
      <Router>
        <Container className="p-0" fluid={true}>

          <Navbar expand="lg">
            <Link className="nav-link" to="/">
              <Navbar.Brand><img src={Logo} width="150" alt="logo-main" /></Navbar.Brand>
            </Link>

            <Navbar.Toggle className="border-0" aria-controls="navbar-toggle" />
            <Navbar.Collapse id="navbar-toggle">
              <Nav className="ml-auto">
              <Link className="nav-link" to="/">Hjem</Link>
                <Link className="nav-link" to="/Belønninger">Belønninger</Link>
                <Link className="nav-link" to="/Belønningslogg">Belønningslogg</Link>
                <Link className="nav-link" to="/Konto">Konto</Link>
                <button className="btn btn-link" hidden={this.state.hidden} onClick={this.hideLogOut} onClick={this.logout}>LOGOUT</button>
                
             
              </Nav>
            </Navbar.Collapse>
          </Navbar>

          <Switch>
        <Route path="/" exact render={() => <Homepage/>} />
        <Route path="/VyPoints" exact render={() => <VyPoints/>} />
        <div>{this.state.user ? ( <User/>) : (<Login />)}</div>
    
        </Switch>

        <Route path="/Locations" exact strict render={({match})=>( 
          this.state.user ? ( <Locations username={match.params.username}/>) : (<Redirect to='/Locations' />)
        )}/>

        <Route path="/ShopLog" exact strict render={({match})=>( 
          this.state.user ? ( <ShopLog username={match.params.username}/>) : (<Redirect to='/ShopLog' />)
        )}/>

        <Route path="/Belønninger" exact strict render={({match})=>( 
          this.state.user ? ( <Cards username={match.params.username}/>) : (<Redirect to='/Belønninger' />)
        )}/>
        <Route path="/Belønningslogg" exact strict render={({match})=>(
          this.state.user ? ( <Rewardlog username={match.params.username}/>) : (<Redirect to='/Belønningslogg' />)
        )}/>
        <Route path="/Konto" exact strict render={({match})=>(
          this.state.user ? ( <Account username={match.params.username}/>) : (<Redirect to='/Konto' />)
        )}/>

  
        </Container>
      </Router>
      
    );
  }
}

export default App;


