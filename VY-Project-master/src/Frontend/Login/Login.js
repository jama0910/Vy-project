import React, { Component } from "react";
import {Modal} from 'react-bootstrap';
import '../Login/Login.css';
import fire from "../../config/fire";
import { db } from "../../config/fire"; // add
import info from '../images/info.png';
import toaster from 'toasted-notes';
import 'toasted-notes/src/styles.css';


class Login extends Component{
constructor(props) {
    super(props);
    this.state={
        user:'',
        email:'',
        password:'',
        name:'',
        vyPoints: 5000,
        uid: {},
        show: false,
        reset: false,
        isChecked: null,
        remember_email: '',
        remember_password: ""
    }
    this.login = this.login.bind(this);
    this.onChange = this.onChange.bind(this);
    this.signup = this.signup.bind(this);
    this.resetPassword = this.resetPassword.bind(this);
}

//The function prints out when we press submit button
login(e) {                   
    e.preventDefault();
        fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
            console.log(u)
            alert("Welcome " + this.state.email)
        }).catch((error) => {
            console.log(error);
            alert(error);
        });
}       

//onChange in the input, it sets the value of the input
onChange(e) {
    this.setState({[e.target.name]: e.target.value});        
    console.log(this.state);
}

//onSignup: Creates a user based on what the user write in the input. If user created, it connect with the database (coworkers)
signup(e) {
    e.preventDefault();
    fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
        db.settings({
            timestampsInSnapshots: true
        });
        db.collection('users').doc(u.user.uid).set({
            email: this.state.email,
            name: this.state.name,
            password: this.state.password,
            vyPoints: this.state.vyPoints,
            uid: u.user.uid
        });
        console.log(u)
        alert(this.state.email + " user is now registered")
    }).catch((error) => {
        console.log(error);
        alert(error);
    });
}

//changePassword: Send a change request to the firebase system for a change on the current user's password. But require re authorization if user is logged in for some time.
resetPassword(e) {
    e.preventDefault();
        var auth = fire.auth();
        var emailAddress = this.state.email;
    
        auth.sendPasswordResetEmail(emailAddress).then(function() {
            toaster.notify(<div>E-posten er sent, gå til inboksen for å endre passordet ditt</div>, {
                duration: 15000,
                 // Email sent.
        })
        }).catch(function(error) {
        // An error happened.
    });
}

showModal = () => {
    this.setState({show:true});
  };

  hideModal = () => {
    this.setState({show:false});
  };

  showModal_password_forgot = () => {
    this.setState({reset :true});
  };

  hideModal_password_forgot = () => {
    this.setState({reset:false});
  };

  info() {
    toaster.notify(<div>Vi kan sende deg et nytt passord i posten. Men av sikkerhetsmessige grunner kan vi kun sende ut passord hvis adressen du oppgir, stemmer overens med adressen vi har registret i systemet.</div>, {
        duration: 15000,
    })
  }

    render() {
        return(
            <div className="login_form">
            <form>
            <h3>Logg inn</h3>
            <p>Vennligst logg inn / opprett en profil for å komme i gang</p>

            <div className="form-group">
                <label>E-postadresse</label>
                <input type="email" className="form-control" value={this.state.email} name="email" placeholder="Skriv inn din e-postadresse" onChange={this.onChange}/>
            </div>

            <div className="form-group">
                <label>Passord</label>
                <input type="password" className="form-control" value={this.state.password} name="password" placeholder="Skriv inn ditt passord" onChange={this.onChange} />
            </div>

            <div className="form-group">
                <div className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input" id="customCheck1" onClick={this.rememberMe} />
                    <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                </div>
            </div>

                <button type="submit" className="btn btn btn-block" id="button_login" onClick={this.login}>Logg inn</button>
                </form>
            <div>
                <button className="btn btn btn-block" id="button_register"  onClick={()=>{this.showModal()}}>Opprett profil</button>
                <Modal show={this.state.show} >
                <Modal.Header>
                <Modal.Title>Opprett profil</Modal.Title>
                </Modal.Header>
                    <Modal.Body>
                    <form>
                    <div className="form-group"  >
                        <label>E-postadresse</label>
                        <input type="email" class="form-control" value={this.state.email} name="email"  placeholder="Email"  onChange={this.onChange}/>
                        </div>
                        <div className="form-group">
                        <label>Navn</label>
                        <input type="text" className="form-control my-input" value={this.state.name} name="name" placeholder="Navn" onChange={this.onChange}/>
                        </div>
                        <div className="form-group">
                        <label>Passord</label>
                        <input type="password" className="form-control my-input" value={this.state.password} name="password" placeholder="Skriv inn ditt passord" onChange={this.onChange} />
                        <small id="passwordHelp" class="text-danger">
                        Må være 6-20 tegn lange.
                        </small>   
                    </div>
                    </form>
                    </Modal.Body>
                <Modal.Footer>
                <button className="btn btn-primary" onClick={()=>{this.hideModal()}}>Avbryt</button>
                <button type="submit" className="btn btn" id='register' onClick={this.signup}>Opprett profil</button>
                </Modal.Footer>
            </Modal>
                <p className="forgot-password text-right">Glemt <a onClick={()=>{this.showModal_password_forgot()}}><b>passord?</b></a>
                <Modal show={this.state.reset} >
                <Modal.Header>
                <Modal.Title>Glemt passord <img id='info_button' src={info} width="20" height="20" onClick={this.info}></img></Modal.Title>
                </Modal.Header>
                    <Modal.Body>
                    <form>
                    <div className="form-group 2"  >
                        <label>E-postadresse</label>
                        <input type="email" class="form-control" value={this.state.email} name="email"  placeholder="Skriv inn din e-postadresse " onChange={this.onChange}/>
                        </div>
                    </form>
                    </Modal.Body>
                <Modal.Footer>
                <button className="btn btn-primary" onClick={()=>{this.hideModal_password_forgot()}}>Avbryt</button>
                <button type="submit" className="btn btn" id='register' onClick={this.resetPassword}>Be om nytt passord</button>
                </Modal.Footer>
            </Modal>
            </p>
            </div>
            </div>
        );
    }
}

export default Login;
