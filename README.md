# MERN Boilerplate

CURRENTLY NOT WORKING, PLEASE USE [Vite Boilerplate](https://github.com/leesamuel423/vite-boilerplate) IN THE MEANTIME


This is a MERN stack boilerplate that uses MongoDB, Express, React, and Node.js. This repository provides a starting point for building full-stack web applications using the MERN stack.

## Table of Contents
- [How to Use](#how-to-use)
- [Dependencies](#dependencies)
- [File Structure](#file-structure)
- [Scripts](#scripts)

## How to Use
To download and use this boilerplate:

1. Clone this repository to your local machine.
2. Navigate to the project directory in your terminal and run `npm install` to install the required dependencies.
3. Edit the `.env` file in the root directory of the project and add any necessary environment variables (if you are using MONGODB)
4. Run ⭐ 'npm run dev' ⭐ to start the webpack-dev-server and the backend server concurrently. This command will start the webpack-dev-server with hot reloading enabled and it will start your backend server as well.
5. The frontend application will be served at `localhost:3033` and the backend server will be running on port 3040 (you can change this in the `webpack.config.js` and `server.js` file)


## Dependencies
This boilerplate uses the following dependencies:

### dependencies
- `bcryptjs`: library used to hash passwords
- `cookie-parser`: parses cookies attached to the client request object
- `cors`: enables Cross-Origin Resource Sharing
- `dotenv`: loads environment variables from a .env file
- `express`: web framework for Node.js
- `jsonwebtoken`: used to create and verify JSON Web Tokens
- `mongoose`: interact with MongoDB
- `react`: building user interfaces
- `react-dom`: package provides DOM-specific methods for React

### devDependencies
- `@babel/core`: core package required for Babel to work
- `@babel/eslint-parser`: parser that allows ESLint to understand new JavaScript syntax features
- `@babel/preset-env`: package that automatically determines the Babel plugins and polyfills needed based on the target environment
- `@babel/preset-react`: preset that enables Babel to transform JSX into regular JavaScript
- `babel-loader`: webpack loader for transpiling JavaScript using Babel
- `concurrently`: tool for running multiple commands concurrently
- `css-loader`: webpack loader for handling CSS files
- `eslint`: linter for identifying and reporting on patterns found in code
- `eslint-plugin-react`: provides additional ESLint rules specifically for React
- `eslint-plugin-react-hooks`: provides additional ESLint rules specifically for React hooks
- `file-loader`: webpack loader for handling file imports in JavaScript and CSS
- `html-webpack-plugin`: simplifies creation of HTML files to serve your webpack bundles
- `nodemon`: automatically restarts your Node.js application when file changes are detected
- `sass`: CSS preprocessor that extends CSS syntax with features like variables and mixins
- `sass-loader`: webpack loader for handling SASS/SCSS files
- `style-loader`: webpack loader for injecting styles into the DOM
- `webpack`: module bundler for JavaScript
- `webpack-cli`: command-line interface for webpack
- `webpack-dev-server`: development server that provides live reloading and other features for webpack

## File Structure
This boilerplate has the following file structure:
```
├── LICENSE
├── README.md
├── client
│   ├── components
│   │   └── App.jsx
│   ├── dist
│   │   ├── bundle.js
│   │   ├── bundle.js.LICENSE.txt
│   │   └── index.html
│   ├── index.html
│   ├── index.js
│   └── stylesheets
│       ├── _styles.scss
│       ├── _variables.scss
│       └── application.scss
├── package-lock.json
├── package.json
├── server
│   ├── routes
│   │   └── api.js
│   └── server.js
└── webpack.config.js
```

## Scripts
This boilerplate provides the following scripts:

- `start`: Starts the server using nodemon and the `server.js` file. This script is used for starting the application in production mode after building the frontend.
- `dev`: Starts the webpack dev server and the backend server concurrently. This script is used for starting the application in development mode with live reloading. The frontend will be served at `localhost:3000`, and the backend server will be running on port 3040.
- `build`: Builds the project for production using webpack. This script is used for building the project for production. It will bundle all the JavaScript, CSS, and other assets and create a `dist` folder in your project directory.

To run these scripts, use the command `npm run [script]` in your terminal.

