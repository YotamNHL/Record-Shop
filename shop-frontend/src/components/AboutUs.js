import React, { Component } from "react";
import 'react-toastify/dist/ReactToastify.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


export default class Records extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: true,
      username: this.props.username,
    };
  }

  render() {
      let yotamPicture = require('../images/Yotam.jpg')
      let itayPicture = require('../images/Itay.jpg')

    return (
      <div>    
        <div
          style={{
            width: "800px",
            height: "100px",
            display: this.state.display ? "block" : "none"
          }}
        >
            This website was designed and developed by Yotam Levanon and Itay Feiner. Thanks for stopping by! <br/>
            <div align='center'>
                <table>
                    <tr>
                        <td>
                            <img src={yotamPicture} width='180px' height='170px'></img>
                        </td>
                        <td/>
                        <td/>
                        <td/>
                        <td/>
                        <td/>
                        <td/>
                        <td/>
                        <td/>
                        <td>
                            <img src={itayPicture} width='180px' height='170px'></img>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
      </div>
    );
  }
}