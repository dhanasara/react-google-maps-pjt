# Neighborhood Map Project

Udacity Assessment project for FEND course. This is the project for locating the Neighborhood places in Google Map. The page renders Google Map with Neighborhood place listing including search filter. It locates those places in Google Map defaultly. By doing search location, you can filter the Neighborhood places on listing. By clicking the marker place at Google Map, the information about the Neighborhood location will popup. Right now, the project extracts the information about of place, from Wikipedia source. By selecting the Neighborhood place from Listing will also render the Information popup in the Google Map.

## How to Run the project

a. This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

b. Download the project. Run 'npm install' and 'npm start' on the terminal. You will get the project files which are listed in the following section.

c. Now the app is running at, http://localhost:3000/

## What You're Getting
```bash
├── README.md - This file.
├── package.json # npm package manager file. It's unlikely that you'll need to modify this.
├── public
│   ├── favicon.ico # React Icon, You may change if you wish.
│   └── index.html # DO NOT MODIFY
└── src
    ├── App.css # Styles for your app. Feel free to customize this as you desire.
    ├── App.js # This is the root of your app.
    ├── App.test.js # Used for testing. Provided with Create React App. Testing is encouraged, but not required.
    ├── index.css # Global styles. You probably won't need to change anything here.
    └── index.js # You should not need to modify this file. It is used for DOM rendering only.
    ├── LoadWikiData.js # A React component for fetching content from Wikipedia.
    ├── LocationListItem.js # React Component for listing Neighborhood places.
    ├── logo.svg # Default React JS Image.
    ├── MyGoogleMap.js # React Component for initiating Google Map.
    ├── NeighborhoodListing.js # React Component for loading Nei.ghborhood places with Search placeholder
    ├── registerServiceWorker.js # Service worker for doing cache.
    
    
    
```

### Third-party APIs:

	a. Wikipedia
	
	b. Google Map
