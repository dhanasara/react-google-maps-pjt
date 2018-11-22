import React from 'react';
import { render } from 'react-dom';
import ReactDependentScript from "react-dependent-script";
import './App.css';
import NeighborhoodListing from './NeighborhoodListing';
import MyGoogleMap from './MyGoogleMap';
import LoadWikiData from './LoadWikiData';


class App extends React.Component {  
  
  state = {   
    map: {},
    markers: [],
    locations: [],    
    query: '',
    infoWindow: {}
   
  }
  

  /*Function to load Map with markers*/
  loadMyMap = map => {
    
    this.setState({ map: map });
        // Marker locations on Google Map
        var locations = [          
          { title: 'Cape May County Park & Zoo', location: { lat: 39.101968, lng: -74.81123 } },
          { title: 'Adventure Aquarium', location: { lat: 39.944525, lng: -75.130213 } },
          { title: 'Brunswick Square (East Brunswick, New Jersey)', location: { lat: 40.423372, lng: -74.383707 } },
          { title: 'Princeton University', location: { lat: 40.343989, lng: -74.651448 } },
          { title: 'Rutgers University', location: { lat: 40.500819, lng: -74.447399 } }
        ];
        this.setState({ locations: locations });
        let infoWindow = new window.google.maps.InfoWindow();
        this.setState({infoWindow: infoWindow})
        // The following loop uses the location array to create an array of markers on initialize.
        let markers = [];
        for (const[index, maploc] of locations.entries()) {
          // Get the position from the location array.
          let position = maploc.location;
          let title = maploc.title;
          // Create a marker per location, and put into markers array.
           let marker = new window.google.maps.Marker({
            position: position,
            title: title,
            animation: window.google.maps.Animation.DROP,
            id: index
          });
          // Push the marker to our array of markers.
          markers.push(marker);
          // Create an onclick event to open an infowindow at each marker.
          marker.addListener('click', () => {
            this.populateInfoWindow(marker, infoWindow);
          });
        }
        this.setState({ markers: markers });
        // Update Marker Bounds
        this.extendMarkerBounds(map, markers);
  };

  /*Function to fix marker bounds on Map*/
  extendMarkerBounds(map, markers) {    
    const bounds = new window.google.maps.LatLngBounds();
    for (const marker of markers) {
      marker.setMap(map);
      bounds.extend(marker.position);
    }
    map.fitBounds(bounds);
  }

  /*Function to populate InfoWindow when the marker got clicked 
  or once the location got selected */
  populateInfoWindow(marker, infoWindow) {    
        // Condition to open new info window of marker instead of opening the existing info window.
        if (infoWindow.marker !== marker) {          
          infoWindow.marker = marker;
          infoWindow.setContent('<div id="infoWindow" />');
          infoWindow.addListener('domready', e => {
              render(<LoadWikiData marker={marker} />, document.getElementById('infoWindow'));
            });
          // close click event of info window
          infoWindow.addListener('closeclick', function() {
            infoWindow.marker = null;
          });
          infoWindow.open(this.state.map, marker);
        }
      } 

  /*Function to create InfoWindow while 
  clicking the marker place*/
  markerClick = maploc => {    
    let sMarker = undefined;
    this.state.map.setCenter(maploc.location);
    this.state.map.setZoom(9);
    setTimeout(() => {
      this.state.map.setZoom(11);
    }, 750);
    setTimeout(() => {
      for (const marker of this.state.markers) {
        if (marker.title === maploc.title && marker.animation === null) {         
          marker.setAnimation(4);
          sMarker = marker;
           
        }
      }
      this.populateInfoWindow(sMarker, this.state.infoWindow);
    }, 1250);
  };


/*Function to search location by filter and 
render the map based on the search query location*/
  searchByQuery = event => {
    this.setState(
      {
        query: event.target.value
      },
      () => {       
            const searchListMarkers = [];
            for (const marker of this.state.markers) {
              if (marker.title.toLowerCase().indexOf(this.state.query.toLowerCase()) !== -1) {
                marker.setVisible(true);
                searchListMarkers.push(marker);
              } else {
                marker.setVisible(false);
              }
            }
            this.setState({markers: searchListMarkers})
            let map = this.state.map;
            let markers = this.state.markers;            
            this.extendMarkerBounds(map, markers)        
        }
    );
  };

/*Render main page with Side bar location listing 
and the Google map including marker for the respective locaiton. 
Here loaded Google map script via React dependent script*/
  render() {
    return (
      
        <div className="container">
            <NeighborhoodListing
            locations={this.state.locations} 
            markerClick={this.markerClick}
            query={this.state.query}
            searchByQuery={this.searchByQuery}            
          />
          
          <ReactDependentScript
          scripts={[
            "https://maps.googleapis.com/maps/api/js?key=AIzaSyDFSQMw804HmtfAfmczV6Pbon1d2_c-_3A&v=3&"
          ]}
        >
        
      <MyGoogleMap id="map" center={{ lat: 40.058324, lng: -74.405661 }} zoom={11} onLoadScript={this.loadMyMap}/>
    </ReactDependentScript>
          
        </div>
         
      
    )
  }
}

export default App
