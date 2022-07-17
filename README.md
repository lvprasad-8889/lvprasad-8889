# Techwondoe Screener

This is a submission for Techwondoe screener round one.

## Table of Contents1

1. [Todo List](#todo-list)
2. [Software Requirements](#software-requirements)
3. [Dependencies](#dependencies)
4. [Running the Solution without Docker](#running-the-solution-without-docker)
   - [Initialising the Express Server](#Initialising-the-express-server)
   - [Initilaising the React Application](#Initialising-the-react-application)
5. [Running the Solution with Docker](#running-the-solution-with-docker)
   - [Creating Image for ReactJS Apllication](#creating-image-for-react-application)
   - [Creating Image for NodeJS Apllication](#creating-image-for-react-application)
   - [Running Multiple Containers](#running-containers)
6. [Additional Features](#bonus-features)
   - [Toasters](#toasters)
   - [Content of Review](#content-of-review)
   - [Image Link for TvShow](#image-for-tv-show)
7. [Future Scope](#future-scope)
   - [Search TvShows](#liked-posts)
   - [Favourite TvShows](#saved-posts)
   - [Filtering TvShows](#hide-user-profile)

## Todo List

- [x] Developing front end and back end in typescript
- [x] Functional requirements
- [x] Prettier configuration
- [x] Dockerising the application
- [x] How to deploy and run the service
- [x] Improvements to the application

## Software Requirements

To run the application, the following are required:

- ReactJS - [Download Reactjs](https://www.javatpoint.com/react-create-react-app)
- NodeJS - [Download Node.js](https://nodejs.org/en/)

## Dependencies

For setting up dependencies in the frontend (React, React Redux, ...):

- In the terminal, change directory to `Client` folder
- Run `npm install`.

For setting up dependencies in the backend (Express, MongoDB, ...):

- In the terminal, change directory to `Server` folder
- Run `npm install`.

## Running the Solution without Docker

### Starting the Express Server

**Note: Express server must be run before running the React application**

- Open a new terminal, and then change the directory to `Server`.
- Run `npm run dev` to start the Express server.

### Starting the React Application

- Open another terminal, and then change the directory to `Client`.
- Run `npm start` to start the React application.
- Open the browser and enter http://localhost:3000.

## Running the Solution with Docker

**Note: No need to change the directory to run following commands**

- Open a terminal and run `docker build -t "react-app" ./Client/`

- After first command run `docker build -t "server" ./Server/` in same terminal.

- After second command run `docker-compose up` in same terminal.

- Open the browser and enter http://localhost:3000.

### Open

## Additional Features

### Toasters

Toasters are used to informing,alerting or warning user like informing user login successfull after user entering correct credentials.

### Content of Review

Review of each tv show is limited to thirteen words by default, can see complete review by clicking read more and can hide review by clicking read less.

### ImageLink for TvShow

User can also add TvShow image link so that user can easily identify TvShow by seeing image of the TvShow.

## Future Scope

### Search TvShows

Search feauture can be added so that if there are so many TvShows user can find a TvShow easily.

### Favourite TvShows

A separate component can be created so that user can add his favourite TvShow to that component.

### Filter TvShows

Instead of showing all TvShows in one component dividing TvShows like Hit, Good, Average, Poor and Flop TvShows based on rating.
