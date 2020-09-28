import React from 'react';
import'./Card-style.css';
import Cards from './Cards';

const Card = props =>{
    return (
        <div className="card text-center">
        <div className="overflow">
            <img src={props.imgsrc} alt="Image 1" className="card-img-top"/>
            </div>
            <div className="card-body text-dark">
                <h4 className="card-title">{props.title}</h4>
                <p className="card-text text-secondary">{props.text}</p>
            </div>
        </div>
    );
}

export default Card;