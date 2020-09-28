import React, { useRef, useEffect } from 'react';
import Women from '../images/women.png';
import '../Vypoints/Vypoints.css';
import Card from '../Card/CardUI.js';
import {BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import {TweenMax, Power3} from 'gsap';

import Voi from '../images/voi.png';
import Ruter from '../images/Ruter.png';
import Turist from '../images/turistforeningnen.png';

function Vypoints(props) {
    let textItemvy = useRef(null);
    let textItemvy2 = useRef(null);
    let textItemvy3 = useRef(null);
    let btnItemvy = useRef(null);

    useEffect(() => {
        console.log(textItemvy)
        TweenMax.to(
            textItemvy,
            .8,
            {
                opacity: 1,
                y: -20,
                ease: Power3.easeOut,
                delay: .2
            }
        )
        TweenMax.to(
            textItemvy2,
            .8,
            {
                opacity: 1,
                y: -20,
                ease: Power3.easeOut,
                delay: .2
            }
        )
        TweenMax.to(
            btnItemvy,
            .8,
            {
                opacity: 1,
                y: -20,
                ease: Power3.easeOut,
                delay: .3
            }
        )
        TweenMax.to(
            textItemvy3,
            .8,
            {
                opacity: 1,
                y: -20,
                ease: Power3.easeOut,
                delay: .5
            }
        )
    }, [])

    return (
        <body>
            <header>
                <div class="content">
                    <div class="main-text">
                        <h1
                         ref={el => {textItemvy = el}}>Hva er VYP? </h1>
                        <p
                        ref={el => {textItemvy2 = el}}>
                        Vy Poeng tjenes opp for hver reise du gjennomfører med en av Vy sine transportmidler. Hver krone du bruker på å reise miljøvennlig hos oss gir deg 10 VYP. 
                        Disse poengene kan brukes på nye grønne reiser og tilbud hos våre samarbeidspartnere. 
                        Tjenesten er helt gratis å ta i bruk og alle nye registreringer belønnes med 5000 poeng i velkomstbonus. 
                        </p>
                        <div class="button-vy">
                            <Link className="nav-link" to="/Belønninger">
                                <button
                                ref={el => {btnItemvy = el}}
                                className="btn-vy">Kom i gang</button>
                            </Link>
                        </div>
                    </div>
                    <div className="main-picutre-illustration">
                        <img src={Women} alt="" />
                    </div>
                </div>
                <section class="vy-points-section">
                    <div class="second-text">
                        <h1
                        ref={el => {textItemvy3 = el}}>Våre partnere</h1>
                    </div>
                        <div className="row">
                            <div className="col-md">
                                <Card imgsrc={Voi} title="Voi" text="En av våre stolte partnere" />
                            </div>
                            <div className="col-md">
                                <Card imgsrc={Ruter} title="Ruter" text="En av våre stolte partnere" />
                            </div>
                            <div className="col-md">
                                <Card imgsrc={Turist} title="Den Norske Turistforening" text="En av våre stolte partnere" />
                            </div>
                        </div>
                </section>
            </header>
        </body>    
    );

}

export default Vypoints;