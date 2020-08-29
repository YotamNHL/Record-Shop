import React from 'react';
import '../App.css';
import {MdArrowBack} from 'react-icons/lib/md';
import {FaCircle} from 'react-icons/lib/fa';

const NavigationPanel = (props) => {

	return (
		<div className='NavigationPanel'>
			<MdArrowBack onClick={props.initialState} className='back'/>
			<div className='dots'>
			</div>
			<div style={{flex: 2}}></div>
		</div>
	);
}



export default NavigationPanel;