import React, { Component } from "react";
import Slider from "react-slick";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios';




export default class Records extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: true,
    };
  }

  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      pauseOnHover: true,
      lazyLoad: true,
      draggable: false,
      arrows: false
    };

    const onClickRecord = async (event) => {
      let id = event.target.id;
      console.log(username)
      let res = await axios.post("http://localhost:5000/addItemToCart", {
          username: username,
          itemId: id
        })
      toast.success('An item was added to your shopping cart! you got' + String(res.data), {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

    const imageR1 = require('../images/records/R1.jpg');
    const imageR2 = require('../images/records/R2.jpg');
    const imageR3 = require('../images/records/R3.jpg');
    const imageR4 = require('../images/records/R4.jpg');
    const imageR5 = require('../images/records/R5.jpg');

    let username = this.props.username;

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
            <div className='productItem'>
                <img src={imageR1} width='165px' height='150px' onClick={onClickRecord} id='R1'/>
                <p><b>Pink Floyd</b><br/>Dark Side of the Moon</p>
            </div>
            <div className='productItem'>
              <img src={imageR2} width='165px' height='150px' onClick={onClickRecord} id='R2'/>
              <p><b>Metallica</b><br/>And Justice For All</p>
            </div>
            <div className='productItem'>
              <img src={imageR3} width='165px' height='150px' onClick={onClickRecord} id='R3'/>
              <p><b>Dream Theater</b><br/>Scence from a Memory</p>
            </div>
            <div className='productItem'>
              <img src={imageR4} width='165px' height='150px' onClick={onClickRecord} id='R4'/>
              <p><b>Hail Stan</b><br/>Periphery</p>
            </div>
            <div className='productItem'>
              <img src={imageR5} width='165px' height='150px' onClick={onClickRecord}/>
              <p><b>Toxicity</b><br/>System of a Down</p>
            </div>
          </Slider>
          <ToastContainer />
        </div>
      </div>
    );
  }
}