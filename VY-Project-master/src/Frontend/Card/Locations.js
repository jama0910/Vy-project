import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import React, {Component} from 'react';
import './Card-style.css';
import {BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import location from '../images/location.png';

//Google maps: API call from Google maps, let us see the map with markers.
class Locations extends Component {
  render() {
    return ( 
      <Map className="map" google={this.props.google}  zoom={13} initialCenter={{ 
        lat: 59.913868,
        lng: 10.752245}}
        >

        <Marker onClick={this.onMarkerClick}
                name={'Current location'} />

        <Marker
        title={'Narvesen'}
        name={'SOMA'}
        position={{lat: 59.910893, lng: 10.753183}} 
        icon={location}/>
          
        <Marker
        title={'Narvesen'}
        name={'SOMA'}
        position={{lat: 59.919220, lng: 10.789500}} 
        icon={location}
        />

        <Marker
        title={'Narvesen'}
        name={'SOMA'}
        position={{lat: 59.924676, lng: 10.750609}} 
        icon={location}
        />

        <Marker
        title={'Narvesen'}
        name={'SOMA'}
        position={{lat: 59.929610, lng: 10.842990}} 
        icon={location}
        />
 
        <InfoWindow onClose={this.onInfoWindowClose}>

        </InfoWindow>
        
        <Link className="nav-link col-md-4" id='close_button' to="/Belønninger">Close</Link>

      </Map>
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: ("AIzaSyAxINhxg-R3bwS0HJuU3Wymnc3odxgCeOs")
})(Locations)