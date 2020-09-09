import React, { Component } from "react";
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';


export default class ShoppingCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: true,
      username: this.props.username,
      shoppingCart: null,
      listOfItemsToShow: null,
      totalPriceOfAll: 0
    };
    this.onPageLoad = this.onPageLoad.bind(this);
    this.handleBuy = this.handleBuy.bind(this);
  }

    onPageLoad = async (event) => {
    let res = await axios.post("http://localhost:5000/getUserShoppingCart", {
        username: this.state.username,
        })
    this.setState({shoppingCart: res.data})
    };

    getListOfItems = (shoppingCartList) => {
      this.setState({totalPriceOfAll: shoppingCartList[1]})
      let index = -1;
      let listOfAllItems = <div>Your Shopping Cart is Empty!</div>
      listOfAllItems = shoppingCartList[0].map(item => {
        index++;
        let title = item['id']['title']
        let amount = item['id']['amount']
        let total_price = item['id']['total_price']
        return <li key={index}>{title} * {amount} = {total_price}</li>;
      });

      return(<ul>{listOfAllItems}</ul>)
    }

    handleBuy = async (event) => {
      if(this.state.totalPriceOfAll > 0) {
        let res = await axios.post("http://localhost:5000/checkout", {
          username: this.state.username,
          pricePaid: this.state.totalPriceOfAll
        })
        console.log(res.data)
        this.setState({totalPriceOfAll: 0, shoppingCart: null, listOfItemsToShow: null});
        toast.success('Thanks for buying at Milestones Records!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      else {
        toast.error('Your shopping cart is empty', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }

  render() {
      if (!this.state.shoppingCart) {
        this.onPageLoad()
        .then(ret_val => {
            this.setState({listOfItemsToShow: this.getListOfItems(this.state.shoppingCart)});
        })    
    }

    return (
      <div style={{'width': '800px'}}>    
          {this.state.listOfItemsToShow}
          <h2><b>TOTAL PRICE: {this.state.totalPriceOfAll}$</b></h2>
          <AwesomeButton onPress={this.handleBuy} style={{width: '100px'}}>Purchase</AwesomeButton>
          <ToastContainer />
      </div>
    );
  }
}