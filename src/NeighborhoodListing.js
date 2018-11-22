import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LocationListItem from './LocationListItem';


class NeighborhoodListing extends Component {
	
	static propTypes = {
        locations: PropTypes.array.isRequired,        
        query: PropTypes.string.isRequired        
    }
    

/*Render side bar listing functionalities*/
	render() {

		const {locations, query} = this.props;
		const locationList = locations.filter(
			item => item.title.toLowerCase().indexOf(query.toLowerCase()) !== -1);
		
      return (<div className="options-box">
        <header><h1>Find Your Neighborhood Places</h1></header>    	
        
        <input type="text" className="search-location" tabIndex="0" role="search" placeholder="Search Places" value={query}
                          onChange={event => this.props.searchByQuery(event)}/>
        <div>
        	<ul className="location-item-list">
        	{locationList.map((item, index) => (
							<LocationListItem key={index} location={item} markerClick={item => {
								this.props.markerClick(item);
								}}
							/>
						))}
        		
        	</ul>         
        </div>
      </div>);      
	}
}

export default NeighborhoodListing;
