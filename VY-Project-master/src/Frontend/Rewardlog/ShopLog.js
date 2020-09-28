import React, { Component } from "react";
import {Modal} from 'react-bootstrap';
import fire from "../../config/fire";
import { db } from "../../config/fire"; 
import toaster from 'toasted-notes';
import '../Account/Account.css';

import {BrowserRouter as Router, Route, Link, Redirect, Switch } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Rewardlog from "./Rewardlog";
import {Table} from 'react-bootstrap';
import Design from '../images/design.png'

//shopLog: Will look for current user Records, will show the most recently buy.
class ShopLog extends Component{
    constructor(props) {
        super(props);
        this.state={
            user:'',
            email:'',
            name:'',
            userRecord:[],
            password:'',
            surname:null,
            country:'',
            phone:'',
            uid: {},
            show: false
        }
    }

    componentDidMount(){
        this.getUserProfile();
        }


    getUserProfile() {
        fire.auth().onAuthStateChanged((user) => {
        if (user) {
            db.collection('users').where('uid', '==', user.uid).get().then(snapshot => {
            snapshot.forEach( doc => {
                const data = doc.data()
                this.setState({email: data.email})
                this.setState({name: data.name})
                this.setState({password: data.password})
                this.setState({userRecord: data.userRecord})
            })
            console.log(snapshot)
            console.log(fire.auth().currentUser.uid)
            console.log(this.state.name)
            localStorage.setItem('user', user.uid);
        })} else {
            this.setState({ user: null });
            localStorage.removeItem('user');
            }
        });
    }

    render() {
        return(
            <main>
                 <Navbar expand="lg">
            <Navbar.Toggle className="border-0" aria-controls="navbar-toggle" />
            <Navbar.Collapse id="navbar-toggle">
              <Nav className="ml-auto">
              <Link className="nav-link" to="/Belønningslogg">Billeter</Link>
              <Link className="nav-link" to="/ShopLog">Belønningslogg</Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
            <div className="rewardlog-text">
                <h1>Belønningslogg</h1>
            </div>
            <p>Belønningslogg viser det siste kjøpet ditt på belønning siden. </p>
            <section class="presentation-1">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Dato</th>
                            <th>Belønning</th>
                            <th>VyPoints</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>{this.state.userRecord[2]}</td>
                            <td>{this.state.userRecord[1]}</td>
                            <td>- {this.state.userRecord[0]}</td>
                        </tr>
                    </tbody>
                </Table> 
                <div className="design-picutre">
                    <img src={Design} width="" alt="Design-main-image" />
                </div>   
            </section>
        </main>
        );
    }
}

export default ShopLog;
