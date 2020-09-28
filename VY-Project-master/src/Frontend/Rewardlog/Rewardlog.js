import React from 'react';
import Design from '../images/design.png'
import '../Rewardlog/Rewardlog.css'
import {BrowserRouter as Router, Route, Link, Redirect, Switch } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import {Table} from 'react-bootstrap';
import ShopLog from './ShopLog';

function Rewardlog(props) { 


    return (     
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

                <h1>Antall turer kjørt: 4</h1>
               
            </div>
            <section class="presentation-1">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Dato</th>
                            <th>Tur</th>
                            <th>VyPoints</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>9. desember 2019</td>
                            <td>Drammen - Oslo S</td>
                            <td>+ points 800</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>15. november 2019</td>
                            <td>Drammen - Oslo S</td>
                            <td>+ points 800</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>4. november 2019</td>
                            <td>Mjøndalen - Oslo S</td>
                            <td>+ points 800</td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td>4. september 2019</td>
                            <td>Drammen - Oslo S</td>
                            <td>+ points 800</td>
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

export default Rewardlog