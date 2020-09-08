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
      isR1Searched: true,
      isR2Searched: true,
      isR3Searched: true,
      isR4Searched: true,
      isR5Searched: true
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.searchOnChange = this.searchOnChange.bind(this);
    this.onClickItem = this.onClickItem.bind(this);
  }

  handleSearch = (event) => {
    let R1Name = "Dark Side of the Moon Pink Floyd"
    let R2Name = "And Justice For All Metallica"
    let R3Name = "Scenes from a Memory Dream Theater"
    let R4Name = "Hail Stan Periphery"
    let R5Name = "Toxicity System Of A Down"
    this.setState({
      isR1Searched: R1Name.toLowerCase().includes(this.state.searchQuery.toLowerCase()),
      isR2Searched: R2Name.toLowerCase().includes(this.state.searchQuery.toLowerCase()),
      isR3Searched: R3Name.toLowerCase().includes(this.state.searchQuery.toLowerCase()),
      isR4Searched: R4Name.toLowerCase().includes(this.state.searchQuery.toLowerCase()),
      isR5Searched: R5Name.toLowerCase().includes(this.state.searchQuery.toLowerCase())
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

    const imageR1 = require('../images/R1.jpg'); 
    const imageR2 = require('../images/R2.jpg'); 
    const imageR3 = require('../images/R3.jpg'); 
    const imageR4 = require('../images/R4.jpg'); 
    const imageR5 = require('../images/R5.jpg'); 
    

    let item1 = this.state.isR1Searched ? <div className='productItem'>
                                            <img src={imageR1} width='120px' height='110px' onClick={this.onClickItem} id='R1'/>
                                            <p><b>Dark Side of the Moon</b><br/>Pink Floyd<br/>15$</p>
                                          </div> : null
    let item2 = this.state.isR2Searched ? <div className='productItem'>
                                            <img src={imageR2} width='120px' height='110px' onClick={this.onClickItem} id='R2'/>
                                            <p><b>And Justice For All</b><br/>Metallica<br/>15$</p>
                                          </div> : null
    let item3 = this.state.isR3Searched ? <div className='productItem'>
                                            <img src={imageR3} width='120px' height='110px' onClick={this.onClickItem} id='R3'/>
                                            <p><b>Scenes from a Memory</b><br/>Dream Theater<br/>15$</p>
                                          </div> : null
    let item4 = this.state.isR4Searched ? <div className='productItem'>
                                            <img src={imageR4} width='120px' height='110px' onClick={this.onClickItem} id='R4'/>
                                            <p><b>Hail Stan</b><br/>Periphery<br/>15$</p>
                                          </div> : null
    let item5 = this.state.isR5Searched ? <div className='productItem'>
                                            <img src={imageR5} width='120px' height='110px' onClick={this.onClickItem} id='R5'/>
                                            <p><b>Toxicity</b><br/>System of a Down<br/>15$</p>
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