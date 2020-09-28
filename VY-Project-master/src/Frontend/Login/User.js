import React, { Component } from 'react';
import fire from '../../config/fire';
import '../Login/User.css';
import {db, auth} from '../../config/fire';
import {authListener} from '../../App';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';


class User extends Component {
    constructor(props) {
        super(props);
        this.state={
            user: null,
            name: null,
            vyPoints: 0
        }
        this.getUserProfile = this.getUserProfile.bind(this);

    }

  componentDidMount(){
    this.getUserProfile();

    setInterval(this.getUserProfile, 1000)
    }

    getUserProfile() {
      fire.auth().onAuthStateChanged((user) => {
      if (user) {
          db.collection('users').where('uid', '==', user.uid).get().then(snapshot => {
          snapshot.forEach( doc => {
              const data = doc.data()
              this.setState({name: data.name})
              this.setState({vyPoints: data.vyPoints})
          })
          localStorage.setItem('user', user.uid);
      })} else {
          this.setState({ user: null });
          localStorage.removeItem('user');
          }
      });
  }
      
    render() {
        return (
         <div className="col-md-0">
           <form>
                    <p>Velkommen {
                         <div>
                             <h3><b>{this.state.name}</b></h3>
                             <p><b>VyWallet:</b> {this.state.vyPoints}</p>
                             </div>
                        }</p>
                    </form>
                       
        </div>        

        );
    }
}



export default User;