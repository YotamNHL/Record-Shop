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
      searchQuery: '',
      username: this.props.username,
      isP1Searched: true,
      isP2Searched: true,
      isP3Searched: true,
      isP4Searched: true,
      isP5Searched: true
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.searchOnChange = this.searchOnChange.bind(this);
    this.onClickItem = this.onClickItem.bind(this);
  }

  handleSearch = (event) => {
    let P1Name = "Crosley Recorder Crosley Supreme edition"
    let P2Name = "Crosley Recorder Crosley Ultra light edition"
    let P3Name = "Flatpack machine Flatpack Bluetooth enabled mode"
    let P4Name = "TurnTable Ice TurnTable Mclarence"
    let P5Name = "CompactDisc Coolz CompactDist Devices co."
    this.setState({
      isP1Searched: P1Name.toLowerCase().includes(this.state.searchQuery.toLowerCase()),
      isP2Searched: P2Name.toLowerCase().includes(this.state.searchQuery.toLowerCase()),
      isP3Searched: P3Name.toLowerCase().includes(this.state.searchQuery.toLowerCase()),
      isP4Searched: P4Name.toLowerCase().includes(this.state.searchQuery.toLowerCase()),
      isP5Searched: P5Name.toLowerCase().includes(this.state.searchQuery.toLowerCase())
    })
    console.log(this.state)
  }

  searchOnChange = (event) => {
    const { name, value } = event.target;
    this.setState({searchQuery: value}, function () {
      console.log(this.state.searchQuery);
      this.handleSearch();
    });
  }

  onClickItem = async (event) => {
    let id = event.target.id;
    let username = this.state.username
    let res = await axios.post("http://localhost:5000/addItemToCart", {
        username: username,
        itemId: id
      })
    toast.success('An item was added to your shopping cart!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  render() {
    const settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      pauseOnHover: true,
      draggable: false,
      arrows: false,
    };

    const imageP1 = require('../images/P1.png'); 
    const imageP2 = require('../images/P2.png'); 
    const imageP3 = require('../images/P3.png'); 
    const imageP4 = require('../images/P4.png'); 
    const imageP5 = require('../images/P5.png'); 
    

    let item1 = this.state.isP1Searched ? <div className='productItem'>
                                            <img src={imageP1} width='120px' height='110px' onClick={this.onClickItem} id='P1'/>
                                            <p><b>Crosley Recorder</b><br/>Crosley Supreme edition<br/>50$</p>
                                        </div> : null
    let item2 = this.state.isP2Searched ? <div className='productItem'>
                                              <img src={imageP2} width='120px' height='110px' onClick={this.onClickItem} id='P2'/>
                                              <p><b>Crosley Recorder</b><br/>Crosley Ultra light edition<br/>50$</p>
                                            </div> : null
    let item3 = this.state.isP3Searched ? <div className='productItem'>
                                                <img src={imageP3} width='120px' height='110px' onClick={this.onClickItem} id='P3'/>
                                                <p><b>Flatpack machine</b><br/>Flatpack Bluetooth enabled mode<br/>50$</p>
                                            </div>: null
    let item4 = this.state.isP4Searched ? <div className='productItem'>
                                            <img src={imageP4} width='120px' height='110px' onClick={this.onClickItem} id='P4'/>
                                            <p><b>TurnTable Ice</b><br/>TurnTable Mclarence<br/>50$</p>
                                        </div> : null
    let item5 = this.state.isP5Searched ?  <div className='productItem'>
                                            <img src={imageP5} width='120px' height='110px' onClick={this.onClickItem} id='P5'/>
                                            <p><b>CompactDisc Coolz</b><br/>CompactDist Devices co.<br/>50$</p>
                                          </div> : null


    return (
      <div>    
        <input type="text" id="fname" name="fname" placeholder="Example: Dark Side Of the moon" onChange={this.searchOnChange}/>
        <div
          style={{
            width: "800px",
            height: "100px",
            display: this.state.display ? "block" : "none"
          }}
        >
          <Slider {...settings}>
            {item1}
            {item2}
            {item3}
            {item4}
            {item5}  
          </Slider>
          <ToastContainer />
        </div>
      </div>
    );
  }
}