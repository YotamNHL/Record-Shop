import React, { Component } from "react";
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';


export default class AdminPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: true,
      username: this.props.username,
      rawUsersActivity: null,
      fullListOfActivity: null,
      fullListOfUsers: null,
      allUsers: [],
      filter: ''
    };
    this.onPageLoad = this.onPageLoad.bind(this);
    this.getFullListOfActivity = this.getFullListOfActivity.bind(this);
    this.filterOnChange = this.filterOnChange.bind(this);
  }

    onPageLoad = async (event) => {
        let res = await axios.get("http://localhost:5000/getAllUsersActivity")
        this.setState({rawUsersActivity: res.data})
    };

    getFullListOfActivity = (rawUsersActivity) => {
        let listOfAllUsers = []
        let index = -1
        let fullListOfActivity = rawUsersActivity.map(userActivity => {
            let username = userActivity[0];
            listOfAllUsers.push(username);
            let thisUsersActivity = userActivity[1].map(activity => {
                index++;
                return(<li key={index}>{activity}</li>)
            })
            index = 0;
            if ((username.toLowerCase().includes(this.state.filter.toLowerCase()))) {
                return(<div className={username} key={username}><h2>{username}</h2><ul>{thisUsersActivity}</ul></div>)
            }
            else {
                return(null)
            }
        })
        this.setState({allUsers: listOfAllUsers})
        return(<div className="allUserActivity">{fullListOfActivity}</div>)
    }

    filterOnChange = (event) => {
        console.log(event.target.value);
        this.setState({filter: event.target.value}, func => {
            this.setState({fullListOfActivity: this.getFullListOfActivity(this.state.rawUsersActivity)})
        })
    }

    getFullListOfUsers = (allUsers) => {
        let finalListOfUsers = allUsers.map(user =>{
            console.log(<option key={user} value={user}/>)
            return(<option key={user} value={user}/>)
            
        })
        console.log(finalListOfUsers);
        return(<div className="filterUsers"><label>
                Choose (or type) a username:     
                <input onChange={this.filterOnChange} list="filterUsers" name="filterUsers" />  
                </label>  
                <datalist id="filterUsers" >{finalListOfUsers}</datalist>
                </div>)
    }

  render() {
      if (!this.state.rawUsersActivity) {
        this.onPageLoad()
        .then(ret_val => {
            this.setState({fullListOfActivity: this.getFullListOfActivity(this.state.rawUsersActivity),
                           fullListOfUsers: this.getFullListOfUsers(this.state.allUsers)});
        })    
    }

    return (
      <div style={{'width': '800px'}}>
        {this.state.fullListOfUsers}
        {this.state.fullListOfActivity}
        
        <ToastContainer />
      </div>
    );
  }
}