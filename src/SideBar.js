import React from 'react'
import PropTypes from 'prop-types'
import SearchBar from './SearchBar'


function SideBar(props) {
    return (
      <div className="sidebar">
        <button aria-label="Close sidebar" onClick={props.onCloseClick} className="close-sidebar">X</button>
        <SearchBar
          onInputClick={props.onInputClick}
          onQueryChange={props.onQueryInput}
          currentVal={props.currentQuery} />
        <ul>
          {props.places.filter(place => {
            return (place.title)
          })
          .map((place, index) => {
            return (
              <li
                tabIndex="0"
                onKeyUp={props.onItemKeyUp}
                onClick={props.onItemClick}
                key={index}>{'- ' + place.title}</li>
            )
          })}
        </ul>
      </div>
    )
}

SideBar.propTypes = {
  places: PropTypes.array.isRequired,
  onCloseClick: PropTypes.func.isRequired,
  currentQuery: PropTypes.string.isRequired,
  onQueryInput: PropTypes.func.isRequired,
  onItemClick: PropTypes.func.isRequired,
  onInputClick: PropTypes.func.isRequired,
  onItemKeyUp: PropTypes.func.isRequired
}


export default SideBar