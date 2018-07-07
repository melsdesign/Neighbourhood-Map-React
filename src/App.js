import React, { Component } from 'react';
import './App.css';
import Map from './MapContainer'
import Credentials from './FSQCredentials'
import SideBar from './SideBar'
import MenuButton from './MenuButton'
import SearchBar from './SearchBar'
import Modal from './Modal'
import { BrowserRouter, Route, Link } from 'react-router-dom';

//Keycode for keyboard buttons used in the app
const ESCAPE_BUTTON = 27,
      ENTER_BUTTON = 13

class App extends Component {
  state = {
    locations: [],
    venueInfo: {},
    query: ''
  }
    componentDidMount() {
      document.addEventListener('keyup', e => {
      e.preventDefault()
          //escape button will close the sidebar
      if (e.keyCode === ESCAPE_BUTTON) {
        document.querySelector('.sidebar')
          .classList.toggle('sidebar-expanded')

        document.querySelector('.menu-btn')
          .classList.toggle('menu-btn-hidden')
      }    
    })

  // Foursquare api set up
    fetch(`https://api.foursquare.com/v2/venues/explore?ll=34.9003,33.6232&client_id=${Credentials.client_id}&client_secret=${Credentials.client_secret}&v=${Credentials.version_date}`)
    .then(repsonse => repsonse.json())
    .then(data => {
      const locations = data.response.groups[0].items.map(item => {
        return {
          position: { lat: item.venue.location.lat, lng: item.venue.location.lng },
          title: item.venue.name,
          id: item.venue.id,
          category: item.venue.categories[0].name,
          address: item.venue.location.address,
          state: item.venue.location.state,
          coordinates: item.venue.location.lat + ', ' + item.venue.location.lng,
        }
      })
      
      this.setState({ locations })
    })
    //If the api fails to load 
    .catch(err => {
      console.log('Failed to fetch foursquare data', err)
    })
  }

 menuBtnHandler = e => {
    // Hides menu button
    e.target.classList.add('menu-btn-hidden')

    // display the sidebar
    document.querySelector('.sidebar')
      .classList.add('sidebar-expanded')
  }

    //closes the sidebar
  closeBtnHandler = e => {
    document.querySelector('.sidebar')
      .classList.remove('sidebar-expanded')
     //shows menu button
    document.querySelector('.menu-btn')
      .classList.remove('menu-btn-hidden')
  }

  sidebarItemClick = e => {
    // removes markers that are not a match
    this.setState({
      query: e.target.textContent.replace(/- /g, '')
    })
    
    const modal = document.querySelector('.details-modal')
    // Search for the clikced location and retrieve the data
    for (const location of this.state.locations) {
      if (location.title === e.target.textContent.replace(/- /g, '')) {
        this.setState({ venueInfo: location })
        modal.style.display = 'block'
        modal.style.opacity = '1'
        }
      }    
    }

    sidebarInputClick = e => {
    this.setState({
      query: ''
    })
   //pop-up modal when the location is clicked in the search bar
   const modal = document.querySelector('.details-modal')

    modal.style.opacity = '0'

    setTimeout(() => {
      modal.style.display = 'none'
    }, 500)
  }
  sidebarItemKeyUp = e => {
    if (e.keyCode === ENTER_BUTTON) {
      this.setState({
        query: e.target.textContent.replace(/- /g, '')
      })
   } 
 }
  //closes the modal
  modalCloseButton = e => {
    const modal = document.querySelector('.details-modal')

    modal.style.opacity = '0'
    setTimeout(() => {
      modal.style.display = 'none'
    }, 500)
  } 

updateQuery = e => {
    this.setState({
      query: e.target.value})
  }

  render() {
    return (
      <div className="App">
          <header className="App-header">
          <h1 className="App-title">Best Places in Larnaca Area</h1>
          <p className="credit">Project created with the use of <br /> Google Map's and Foursquare's Data</p>
          <MenuButton
              onMenClick={this.menuBtnHandler} />
           </header>
          <Modal
              venueInfo={this.state.venueInfo}
              closeModal={this.modalCloseButton} />
         
          <SideBar
              onCloseClick={this.closeBtnHandler}
              places={this.state.locations}
              currentQuery={this.state.query}
              onQueryInput={this.updateQuery}
              onItemClick={this.sidebarItemClick}
              onInputClick={this.sidebarInputClick}
              onItemFocus={this.sidebarItemFocus}
              onItemKeyUp={this.sidebarItemKeyUp} />

        <div className="map">
           <Map
            queryText={this.state.query}
            locations={this.state.locations} />
        </div>
      </div>
    )
  }
  
}

export default App;
