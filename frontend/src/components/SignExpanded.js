import React , {Component} from 'react';
import PropTypes from 'prop-types';
import '../App.css';
import {Motion, spring} from 'react-motion';
import Input from './Input';
import SubmitButton from './SubmitButton';

const axios = require('axios')

class SignExpanded extends Component {

	constructor(props) {
		super(props);
		this.state = {
			flexState: false,
			animIsFinished: false,
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

	onClickSubmit = (event) => {
		console.log("I got to the button")
		if(this.props.type == 'signIn') {

		}
		else {
			axios.post("http://localhost:5000/signup", {
					username: this.state.username,
					password: this.state.password
				})
		}
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
							<SubmitButton type={this.props.type} onClick={this.onClickSubmit}></SubmitButton>
							{/* <a href="url" className='forgotPass'>{this.props.type == 'signIn' ? 'Forgot password?' : ''}</a> */}
						</form>
						}
				</Motion>
			</div>
		}
			</Motion>
		);
	}

}

SignExpanded.PropTypes ={
	type: PropTypes.string	
};

export default SignExpanded;