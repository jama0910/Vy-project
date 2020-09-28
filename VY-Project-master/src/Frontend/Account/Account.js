import React, { Component } from "react";
import {Modal} from 'react-bootstrap';
import '../Login/Login.css';
import fire from "../../config/fire";
import { db } from "../../config/fire"; 
import toaster from 'toasted-notes';
import 'toasted-notes/src/styles.css';
import '../Account/Account.css';
import AccountImage from '../images/account.png';


class Account extends Component{
    constructor(props) {
        super(props);
        this.state={
            user:'',
            email:'',
            name:'',
            history:[],
            password:'',
            surname:null,
            country:'',
            phone:'',
            uid: {},
            show: false
        }
        this.onChange = this.onChange.bind(this);
        this.updateUserName = this.updateUserName.bind(this);
        this.updateUserEmail = this.updateUserEmail.bind(this);
        this.updateUserPassword = this.updateUserPassword.bind(this);
        this.getUserProfile = this.getUserProfile.bind(this);
    }

    componentDidMount(){
        this.getUserProfile();
        }

    //onChange in the input, it sets the value of the input    
    onChange(e) {
        this.setState({[e.target.name]: e.target.value});        
        console.log(this.state);
    }

    //getUserProfile: Session remember the user, will get current user based on its UID (unique id). Updates frequently.
    getUserProfile() {
        fire.auth().onAuthStateChanged((user) => {
        if (user) {
            db.collection('users').where('uid', '==', user.uid).get().then(snapshot => {
            snapshot.forEach( doc => {
                const data = doc.data()
                this.setState({email: data.email})
                this.setState({name: data.name})
                this.setState({password: data.password})
                this.setState({history: data.history})
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

    updateUserName(e) {
        e.preventDefault();
        if (fire.auth().currentUser.uid) {
        db.collection('users').doc(fire.auth().currentUser.uid).update({
            name: this.state.name,
        });
        alert(this.state.name + " is now updated") 
    } else{
        alert(this.state.name + " user was not updated") 
    }
};

updateUserEmail(e) {
    e.preventDefault();
    fire.auth().currentUser.updateEmail(this.state.email).then((u)=>{
        db.collection('users').doc(fire.auth().currentUser.uid).update({
            email: this.state.email
        });
        console.log(u)
        alert(this.state.email + " is now updated")
    }).catch((error) => {
        console.log(error);
        alert('Feil: Denne operasjonen er sensitiv og krever nylig innlogging. Logg deg på igjen før du prøver på nytt denne forespørselen');
    });
}

updateUserPassword(e) {
    e.preventDefault();
    fire.auth().currentUser.updatePassword(this.state.password).then((u)=>{
        db.collection('users').doc(fire.auth().currentUser.uid).update({
            password: this.state.password
        });
        console.log(u)
        alert(this.state.email + " password is now updated")
    }).catch((error) => {
        console.log(error);
        alert(error);
    });
}




    showModal = () => {
        this.setState({show:true});
    };

    hideModal = () => {
        this.setState({show:false});
    };
    

    render() {
        return(
            <body class="account">
                <header>
                    <div className='profile_edit'>
                        <h3>Min profil</h3>
                        </div>
                        <div class="presentation-account">
                                <div class="account-input">
                                    <div className="form-group">
                                        <label>E-postadresse</label>
                                        <input type="email" className="form-control" value={this.state.email} name="email" placeholder={this.state.email} onChange={this.onChange}/>
                                        <button type="submit" className="btn btn" id='update_button' onClick={this.updateUserEmail}>Oppdater</button>
                                    </div>
                                    <div className="form-group">
                                        <label>Passord</label>
                                        <input type="password" className="form-control" value={this.state.password}  name="password" placeholder={this.state.password} onChange={this.onChange} />
                                        <button type="submit" className="btn btn" id='update_button' onClick={this.updateUserPassword}>Oppdater</button>
                                    </div>
                                    <div className="form-group">
                                        <label>Navn</label>
                                        <input type="Fornavn " className="form-control" value={this.state.name}  name="name"  placeholder={this.state.name} onChange={this.onChange} />
                                        <button type="submit" className="btn btn" id='update_button' onClick={this.updateUserName}>Oppdater</button>
                                    </div>
                                </div>
                            <div className="account-picture">
                                <img src={AccountImage} alt="account-image" />
                            </div>
                        </div>
                </header>
            </body>
        );
    }
}

export default Account;
