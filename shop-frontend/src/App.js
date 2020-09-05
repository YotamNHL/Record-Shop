import React, {Component} from 'react';
import './App.css';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {Motion, spring} from 'react-motion';
import NavigationPanel from './components/NavigationPanel';
import Modal from './components/Modal';
import MainWindow from './components/MainWindow';
import 'semantic-ui-css/semantic.min.css'
import Records from './components/Records'


class App extends Component {
	constructor(props) {
		super(props);
		this.loggedInHandler = this.loggedInHandler.bind(this)
		this.state = {
			mounted: false,
			isLoggedIn: false,
			username: 'izikSpizik'
		};
	}

	componentDidMount() {
		this.setState({ mounted: true });
	}
	
	// handleSubmit = (e) => {
	// 	this.setState({ mounted: false });
	// 	e.preventDefault();
	// }
	
	loggedInHandler() {
		this.setState({ isLoggedIn: true })
	}

	render() {

		

		const {mounted} = this.state;
		const {isLoggedIn} = this.state;

		let child;
		let test = 12;

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
							<p><b>Welcome {this.state.username}!</b></p>
						</div>
						<MainWindow username={this.state.username}/>
					</div>
				);
			}
		}
		
		return(
			<div className="App">
					<ReactCSSTransitionGroup 
						transitionName="example"
						transitionEnterTimeout={500}
						transitionLeaveTimeout={300}>
							
							{child}
					</ReactCSSTransitionGroup>
			</div>
		);
	}
}

export default App;
