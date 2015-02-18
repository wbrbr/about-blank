# about:blank

about:blank is a startpage for browsers. 

## Features

- Application launcher
- Status informations
- Easy access to GitHub and Google search.

## Installation

### Dependencies

- System dependencies: 
  * node.js

- Node.js dependencies: 
  * Express
  * Socket.io

First, you need to install node.js .      
When it is installed, clone this repository:     
`git clone https://github.com/nounoursheureux/about:blank.git`
Then install the npm dependencies: 
`npm install`
Start the server: 
`node server.js`
Finally, start your web-browser and navigate to `localhost:3527`

## Configuration

The configuration file is `config.json`. It contains:     
- The city name: the weather API shows this city's weather
- The port: the server runs on this port. 
