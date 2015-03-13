# about:blank

about:blank is a startpage for browsers. 

## Features

- Application launcher
- Status informations
- Easy access to GitHub and Google search.

## Installation

First you need to install Node.js: https://nodejs.org/       
When it is installed, clone this repository:     
`git clone https://github.com/nounoursheureux/about-blank.git`        
Then install the npm dependencies:         
`npm install`        
If you are on a Mac you need `osascript`:       
`npm install node-osascript`         
Start the server:         
`node server.js`        
Or if you are on a Mac:        
`node server-mac.js`        
Finally, start your web-browser and navigate to `localhost:3527`        

### Linux dependencies

- System dependencies: 
  * node.js
  * mpd & mpc for the songs (if you don't want to install them you can remove the `song` module in `config.json`).

- Node.js dependencies: 
  * Express
  * Socket.io

### Mac OS dependencies

- System dependencies:
  * node.js 

- Node.js dependencies:
  * Express
  * Socket.io
  * osascript

## Configuration

The configuration file is `config.json`. It contains:     
- The city name: the weather API shows this city's weather
- The port: the server runs on this port.    
- The partition: the partition which is used in the status informations        
- The default active icon: you can set it to
  - `terminal`      
  - or `search`         
  - or `github`     
- The default search engine: you can set it to     
  -  `google`    
  - or `duckduckgo` 
