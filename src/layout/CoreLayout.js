import React from 'react'
import PropTypes from 'prop-types'
import './CoreLayout.css'
import '../styles/core.css'

export const CoreLayout = ({ children }) => (
  <div className='core-layout'>
		{children}     
   </div>
)

CoreLayout.PropTypes = {
  children : PropTypes.element.isRequired
}

export default CoreLayout