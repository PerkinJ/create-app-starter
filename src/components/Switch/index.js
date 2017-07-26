import React, {Component} from 'react'
import PropTypes from 'prop-types'
import './index.css'

const Switch = ({ isStart, onClick }) =>{
	return (
		    <div className="slide" onClick={onClick}>  
		      <input type="checkbox" value="None" name="check"  checked={isStart?true:false}/>
		      <label htmlFor="slideThree"></label>
		    </div>
	)
}

Switch.PropTypes = {
	onClick: PropTypes.func,
	isStart: PropTypes.bool
}

export default Switch