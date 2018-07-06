import {
  Map, Marker,
  InfoWindow,
  GoogleApiWrapper
} from 'google-maps-react'
import React, { Component } from 'react'
import PropTypes from 'prop-types'


//Exports the Map and the markers
export class MapContainer extends Component {
  state = {
    activeMaker: {},
    selectedPlace: {},
    showingInfoWindow: false
  }

 //Component will re render
  componentDidMount() {
    this.forceUpdate()
  }

//Action what happens when the marker is clicked
  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMaker: marker,
      showingInfoWindow: true
    })
  }
//Action what happens when the map is clicked
  onMapClick = () => {
    this.setState({
      activeMaker: {},
      selectedPlace: {},
      showingInfoWindow: false
    })
  }


  render() {
    const bound = new this.props.google.maps.LatLngBounds()

    for (let i = 0; i < this.props.locations.length; i++) {
      bound.extend(this.props.locations[i].position)
    }

    return (
      <Map
        role="application"
        onClick={this.onMapClick}
        initialCenter={{ lat: 34.9003, lng: 33.6232}}
        google={this.props.google}
        bounds={bound}>
        {/* First filter the ones that don't match with the query */}
          {this.props.locations.filter(location => {
            return (location.title)
          })
          // Print the ones that was filtered out
          .map(location => {
            return (
              <Marker
                key={location.id}
                position={{ lat: location.position.lat, lng: location.position.lng}}
                title={location.title}
                onClick={this.onMarkerClick}
                animation={this.props.google.maps.Animation.Fo}
                category={location.category}
                address={location.address}
                crossStreet={location.crossStreet}
                state={location.state}
                coordinates={location.coordinates}
                postalCode={location.postalCode} />
            )
          })}
          <InfoWindow marker={this.state.activeMaker} visible={this.state.showingInfoWindow}>
            <body>
              <header>
                <h1>{this.state.selectedPlace.title}</h1>
                <h3><span aria-labelledby="category">Category</span>: <span id="category">{!this.state.selectedPlace.category ? 'N/A' : this.state.selectedPlace.category}</span></h3>
              </header>
              <main>
                <p><span aria-labelledby="address">Address</span>: <span id="address">{!this.state.selectedPlace.address ? 'N/A' : this.state.selectedPlace.address}</span></p>
                <ul>
                  <li><span aria-labelledby="state">State</span>: <span id="state">{!this.state.selectedPlace.state ? 'N/A' : this.state.selectedPlace.state}</span></li>
                  <li><span aria-labelledby="coordinates">Coordinates</span>: <span id="coords">{this.state.selectedPlace.coordinates}</span></li>
                  <li><span aria-labelledby="post-code">Post Code</span>: <span id="postal-code">{!this.state.selectedPlace.postalCode ? 'N/A' : this.state.selectedPlace.postalCode}</span></li>
                </ul>
              </main>
            </body>
          </InfoWindow>
      </Map>
    )
  }
}

MapContainer.propTypes = {
  locations: PropTypes.array.isRequired,
  queryText: PropTypes.string.isRequired
}


export default GoogleApiWrapper({
  apiKey: 'AIzaSyB-Rff_nbsnhRb3jT6eqW6EWptTPCHsic4'
})(MapContainer)