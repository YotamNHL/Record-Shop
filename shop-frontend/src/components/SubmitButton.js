import React from 'react';
import PropTypes from 'prop-types';
import '../App.css';
import {MdArrowForward} from 'react-icons/md';

const SubmitButton = (props) => {

	let socialNets = null;

	if (props.type == 'signIn') {

	} else {
		socialNets = (
			<div className='socialNets'>
			</div>
		)
	}
	return (
		<div className={'submitButton'}>
			{socialNets}
			<button className={props.type=='signIn' ? 'submitSignIn' : 'submitSignUp'} 
			onClick={props.onClick}
			type='button'
			><MdArrowForward/></button>
		</div>
	);
} 

SubmitButton.propTypes = {
	type: PropTypes.string,
	onClick: PropTypes.func
};

export default SubmitButton;