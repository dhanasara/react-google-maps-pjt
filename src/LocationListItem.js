import React, { Component } from 'react';
import PropTypes from 'prop-types';

class LocationListItem extends Component {
	static propTypes = {
        
        markerClick: PropTypes.func.isRequired,
        location: PropTypes.string.isRequired
    }
	//Function to render search location items dynamically
    render() {

    	return (
			<li className="menu-item" tabIndex="0" role="menuitem" onClick={() => this.props.markerClick(this.props.location)} >
				<p className="location-title">{this.props.location.title}</p>
			</li>
		);
    }

  }


export default LocationListItem;

 