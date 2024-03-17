# Formula 1 Race Visualizer Web App

This web application is built to consume data from the Ergast API ([http://ergast.com/mrd/](http://ergast.com/mrd/)), which provides lap timing and related data for Formula 1 races. The goal of this project is to create a robust, maintainable, and accurate solution that allows users to select a specific race event and visualize the race data in an interactive and informative manner.

## Features

- Allows users to select a specific Formula 1 race event.
- Presents visualizations to help users understand what happened during the race.
- Communicates race data visually in an interactive tool.
- Provides levels of detail to enhance the user's understanding of the race.

## Technologies Used

- TypeScript: Ensures type safety and improves code quality.
- React: Provides a modern and efficient framework for building user interfaces.
- Tailwind CSS: Allows for rapid styling and customization.
- Jest and React Testing Library: Ensures robustness through comprehensive testing.
- Docker: Enables easy deployment and scalability of the application.

## Getting Started

### Prerequisites

Before running the application, make sure you have the following installed:

- Node.js and npm (or yarn) ([Download Node.js](https://nodejs.org/))
- Docker ([Download Docker](https://www.docker.com/))

### Running the App

Using Create React App
To run the application using Create React App's development server:

` npm start` or `yarn start `

Open [localhost:3000](http://localhost:3000)in your browser to view the app.

Using Docker
To run the application in a Docker container:

```
docker build -t formula1-race-visualizer --progress=plain . &> build.log
docker run -p 8080:80 formula1-race-visualizer
```
Open [localhost:8080](http://localhost:8080) in your browser to view the app.

