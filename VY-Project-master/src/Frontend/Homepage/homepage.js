import React, {useRef, useEffect} from 'react';
import Thinking from '../images/thinking.png';
import '../Homepage/Homepage.css';
import VyPoints from '../Vypoints/Vypoints'

import {BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import Cards from '../Card/Cards.js';

import {TweenMax, Power3} from 'gsap';

function Homepage(props) {
    let textItem = useRef(null);
    let textItem2 = useRef(null);
    let textItem3 = useRef(null);
    let btnItem = useRef(null);

    useEffect(() => {
        console.log(textItem)
        TweenMax.to(
            textItem,
            .8,
            {
                opacity: 1,
                y: -20,
                ease: Power3.easeOut,
                delay: .2
            }
        )
        TweenMax.to(
            textItem2,
            .8,
            {
                opacity: 1,
                y: -20,
                ease: Power3.easeOut,
                delay: .2
            }
        )
        TweenMax.to(
            textItem3,
            .8,
            {
                opacity: 1,
                y: -20,
                ease: Power3.easeOut,
                delay: .3
            }
        )
        TweenMax.to(
            btnItem,
            .8,
            {
                opacity: 1,
                y: -20,
                ease: Power3.easeOut,
                delay: .4
            }
        )
    }, [])

    return (
        <main>
            <section class="presentation">
                <div className="introduction">
                    <div className="main-text-homepage">
                        <h1 
                        ref={el => {textItem = el}}>    
                        Bli belønnet </h1>
                        <h1
                        ref={el => {textItem2 = el}}>
                        av å reise.</h1> 
                        <p
                        ref={el => {textItem3 = el}}>
                        Vy Miljø gir deg en virtuell valuta som belønner kollektiv og miljøvennlig transkort. 
                        Dette gir deg mulighet til å tjene opp grønne premier og tilbud.
                        </p>
                    </div>
                    <div class="button">
                    <Link className="nav-link" to="/VyPoints">
                    <button 
                    ref={el => {btnItem = el}}
                    className="btn-vy-start">Lær mer</button>
                    </Link>
                    </div>
                </div>
                <div className="main-picutre">
                    <img 
                    src={Thinking} width="" alt="thinking-main-image" />
                </div>
            </section>
            <section>
                <div>

                </div>
            </section>
        </main>
    );
    
}

export default Homepage;