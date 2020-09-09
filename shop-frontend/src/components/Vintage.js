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
      isV1Searched: true,
      isV2Searched: true,
      isV3Searched: true,
      isV4Searched: true,
      isV5Searched: true
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.searchOnChange = this.searchOnChange.bind(this);
    this.onClickItem = this.onClickItem.bind(this);
  }

  handleSearch = (event) => {
    let V1Name = "Signed picture of Bob Saget"
    let V2Name = "Vintage unused YoYo"
    let V3Name = "Empty box"
    let V4Name = "Cat"
    let V5Name = "Discoball"
    this.setState({
      isV1Searched: V1Name.toLowerCase().includes(this.state.searchQuery.toLowerCase()),
      isV2Searched: V2Name.toLowerCase().includes(this.state.searchQuery.toLowerCase()),
      isV3Searched: V3Name.toLowerCase().includes(this.state.searchQuery.toLowerCase()),
      isV4Searched: V4Name.toLowerCase().includes(this.state.searchQuery.toLowerCase()),
      isV5Searched: V5Name.toLowerCase().includes(this.state.searchQuery.toLowerCase())
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

    const imageV1 = require('../images/V1.jpg'); 
    const imageV2 = require('../images/V2.jpg'); 
    const imageV3 = require('../images/V3.jpg'); 
    const imageV4 = require('../images/V4.jpg'); 
    const imageV5 = require('../images/V5.jpg'); 
    

    let item1 = this.state.isV1Searched ? <div className='productItem'>
                                            <img src={imageV1} width='120px' height='110px' onClick={this.onClickItem} id='V1'/>
                                            <p><b>Signed picture of Bob Saget</b><br/>Bob not included<br/>100$</p>
                                          </div> : null
    let item2 = this.state.isV2Searched ? <div className='productItem'>
                                            <img src={imageV2} width='120px' height='110px' onClick={this.onClickItem} id='V2'/>
                                            <p><b>Vintage unused YoYo</b><br/>I've never used it I swear<br/>100$</p>
                                          </div> : null
    let item3 = this.state.isV3Searched ? <div className='productItem'>
                                            <img src={imageV3} width='120px' height='110px' onClick={this.onClickItem} id='V3'/>
                                            <p><b>Empty box</b><br/>...or is it? buy to find out<br/>100$</p>
                                          </div> : null
    let item4 = this.state.isV4Searched ? <div className='productItem'>
                                            <img src={imageV4} width='120px' height='110px' onClick={this.onClickItem} id='V4'/>
                                            <p><b>Cat</b><br/>He won't like you though<br/>100$</p>
                                          </div>: null
    let item5 = this.state.isV5Searched ?  <div className='productItem'>
                                            <img src={imageV5} width='120px' height='110px' onClick={this.onClickItem} id='V5'/>
                                            <p><b>Discoball</b><br/>Is it vintage or retro?<br/>100$</p>
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





