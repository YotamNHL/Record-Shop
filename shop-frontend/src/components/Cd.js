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
      isC1Searched: true,
      isC2Searched: true,
      isC3Searched: true,
      isC4Searched: true,
      isC5Searched: true
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.searchOnChange = this.searchOnChange.bind(this);
    this.onClickItem = this.onClickItem.bind(this);
  }

  handleSearch = (event) => {
    let C1Name = "10,000 Days TOOL"
    let C2Name = "In Absentia Porcupine Tree"
    let C3Name = "Flying Colors Flying Colors"
    let C4Name = "All Is One Orphaned Lande"
    let C5Name = "Shabaq Sameh</b><br/>Shabaq Sameh"
    this.setState({
      isC1Searched: C1Name.toLowerCase().includes(this.state.searchQuery.toLowerCase()),
      isC2Searched: C2Name.toLowerCase().includes(this.state.searchQuery.toLowerCase()),
      isC3Searched: C3Name.toLowerCase().includes(this.state.searchQuery.toLowerCase()),
      isC4Searched: C4Name.toLowerCase().includes(this.state.searchQuery.toLowerCase()),
      isC5Searched: C5Name.toLowerCase().includes(this.state.searchQuery.toLowerCase())
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

    const imageC1 = require('../images/C1.jpg'); 
    const imageC2 = require('../images/C2.jpg'); 
    const imageC3 = require('../images/C3.jpg'); 
    const imageC4 = require('../images/C4.jpg'); 
    const imageC5 = require('../images/C5.jpg'); 
    

    let item1 = this.state.isC1Searched ? <div className='productItem'>
                                            <img src={imageC1} width='120px' height='110px' onClick={this.onClickItem} id='C1'/>
                                            <p><b>10,000 Days</b><br/>TOOL<br/>10$</p>
                                          </div>: null
    let item2 = this.state.isC2Searched ? <div className='productItem'>
                                            <img src={imageC2} width='120px' height='110px' onClick={this.onClickItem} id='C2'/>
                                            <p><b>In Absentia</b><br/>Porcupine Tree<br/>10$</p>
                                          </div> : null
    let item3 = this.state.isC3Searched ? <div className='productItem'>
                                            <img src={imageC3} width='120px' height='110px' onClick={this.onClickItem} id='C3'/>
                                            <p><b>Flying Colors</b><br/>Flying Colors<br/>10$</p>
                                          </div> : null
    let item4 = this.state.isC4Searched ? <div className='productItem'>
                                            <img src={imageC4} width='120px' height='110px' onClick={this.onClickItem} id='C4'/>
                                            <p><b>All Is One</b><br/>Orphaned Land<br/>10$</p>
                                          </div> : null
    let item5 = this.state.isC5Searched ?  <div className='productItem'>
                                            <img src={imageC5} width='120px' height='110px' onClick={this.onClickItem} id='C5'/>
                                            <p><b>Shabaq Sameh</b><br/>Shabaq Sameh<br/>10$</p>
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