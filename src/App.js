import React, { Component } from 'react';
import './App.css';
import Map from './MapContainer'
import Credentials from './FSQCredentials'
import SideBar from './SideBar'
import KeyboardHints from './KeyboardHints'
import MenuButton from './MenuButton'
import { BrowserRouter, Route, Link } from 'react-router-dom';

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

      if (e.keyCode === ESCAPE_BUTTON) {
        document.querySelector('.sidebar')
          .classList.toggle('sidebar-expanded')

        document.querySelector('.menu-btn')
          .classList.toggle('menu-btn-hidden')
      }    
    })

     setTimeout(() => {
      if (document.querySelector('.hints'))
        document.querySelector('.hints').style.opacity = '0'
    }, 9500)

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
          crossStreet: item.venue.location.crossStreet,
          state: item.venue.location.state,
          coordinates: item.venue.location.lat + ', ' + item.venue.location.lng,
          postalCode: item.venue.location.postalCode
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
    // Hide hamburger button
    e.target.classList.add('menu-btn-hidden')

    // Display sidebar
    document.querySelector('.sidebar')
      .classList.add('sidebar-expanded')
  }


  closeBtnHandler = e => {
    document.querySelector('.sidebar')
      .classList.remove('sidebar-expanded')

    document.querySelector('.menu-btn')
      .classList.remove('menu-btn-hidden')
  }

  sidebarItemClick = e => {
    // Eliminate other markers that don't match with the string expression
    this.setState({
      query: e.target.textContent
    })
  }

  sidebarInputClick = e => {
    this.setState({
      query: ''
    })

  }

  sidebarItemFocus = e => {
    document.querySelector('.menu-btn')
      .classList.add('menu-btn-hidden')

    document.querySelector('.sidebar')
      .classList.add('sidebar-expanded')
  }

  
  sidebarItemKeyUp = e => {
    if (e.keyCode === ENTER_BUTTON) {
      this.setState({
        query: e.target.textContent
      })

   for (const location of this.state.locations) {
        if (location.title === e.target.textContent.replace(/- /g, '')) {
          this.setState({ venueInfo: location })
        }
      }  
    }
   }    
  hintsLoseFocus = e => {
    e.target.style.display = 'none'
  }
  

  updateQuery = e => {
    this.setState({
      query: e.target.value
      
    })
  }

  render() {
    return (
      <div className="App">
          <header className="App-header">
          <h1 className="App-title">Larnaca Area</h1>
        </header>
          <div>
          {/* Display hints if the app loads properly */}
            {!this.state.fourSquareCrash && <KeyboardHints onFocusLoss={this.hintsLoseFocus} /> }
          <MenuButton
              onMenClick={this.menuBtnHandler} />
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
    </div>
    );
  }
  
}

export default App;
