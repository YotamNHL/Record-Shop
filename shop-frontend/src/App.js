import React, {Component} from 'react';
import './App.css';
import axios from 'axios';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {Motion, spring} from 'react-motion';
import NavigationPanel from './components/NavigationPanel';
import Modal from './components/Modal';
import MainWindow from './components/MainWindow';
import 'semantic-ui-css/semantic.min.css'
import Cookies from 'js-cookie'
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
	constructor(props) {
		super(props);
		this.loggedInHandler = this.loggedInHandler.bind(this)
		this.state = {
			mounted: false,
			username: '',
			isLoggedIn: false,
		};
	}

	componentDidMount() {
		this.setState({ mounted: true });
	}
	
	loggedInHandler() {
		window.location.reload();
	}


	render() {	
		const {mounted} = this.state;
		const {isLoggedIn} = this.state;
		let child;
		let test = 12;
		let sessionCookie;
		const logo = require('./images/MilestonesLogo.png')
		console.log(this.state.isLoggedIn)

		if (!this.state.isLoggedIn){
			sessionCookie = Cookies.get("session_cookie");
		}
		

		const handleLogOut = async (event) => {
			console.log('Logout Button Pressed')
			let res = await axios.post("http://localhost:5000/logout", {
					  'username': this.state.username,
				})
			document.cookie = "session_cookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
			this.setState({'username': '', 'isLoggedIn': false})
		}

		const handleSessionCookie = async (event) => {
				let res = await axios.post("http://localhost:5000/getUsernameFromCookie", {
					  sessionCookie: sessionCookie,
				})
				let username = res.data;

				this.setState({
					'username': username,
					isLoggedIn: true					
				});
		}
		
		if(sessionCookie) {
			handleSessionCookie();
		}


		if(mounted) {
			if (!isLoggedIn) {
				child = (
					<div className="App_test">
						<NavigationPanel></NavigationPanel>
						<Modal onSubmit={this.handleSubmit} loggedInHandler={this.loggedInHandler}/>
					</div>
				);
			}
			else {
				child =(
					<div>
						<div className="welcomeTag">
							<table>
								<tr>
									<td>
										<p><b>Welcome {this.state.username}!</b></p>
									</td>
									<td width={'10px'}>
									</td>
									<td>
										<AwesomeButton onPress={handleLogOut} style={{width: '100px'}}>LOG OUT</AwesomeButton>
									</td>
								</tr>
								<tr>
								</tr>
							</table>
						</div>
						<MainWindow username={this.state.username}/>
					</div>
				);
			}
		}
		
		return(
			<div className="App">
				<table>
					<tr>
						<div className="logo">
							<img src={logo}/>
						</div>
					</tr>
					<tr>
						<ReactCSSTransitionGroup 
							transitionName="example"
							transitionEnterTimeout={500}
							transitionLeaveTimeout={300}>
								
								{child}
						</ReactCSSTransitionGroup>
					</tr>
				</table>
			</div>
		);
	}
}

export default App;
