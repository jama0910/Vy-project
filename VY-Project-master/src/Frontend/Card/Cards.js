import React, {Component} from 'react';
import Card from './CardUI';
import {Modal, Toast} from 'react-bootstrap';
import'./Card-style.css';
import fire from '../../config/fire';
import {db, auth} from '../../config/fire';
import MapContainer from '../../Frontend/Card/Locations';

import toaster from 'toasted-notes';
import 'toasted-notes/src/styles.css';
import Countdown from "react-countdown";
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import {BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';

import img1 from '../Card/Assets/tilbud-1.png';
import img2 from '../Card/Assets/coffee_opener.jpg';
import img3 from '../Card/Assets/tilbud-3.png';
import img4 from '../Card/Assets/tilbud-4.png';
import img5 from '../Card/Assets/tilbud-5.png';
import img6 from '../Card/Assets/vy-travel.jpg';
import img7 from '../Card/Assets/tilbud-7.png';
import img8 from '../Card/Assets/tilbud-8.png';
import img9 from '../Card/Assets/tilbud-9.png';
import img10 from '../Card/Assets/tilbud-10.png';
import img_qr_code from '../images/vy-QR-code.png';
import Locations from '../../Frontend/Card/Locations';

    class Cards extends Component {
        constructor(props) {
            super(props);
            this.state={
                show: false,
                show2: false,
                show3: false,
                show4: false,
                show5: false,
                show6: false,
                show7: false,
                show8: false,
                show9: false,
                show10: false,
                map: false,
                user: null,
                vyPoints: 0,
                shop1: null,
                reward_name: null,
                time: null,
                userRecord: []
        }
        this.handleShop = this.handleShop.bind(this);
        this.handlePromoCode = this.handlePromoCode.bind(this);
        }

        componentDidMount(){
            this.getUserProfile();

            setInterval(this.state.vyPoints, 6000); // runs every 5 seconds.
            }

        //getUserProfile: Session remember the user, will get current user based on its UID (unique id). Updates frequentl   
        getUserProfile() {
            fire.auth().onAuthStateChanged((user) => {
            if (user) {
                db.collection('users').where('uid', '==', user.uid).get().then(snapshot => {
                snapshot.forEach( doc => {
                    const data = doc.data()
                    this.setState({vyPoints: data.vyPoints})
                    console.log(this.state.vyPoints)
                })
                console.log(snapshot)
                console.log(fire.auth().currentUser.uid)
            })} else {
                this.setState({ user: null });
                localStorage.removeItem('user');
            }
            });
        }

        //handleShop: Check if the current user has enough vyPoints, by checking the database.
         handleShop() {   
            if (this.state.vyPoints >=  this.state.shop1) {
                db.settings({
                    timestampsInSnapshots: true
                });
            db.collection('users').doc(fire.auth().currentUser.uid).update({ 
            vyPoints: this.state.vyPoints - this.state.shop1,
            userRecord: {0: this.state.shop1, 1: this.state.reward_name, 2: this.state.time}
        });

        this.setState({vyPoints:this.state.vyPoints - this.state.shop1});
                ['top-left'].forEach(position => {
                    var timer =  <div><Countdown date={Date.now() + 300000} /></div> 
                    toaster.notify(<p>Du har løst opp denne belønningen! Skan denne qr koden til en butikk i nærheten, innen {timer}</p>, {
                    position,
                    duration: 300000,
                    
                    });
                    
                toaster.notify(<img src={img_qr_code} />,{
                        duration: 300000})  //5 minutes is like 1000 = 1sec
            });
 
            console.log(this.state.vyPoints)
            console.log(this.state.shop1)
            } else {
                toaster.notify(<div>Transaksjonen mislyktes</div>, {
                    duration: 3000,
                })
            }
        };

        //handlePromo: Does same, check if the current user has enough vyPoints, by checking the database.
        handlePromoCode() {
            if (this.state.vyPoints >=  this.state.shop1) {
                db.settings({
                    timestampsInSnapshots: true
                });
            db.collection('users').doc(fire.auth().currentUser.uid).update({ 
            vyPoints: this.state.vyPoints - this.state.shop1,
            userRecord: {0: this.state.shop1, 1: this.state.reward_name, 2: this.state.time}
        });
                ['top-left'].forEach(position => {
                    toaster.notify('Du har løst opp denne belønningen! Løs inn denne promokoden til leverandøren sine digitale tjenester, innen 5 minutter', {
                    position,
                    duration: 10000,
                    
                    });
                    var random = Math.floor(Math.random() * 1000 * 1000 * 1000) + 1;
                toaster.notify(<p>Din promokode:  {random}</p>,{
                        duration: 300000})  //5 minutes is like 1000 = 1sec
            });
            this.setState({vyPoints:this.state.vyPoints - this.state.shop1});
            console.log(this.state.vyPoints)
            console.log(this.state.shop1)
            } else {
                toaster.notify(<div>Transaksjonen feilet</div>, {
                    duration: 3000,
                })
            }
        };

      
    hide_maps = () => {
        this.setState({map:true});
      };
      
    showModal() {
        this.setState({show:true});
        this.setState({shop1: 1500});
        this.setState({reward_name: "Kaffe til 10kr på narvesen"});

        var d = new Date();
        var n = d.toLocaleString();
        this.setState({time: n});
      };

      hideModal = () => {
        this.setState({show:false});
      };

      showModal2 = () => {
        this.setState({show2:true});
        this.setState({shop1: 2500});
        this.setState({reward_name: "Gratis kaffe på narvesen"});

        var d = new Date();
        var n = d.toLocaleString();
        this.setState({time: n});
      };

      hideModal2 = () => {
        this.setState({show2:false});
      };

      showModal3 = () => {
        this.setState({show3:true});
        this.setState({shop1: 3500});
        this.setState({reward_name: "-50% for Nysmurt baguette på narvesen"});

        var d = new Date();
        var n = d.toLocaleString();
        this.setState({time: n});
      };

      hideModal3 = () => {
        this.setState({show3:false});
      };

      showModal4 = () => {
        this.setState({show4:true});
        this.setState({shop1: 4000});
        this.setState({reward_name: "Voi credits"});

        var d = new Date();
        var n = d.toLocaleString();
        this.setState({time: n});
      };

      hideModal4 = () => {
        this.setState({show4:false});
      };

      showModal5 = () => {
        this.setState({show5:true});
        this.setState({shop1: 4500});
        this.setState({reward_name: "Ruter voksenbillett (1 sone)"});

        var d = new Date();
        var n = d.toLocaleString();
        this.setState({time: n});
      };

      hideModal5 = () => {
        this.setState({show5:false});
      };

      showModal6 = () => {
        this.setState({show6:true});
        this.setState({shop1: 10000});
        this.setState({reward_name: "20 min: Din Bybil"});

        var d = new Date();
        var n = d.toLocaleString();
        this.setState({time: n});
      };

      hideModal6 = () => {
        this.setState({show6:false});
      };

      showModal7 = () => {
        this.setState({show7:true});
        this.setState({shop1: 10000});
        this.setState({reward_name: "Vy Togtur (verdi 100kr)"});

        var d = new Date();
        var n = d.toLocaleString();
        this.setState({time: n});
      };

      hideModal7 = () => {
        this.setState({show7:false});
      };

      showModal8 = () => {
        this.setState({show8:true});
        this.setState({shop1: 10000});
        this.setState({reward_name: "Vy Busstur (verdi 100kr)"});

        var d = new Date();
        var n = d.toLocaleString();
        this.setState({time: n});
      };

      hideModal8 = () => {
        this.setState({show8:false});
      };

      showModal9 = () => {
        this.setState({show9:true});
        this.setState({shop1: 12000});
        this.setState({reward_name: "Turistforeningen (15% rabatt på kjøp i nettbutikken)"});

        var d = new Date();
        var n = d.toLocaleString();
        this.setState({time: n});
      };

      hideModal9 = () => {
        this.setState({show9:false});
      };

      showModal10 = () => {
        this.setState({show10:true});
        this.setState({shop1: 15000});
        this.setState({reward_name: "Turistforeningen (20% på personlig medlemskap)"});

        var d = new Date();
        var n = d.toLocaleString();
        this.setState({time: n});
      };

      hideModal10 = () => {
        this.setState({show10:false});
      };

      showModal_qr_code = (props) => {
        this.setState({show7:true});
        return <h1>Welcome back!</h1>;
      };

      hideModal_qr_code = (props) => {
        this.setState({show7:false});
      };
      

    render() {
        return(
            <div className="cointainer">
                <div className="row">
                    <div className="col-md">
                            <Card imgsrc={img1} title="1500" text="Kaffe til 10kr på narvesen"/>
                            <div className='button_row'>
                                <button className="btn btn"  id="button_info" onClick={()=>{this.showModal()}}>Løs inn kupongen</button>
                                </div>
                            <div>
                                
                                <Modal show={this.state.show} >
                                <Modal.Header>
                                <Modal.Title id="myModal2" >
                                    <img class="d-block w-100"
                                        img src={img1}
                                        class="img-fluid" alt="">
                                    </img>
                                </Modal.Title>
                                </Modal.Header>
                                    <Modal.Body>
                                    <form>
                                        <div className="form-group">
                                            <h3>Kaffe til 10kr på narvesen</h3>
                                            <p>Utløper 31.12.2019      </p>
                                            
                                            <p>- Kun 1 kupong per kjøp! </p>
                                            <p>- Tilbudene kan brukes mellom 07-23, alle dager.</p>
                                
                                            <p><b> Når du trykker på "løs inn kupongen", har du 5 minutter på å aktivere kupongen!</b> </p> 
                               
                                    <Link className="nav-link-maps" to="/Locations">Finn en butikk i nærheten</Link>
                                    
                      
                                        </div>
                                    </form>
                                </Modal.Body>
                                <Modal.Footer>
                                <p id='wallet'><b>VyWallet: </b>{this.state.vyPoints}</p> 
                                    <button className="btn btn" id="button_cancel" onClick={()=>{this.hideModal()}}>Avbryt</button>
                                    <button type="submit" id="shop_coffe" className="btn btn" id="button_shop" onClick={this.handleShop} >Bruk 1500 vy points</button>
                                   
                                </Modal.Footer>
                            </Modal>
                        </div>
                        </div>
                        <div className="col-md">
                            <Card imgsrc={img2} title="2500" text="Gratis kaffe på narvesen"/>
                            <div className='button_row'>
                                <button className="btn btn" id="button_info" onClick={()=>{this.showModal2()}}>Løs inn kupongen</button>
                                </div>
                            <div>
                                
                                <Modal show={this.state.show2} >
                                <Modal.Header>
                                <Modal.Title id="myModal2" >
                                    <img class="d-block w-100"
                                        img src={img2}
                                        class="img-fluid" alt="">
                                    </img>
                                </Modal.Title>
                                </Modal.Header>
                                    <Modal.Body>
                                    <form>
                                        <div className="form-group">
                                            <h3>Gratis kaffe på narvesen</h3>
                                            <p>Utløper 31.12.2019      </p>
                                            <p>- Kun 1 kupong per kjøp! </p>
                                            <p>- Tilbudene kan brukes mellom 07-23, alle dager.</p>
                                
                                            <p><b> Når du trykker på "løs inn kupongen", har du 5 minutter på å aktivere kupongen!</b> </p> 
                                            <Link className="nav-link-maps" to="/Locations">Finn en butikk i nærheten</Link>
                                        </div>
                                    </form>
                                </Modal.Body>
                                <Modal.Footer>
                                <p id='wallet'><b>VyWallet: </b>{this.state.vyPoints}</p> 
                                    <button className="btn btn" id="button_cancel" onClick={()=>{this.hideModal2()}}>Avbryt</button>
                                    <button type="submit" id="shop_coffe" className="btn btn" id="button_shop" onClick={this.handleShop} >Bruk 2500 vy points</button>
                                   
                                </Modal.Footer>
                            </Modal>
                        </div>
                        </div>
                        <div className="col-md">
                            <Card imgsrc={img3} title="3500" text="-50% for Nysmurt baguette på narvesen"/>
                            <div className='button_row'>
                                <button className="btn btn" id="button_info" onClick={()=>{this.showModal3()}}>Løs inn kupongen</button>
                                </div>
                            <div>
                                
                                <Modal show={this.state.show3} >
                                <Modal.Header>
                                <Modal.Title id="myModal2" >
                                    <img class="d-block w-100"
                                        img src={img3}
                                        class="img-fluid" alt="">
                                    </img>
                                </Modal.Title>
                                </Modal.Header>
                                    <Modal.Body>
                                    <form>
                                        <div className="form-group">
                                            <h3>-50% for Nysmurt baguette på narvesen</h3>
                                            <p>Utløper 31.12.2019      </p>
                                            <p>- Kun 1 kupong per kjøp! </p>
                                            <p>- Tilbudene kan brukes mellom 07-23, alle dager.</p>
                                
                                            <p><b> Når du trykker på "løs inn kupongen", har du 5 minutter på å aktivere kupongen!</b> </p> 
                                            <Link className="nav-link-maps" to="/Locations">Finn en butikk i nærheten</Link>
                                        </div>
                                    </form>
                                </Modal.Body>
                                <Modal.Footer>
                                <p id='wallet'><b>VyWallet: </b>{this.state.vyPoints}</p> 
                                    <button className="btn btn" id="button_cancel" onClick={()=>{this.hideModal3()}}>Avbryt</button>
                                    <button type="submit" id="shop_coffe" className="btn btn" id="button_shop" onClick={this.handleShop} >Bruk 3500 vy points</button>
                                   
                                </Modal.Footer>
                            </Modal>
                        </div>
                        </div>
                        </div>
                        <div className="row">
                        <div className="col-md">
                            <Card imgsrc={img4} title="4000" text="Voi credits"/>
                            <div className='button_row'>
                                <button className="btn btn" id="button_info" onClick={()=>{this.showModal4()}}>Løs inn kupongen</button>
                                </div>
                            <div>
                                
                                <Modal show={this.state.show4} >
                                <Modal.Header>
                                <Modal.Title id="myModal2" >
                                    <img class="d-block w-100"
                                        img src={img4}
                                        class="img-fluid" alt="">
                                    </img>
                                </Modal.Title>
                                </Modal.Header>
                                    <Modal.Body>
                                    <form>
                                        <div className="form-group">
                                            <h3>Voi credits</h3>
                                            <p>Utløper 31.12.2019      </p>
                                            <p>- Kun 1 kupong per kjøp! </p>
                                            <p>- Tilbudene kan brukes mellom 07-23, alle dager.</p>
                                
                                            <p><b> Når du trykker på "løs inn kupongen", har du 5 minutter på å aktivere promokoden!</b> </p> 
                                            <Link className="nav-link-maps" to="/Locations">Finn en butikk i nærheten</Link>
                                        </div>
                                    </form>
                                </Modal.Body>
                                <Modal.Footer>
                                <p id='wallet'><b>VyWallet: </b>{this.state.vyPoints}</p> 
                                    <button className="btn btn" id="button_cancel" onClick={()=>{this.hideModal4()}}>Avbryt</button>
                                    <button type="submit" id="shop_coffe" className="btn btn" id="button_shop" onClick={this.handlePromoCode} >Bruk 4000 vy points</button>
                                   
                                </Modal.Footer>
                            </Modal>
                        </div>
                        </div>
                        <div className="col-md">
                            <Card imgsrc={img5} title="4500" text="Ruter voksenbillett (1 sone)"/>
                            <div className='button_row'>
                                <button className="btn btn" id="button_info" onClick={()=>{this.showModal5()}}>Løs inn kupongen</button>
                                </div>
                            <div>
                                
                                <Modal show={this.state.show5} >
                                <Modal.Header>
                                <Modal.Title id="myModal2" >
                                    <img class="d-block w-100"
                                        img src={img5}
                                        class="img-fluid" alt="">
                                    </img>
                                </Modal.Title>
                                </Modal.Header>
                                    <Modal.Body>
                                    <form>
                                        <div className="form-group">
                                            <h3>Ruter voksenbillett (1 sone)</h3>
                                            <p>Utløper 31.12.2019      </p>
                                            <p>- Kun 1 kupong per kjøp! </p>
                                            <p>- Tilbudene kan brukes mellom 07-23, alle dager.</p>
                                
                                            <p><b> Når du trykker på "løs inn kupongen", har du 5 minutter på å aktivere promokoden!</b> </p> 
                                        </div>
                                    </form>
                                </Modal.Body>
                                <Modal.Footer>
                                <p id='wallet'><b>VyWallet: </b>{this.state.vyPoints}</p> 
                                    <button className="btn btn" id="button_cancel" onClick={()=>{this.hideModal5()}}>Avbryt</button>
                                    <button type="submit" id="shop_coffe" className="btn btn" id="button_shop" onClick={this.handlePromoCode} >Bruk 4500 vy points</button>
                                   
                                </Modal.Footer>
                            </Modal>
                        </div>
                        </div>
                        <div className="col-md">
                            <Card imgsrc={img6} title="10000" text="20 min: Din Bybil"/>
                            <div className='button_row'>
                            <button className="btn btn" id="button_info" onClick={()=>{this.showModal6()}}>Løs inn kupongen</button>
                            </div>
                            <div>
                                
                                <Modal show={this.state.show6} >
                                <Modal.Header>
                                <Modal.Title id="myModal23" >
                                    <img class="d-block w-100"
                                        img src={img6}
                                        class="img-fluid" alt="">
                                    </img>
                                </Modal.Title>
                                </Modal.Header>
                                    <Modal.Body>
                                    <form>
                                        <div className="form-group">
                                            <h3>20 min: Din Bybil</h3>
                                            <p>Utløper 31.12.2019      </p>
                                            <p>- Kun 1 kupong per kjøp! </p>
                                            <p>- Tilbudene kan brukes mellom 07-23, alle dager.</p>
                                
                                            <p><b> Når du trykker på "løs inn kupongen", har du 5 minutter på å aktivere promokoden!</b> </p> 
                                            <Link className="nav-link-maps" to="/Locations">Finn en butikk i nærheten</Link>
                                        </div>
                                    </form>
                                </Modal.Body>
                                <Modal.Footer>
                                <p id='wallet'><b>VyWallet: </b>{this.state.vyPoints}</p> 
                                    <button className="btn btn" id="button_cancel" onClick={()=>{this.hideModal6()}}>Avbryt</button>
                                    <button type="submit" className="btn btn" id="button_shop" onClick={this.handlePromoCode}>Bruk 10000 vy points</button>
                                </Modal.Footer>
                            </Modal>
                        </div>
                        </div>
                        </div>
                        <div className="row">
                        <div className="col-md">
                            <Card imgsrc={img7} title="10000" text="Vy Togtur (verdi 100kr)"/>
                            <div className='button_row'>
                            <button className="btn btn" id="button_info" onClick={()=>{this.showModal7()}}>Løs inn kupongen</button>
                            </div>
                            <div>
                                
                                <Modal show={this.state.show7} >
                                <Modal.Header>
                                <Modal.Title id="myModal2" >
                                    <img class="d-block w-100"
                                        img src={img7}
                                        class="img-fluid" alt="">
                                    </img>
                                </Modal.Title>
                                </Modal.Header>
                                    <Modal.Body>
                                    <form>
                                        <div className="form-group">
                                            <h3>Vy Togtur (verdi 100kr)</h3>
                                            <p>Utløper 31.12.2019      </p>
                                            <p>- Kun 1 kupong per kjøp! </p>
                                            <p>- Tilbudene kan brukes mellom 07-23, alle dager.</p>
                                
                                            <p><b> Når du trykker på "løs inn kupongen", har du 5 minutter på å aktivere promokoden!</b> </p> 
                                            <Link className="nav-link-maps" to="/Locations">Finn en butikk i nærheten</Link>
                                        </div>
                                    </form>
                                </Modal.Body>
                                <Modal.Footer>
                                <p id='wallet'><b>VyWallet: </b>{this.state.vyPoints}</p> 
                                    <button className="btn btn" id="button_cancel" onClick={()=>{this.hideModal7()}}>Avbryt</button>
                                    <button type="submit" className="btn btn" id="button_shop" onClick={this.handlePromoCode}>Bruk 10000 vy points</button>
                                </Modal.Footer>
                            </Modal>
                        </div>
                        </div>
                        <div className="col-md">
                            <Card imgsrc={img8} title="10000" text="Vy Busstur (verdi 100kr)"/>
                            <div className='button_row'>
                            <button className="btn btn" id="button_info" onClick={()=>{this.showModal8()}}>Løs inn kupongen</button>
                            </div>
                            <div>
                                
                                <Modal show={this.state.show8} >
                                <Modal.Header>
                                <Modal.Title id="myModal2" >
                                    <img class="d-block w-100"
                                        img src={img8}
                                        class="img-fluid" alt="">
                                    </img>
                                </Modal.Title>
                                </Modal.Header>
                                    <Modal.Body>
                                    <form>
                                        <div className="form-group">
                                            <h3>Vy Busstur (verdi 100kr)</h3>
                                            <p>Utløper 31.12.2019      </p>
                                            <p>- Kun 1 kupong per kjøp! </p>
                                            <p>- Tilbudene kan brukes mellom 07-23, alle dager.</p>
                                
                                            <p><b> Når du trykker på "løs inn kupongen", har du 5 minutter på å aktivere promokoden!</b> </p> 
                                            <Link className="nav-link-maps" to="/Locations">Finn en butikk i nærheten</Link>
                                        </div>
                                    </form>
                                </Modal.Body>
                                <Modal.Footer>
                                <p id='wallet'><b>VyWallet: </b>{this.state.vyPoints}</p> 
                                    <button className="btn btn" id="button_cancel"  onClick={()=>{this.hideModal8()}}>Avbryt</button>
                                    <button type="submit" className="btn btn" id="button_shop" onClick={this.handlePromoCode}>Bruk 10000 vy points</button>
                                </Modal.Footer>
                            </Modal>
                        </div>
                        </div>
                        <div className="col-md">
                            <Card imgsrc={img9} title="12000" text="Turistforeningen (15% rabatt på kjøp i nettbutikken)"/>
                            <div className='button_row'>
                            <button className="btn btn" id="button_info" onClick={()=>{this.showModal9()}}>Løs inn kupongen</button>
                            </div>
                            <div>
                                
                                <Modal show={this.state.show9} >
                                <Modal.Header>
                                <Modal.Title id="myModal2" >
                                    <img class="d-block w-100"
                                        img src={img9}
                                        class="img-fluid" alt="">
                                    </img>
                                </Modal.Title>
                                </Modal.Header>
                                    <Modal.Body>
                                    <form>
                                        <div className="form-group">
                                            <h3>Turistforeningen (15% rabatt på kjøp i nettbutikken)</h3>
                                            <p>Utløper 31.12.2019      </p>
                                            <p>- Kun 1 kupong per kjøp! </p>
                                            <p>- Tilbudene kan brukes mellom 07-23, alle dager.</p>
                                
                                            <p><b> Når du trykker på "løs inn kupongen", har du 5 minutter på å aktivere promokoden!</b> </p> 
                                        </div>
                                    </form>
                                </Modal.Body>
                                <Modal.Footer>
                                <p id='wallet'><b>VyWallet: </b>{this.state.vyPoints}</p> 
                                    <button className="btn btn" id="button_cancel" onClick={()=>{this.hideModal9()}}>Avbryt</button>
                                    <button type="submit" className="btn btn" id="button_shop"  onClick={this.handlePromoCode}>Bruk 12000 vy points</button>
                                </Modal.Footer>
                            </Modal>
                        </div>
                        </div>
                        </div>
                        <div className='row'>
                        <div className="col-md">
                            <Card imgsrc={img10} title="15000" text="Turistforeningen (20% på personlig medlemskap)"/>
                            <div className='button_row'>
                            <button className="btn btn" id="button_info" onClick={()=>{this.showModal10()}}>Løs inn kupongen</button>
                            </div>
                            <div>
                                
                                <Modal show={this.state.show10} >
                                <Modal.Header>
                                <Modal.Title id="myModal2" >
                                    <img class="d-block w-100"
                                        img src={img10}
                                        class="img-fluid" alt="">
                                    </img>
                                </Modal.Title>
                                </Modal.Header>
                                    <Modal.Body>
                                    <form>
                                        <div className="form-group">
                                            <h3>Turistforeningen (20% på personlig medlemskap)</h3>
                                            <p>Utløper 31.12.2019      </p>
                                            <p>- Kun 1 kupong per kjøp! </p>
                                            <p>- Tilbudene kan brukes mellom 07-23, alle dager.</p>
                                
                                            <p><b> Når du trykker på "løs inn kupongen", har du 5 minutter på å aktivere promokoden!</b> </p> 
                                        </div>
                                    </form>
                                </Modal.Body>
                                <Modal.Footer>
                                <p id='wallet'><b>VyWallet: </b>{this.state.vyPoints}</p> 
                                    <button className="btn btn" id="button_cancel" onClick={()=>{this.hideModal10()}}>Avbryt</button>
                                    <button type="submit" className="btn btn" id="button_shop" onClick={this.handlePromoCode}>Bruk 15000 vy points</button>
                                </Modal.Footer>
                            </Modal>
                        </div>
                    </div>
                    <div className='col-md'></div>
                        <div className='col-md'></div>
                </div>
            </div>
        );
    }
}

//Google maps api key
export default GoogleApiWrapper({
    apiKey: ("AIzaSyAxINhxg-R3bwS0HJuU3Wymnc3odxgCeOs")
  })(Cards)