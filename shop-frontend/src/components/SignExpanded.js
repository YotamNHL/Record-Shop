import React , {Component} from 'react';
import PropTypes from 'prop-types';
import '../App.css';
import {Motion, spring} from 'react-motion';
import Input from './Input';
import SubmitButton from './SubmitButton';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import crypto from 'crypto';

const axios = require('axios')
axios.defaults.withCredentials = true;

class SignExpanded extends Component {

	constructor(props) {
		super(props);
		this.state = {
			flexState: false,
			animIsFinished: false,
			rememberMe: false,
			username: "",
			password: "",
		};
	}

	componentDidMount () {
     	this.setState({flexState: !this.state.flexState});  
  	}


	isFinished = () => {
		this.setState({animIsFinished: true});
	}

	onTypeUsername = (event) => {
		let inputText = String(event.target.value);
		this.setState({username: inputText})
	}

	onTypePassword = (event) => {
		let inputText = event.target.value;
		this.setState({password: inputText})
	}

	 onClickSignUp = async (event) => {
		let res = await axios.post("http://localhost:5000/signup", {
				username: this.state.username,
				password: this.state.password
		})
		let isUsernameTaken = res.data;
		if (isUsernameTaken) {
			toast.error('Username already taken!', {
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
			toast.success('Signed up successfully!', {
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

	loggedInHandler = () => {
		this.props.loggedInHandler();
	}

	onClickSignIn = async (func) => {
		let res = await axios.post("http://localhost:5000/signin", {
			username: this.state.username,
			password: this.state.password,
			rememberMe: this.state.rememberMe
		})
		console.log(res.data);
		if (!res.data) {
			toast.error('Wrong Username/Password', {
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
			this.loggedInHandler();
		}
	}

	onClickRememberMe = (event) => {
		let currentRememberMe = this.state.rememberMe;
		this.setState({rememberMe: !currentRememberMe}, func => {
			console.log(this.state.rememberMe)
		})
	}

	render () {

		return (
			<Motion style={{
				flexVal: spring(this.state.flexState ? 8 : 1)
			}} onRest={this.isFinished}>
			{({flexVal}) =>
			<div className={this.props.type=='signIn' ? 'signInExpanded' : 'signUpExpanded'} style={{
				flexGrow: `${flexVal}`
			}}>
				<Motion style={{ 
					opacity: spring(this.state.flexState ? 1 : 0,{stiffness: 300, damping: 17}),
					y: spring(this.state.flexState ? 0 : 50, {stiffness: 100, damping: 17})
				 }} >
						{({opacity, y}) =>
						<form className='logForm' style={{
							WebkitTransform: `translate3d(0, ${y}px, 0)`,
							transform: `translate3d(0, ${y}px, 0)`,
							opacity: `${opacity}`
						}}>
							<h2>{this.props.type == 'signIn' ? 'SIGN IN' : 'SIGN UP'}</h2>
							<Input
								id="login"
								type="text"
								placeholder="LOGIN"
								onChange={this.onTypeUsername}/>
							<Input
								id="password"
								type="password"
								placeholder="PASSWORD"
								onChange={this.onTypePassword}/>
							{this.props.type == 'signIn' ? 
									<div>
										<p style={{'font-size': "12px", marginLeft: '35%'}}> Remember Me <input onChange={this.onClickRememberMe} type="checkbox" id="RememberMe" style={{position: "absolute", 'margin-left': "10px"}}/> </p>
										<SubmitButton type={this.props.type} onClick={this.onClickSignIn}></SubmitButton> 
									</div> :
									<SubmitButton type={this.props.type} onClick={this.onClickSignUp}></SubmitButton>}
						</form>
					
						}
				</Motion>
				<ToastContainer />
			</div>
		}
			</Motion>
		);
	}
}

SignExpanded.propTypes ={
	type: PropTypes.string	
};

export default SignExpanded;