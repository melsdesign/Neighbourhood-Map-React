import React from 'react'
import PropTypes from 'prop-types'

function Modal(props) {
  // Pop up modal when the location is chosen from the sidebar 
  const data = props.venueInfo
  return (
    <div className="details-modal">
      <button
        onClick={props.closeModal}
        className="close-modal"
        aria-label="Close details window">X</button>
      <h1><span aria-labelledby="place-title"></span>{data.title}</h1>
      <h3><span aria-labelledby="place-category">Category</span>: <span className="data" id="place-category">{!data.category ? 'N/A' : data.category}</span></h3>
      <ul>
        <li><span aria-labelledby="place-address">Address</span>: <span className="data" id="place-address">{!data.address ? 'N/A' : data.address}</span></li>
        <li><span aria-labelledby="place-state">State</span>: <span className="data" id="place-state">{!data.state ? 'N/A' : data.state}</span></li>
        <li><span aria-labelledby="place-coordinates">Coordinates</span>: <span className="data" id="place-coordinates">{!data.coordinates ? 'N/A' : data.coordinates}</span></li>
      </ul>
      <br/>
    </div>
  )
}

Modal.propTypes = {
  venueInfo: PropTypes.object.isRequired,
  closeModal: PropTypes.func.isRequired
}

export default Modal