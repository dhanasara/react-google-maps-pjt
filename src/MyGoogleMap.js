import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MyGoogleMap extends Component {
	static propTypes = {
        
        onLoadScript: PropTypes.func.isRequired
    }
	
	componentDidMount() {
		this.initMap();
	}

	/*Function to initialize map 
	with default options*/
	initMap() {

		let mapAttributes = {
      		zoom: this.props.zoom,
      		center: this.props.center,
      		mapTypeControl: true      
    	};

		let map = new window.google.maps.Map(
      		document.getElementById("map"), mapAttributes);
		this.props.onLoadScript(map);
      	
	}
	

	render() {
		return ( <div id="map" role="application" aria-label="location" />);
	}
}

export default MyGoogleMap;