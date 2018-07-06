import React from 'react'
import PropTypes from 'prop-types'

function KeyboardHints(props) {
    return (
      <div onBlur={props.onFocusLoss} tabIndex="1" className="hints">
        <ul>
          <li>Use <strong>escape</strong> button to switch on and off sidebar</li>
          <li>Use <strong>enter</strong> key to select a place in the list</li>
        </ul>
      </div>
    )
}

KeyboardHints.porpTypes = {
  onFocusLoss: PropTypes.func.isRequired
}

export default KeyboardHints