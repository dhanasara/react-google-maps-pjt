import React, { Component } from 'react';

class LoadWikiData extends Component {
	state = {
		wikiData: ''
	};
	
	fetchWikiAPI(title) {

		// Invoke Wikipedia API service with the endpoint url				
		fetch(
			`https://en.wikipedia.org/w/api.php?origin=*&action=opensearch&search=${title}&format=json&limit=2`
		).then(res => {
				if (res.ok) {					
					return res.json();
				} else {
					throw new Error('Error while fetching data');
				}
			})
			.then(responseData => {				
				if (responseData[2].length !== 0) {			
					this.setState({
							wikiData: responseData[2]
					});
				} else {
					this.setState({
						wikiData: 'Data Not Found'
					});
				}
			})
			.catch(error => {
				alert(error);
			});
	};
	
	// Render Wikipedia content on InfoWindow
	render() {
		let locationTitle = this.props.marker.title;		
		this.fetchWikiAPI(locationTitle);
		
		return (
			<div className="location-content">
				<h3 className="location-title">{locationTitle}</h3>
				<p className="location-content">{this.state.wikiData}</p>
			</div>
		);
	}
}

export default LoadWikiData;