import React, { Component } from "react"
import PropTypes from 'prop-types'

 
function MenuButton(props) { 
	//hambuerger menu button to hide/open the menu
    return (
      <div onClick={props.onMenClick} className="menu-btn">
        𝄘
      </div>
    )
 }

MenuButton.propTypes = {
  onMenClick: PropTypes.func.isRequired
}

 
export default MenuButton