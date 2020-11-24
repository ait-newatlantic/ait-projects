import React from 'react'
import './style.css'
import slide1 from "../../../src/static/imgs/slide1.jpg"
import slide2 from "../../../src/static/imgs/slide2.jpg"
import slide3 from "../../../src/static/imgs/slide3.jpg"

export default function Slide(){
    return(
        <div>
            <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                <ol className="carousel-indicators">
                    <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                </ol>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                    <img className="d-block w-100" src={slide1} alt="First slide"/>
                    </div>
                    <div className="carousel-item">
                    <img className="d-block w-100" src={slide2} alt="Second slide"/>
                    </div>
                    <div className="carousel-item">
                    <img className="d-block w-100" src={slide3} alt="Third slide"/>
                    </div>
                </div>
                <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>
        </div>
    )
}