import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


export default class RecordPlayers extends Component {
  state = {
    display: true,
  };
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      pauseOnHover: true,
      lazyLoad: true
    };
    return (
      <div>    
        <div
          style={{
            width: "800px",
            height: "100px",
            display: this.state.display ? "block" : "none"
          }}
        >
          <Slider {...settings}>
            <div>
                <img src="https://www.pngitem.com/pimgs/m/71-715393_crosley-turntable-deck-record-player-transparent-png-png.png" width='165px' height='150px'/>
                <p><b>Cr8005a Record Player</b><br/>Crosley Cruiser</p>
            </div>
            <div>
                <img src="https://www.seekpng.com/png/full/151-1515364_crosley-executive-record-player-crosley-executive-show-crosley.png" width='165px' height='150px'/>
                <p><b>Crosley Executive</b><br/>Crosley Cruiser</p>
            </div>
            <div>
                <img src="https://snipstock.com/assets/cdn/png/b57c6d516daa834d5d7932a91d206a5b.png" width='165px' height='150px'/>
                <p><b>Classic Phono</b><br/>Recorders Thogs IE</p>
            </div>
            <div>
                <img src="https://www.pngfind.com/pngs/m/654-6545729_turntable-record-player-crosley-cruiser-cr8005d-hd-png.png" width='165px' height='150px'/>
            </div>
            <div>
                <img src="https://upload.wikimedia.org/wikipedia/en/thumb/8/88/Periphery_IV_Hail_Stan.jpg/220px-Periphery_IV_Hail_Stan.jpg" width='165px' height='150px'/>
            </div>
          </Slider>
        </div>
      </div>
    );
  }
}