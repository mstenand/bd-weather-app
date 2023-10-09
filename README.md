# bd-weather-app
A simple weather application that displays the current weather and forecast for the Better Developer's office location.

# Prerequisites
In order to run the application, you need to install the following tools:
- [Angular CLI](https://angular.io/guide/setup-local)
- [NodeJS](https://nodejs.org/en) (version 18 or greater)
- [Redis](https://redis.io/)

# How to run?
Remember to install the required dependencies before running the application:
- Open a terminal window
- Navigate to the `cors-proxy-server` folder in the project and run the command `npm install`.
- Nvigate to the `bd-weather-app` folder in the project and run the command  `yarn install` or `npm install`.

To run the application, follow these steps in order:
- Open a terminal window from anywhere and start the Redis server using the command `redis-server`.
- Open another terminal window and navigate to the `cors-proxy-server` folder in the project and run the command `npm start`.
- Open yet another terminal window and navigate to the `bd-weather-app` folder in the project and run the command `ng serve`.
  - The application should now be running on `localhost:4200`.

# Overview
The application is two part and consists of an Angular application and an Express server.

## The Angular application
Noteworthy features include:
- An [NgRx](https://ngrx.io/) `store` for managing state using the `redux` pattern
  - The benefit of using the `NgRx store` is that the same state, in this case weather forecast data, can be shared between many different components. As the components retrieve their state from one single shared global store, there is no need for each component to talk to an API service in order to hydrate their state which avoids unnecessary API calls.
- An `HTTP client service` for communicating with weather APIs and translating the response into a model that can be used by the rest of the application.
  - The current implementation uses the open weather api provided by [yr.no](https://docs.api.met.no/doc/devel.html).
- A `domain model` of forecast data.
  - The model provides an abstract `adapter` method which the HTTP client service uses to translate the HTTP response into a usable object. Similar to adapter pattern, although not quite the design the gang of four proposed.

## The Express server
A proxy server that communicates with the weather API on behalf of the frontend application. This is needed as the frontend application and the weather API are on different domains and therefore likely to run into the infamous [cross-origin resource sharing (CORS)](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing) error. To properly configure the CORS headers, you need to be in control of the server. As this is not the case with the weather API, a proxy server is used to handle communication.

In addition to handling CORS, the proxy server also uses [Redis](https://redis.io/) to cache the response from the weather API, which is a requirement by [yr.no](https://docs.api.met.no/doc/devel.html) to avoid being throttled when making many consecutive requests in a row.

# Screenshot
![image](https://github.com/mstenand/bd-weather-app/assets/98669500/32a91506-3c16-40de-9052-65eecec05fbd)
