import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


export default class Resizable extends Component {
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
              <img src="https://images-na.ssl-images-amazon.com/images/I/81aTawcGdmL._AC_SL1500_.jpg" width='165px' height='150px'/>
              <p><b>Pink Floyd</b><br/>Dark Side of the Moon</p>
            </div>
            <div>
              <img src="https://blob.cede.ch/catalog/16376000/16376016_1_92.jpg" width='165px' height='150px'/>
              <p><b>Metallica</b><br/>And Justice For All</p>
            </div>
            <div>
              <img src="https://images-na.ssl-images-amazon.com/images/I/71iJQ1MtrYL._SL1445_.jpg" width='165px' height='150px'/>
              <p><b>Dream Theater</b><br/>Scence from a Memory</p>
            </div>
            <div>
              <img src="https://upload.wikimedia.org/wikipedia/en/thumb/8/88/Periphery_IV_Hail_Stan.jpg/220px-Periphery_IV_Hail_Stan.jpg" width='165px' height='150px'/>
            </div>
            <div>
              <img src="https://media.pitchfork.com/photos/5be49b50e3127e7c99e03cab/1:1/w_600/system%20of%20a%20down_toxicity.jpg" width='165px' height='150px'/>
            </div>
            <div>
              <h3>6</h3>
            </div>
          </Slider>
        </div>
      </div>
    );
  }
}