# Notflix
Notflix is a fullstack application based on video-streaming applications such as Netflix or Hulu. Users can create accounts, log-in, search for movies or TV shows that exist in the database, browse available offerings, save content to a "favorites" list, and view video content, as well as obtain more information about any given offering by clicking on its poster. Plans exist to implement administrator functionalities, including modifying content and deleting user accounts.

The application is built upon the MERN stack, using MongoDB for its database, ExpressJS and NodeJS for server-side processing, and React for the frontend. The base seeding of the database was done using a custom-built web scraper.

In this repository, there exists a `notflix-app` folder, which represents the user front-end, the `api` folder, which represents the application's backend, and the `data-seed` folder, which houses the web scraper built for the initial database data.

## Technology Used
Technology used includes, but is not limited to:
* React
* MongoDB
* Mongoose
* NodeJs
* ExpressJS
* Jest
* react-testing-library
* JSON Web Tokens (JWT)
* Stylistically Awesome Style Sheets (SASS)
* Axios
* Cheerio

## Local installation
To install the project locally, clone it on to your computer and run `npm install` from within the `api` and `notflix-app` folders in order to install all necessary dependencies. Additionally, contact the project owner to receive any necessary environment variables, to be placed in `.env` files. Then, from `cd` into the `api` folder, run `nodemon index.js` to begin running the backend server. From another terminal, `cd` into the `notflix-app` folder and run `npm start` to begin running the front end. The project should open automatically in localhost:3000.

To run automated tests, `cd` into the `notflix-app` folder and run `npm test`. All tests should run without any failures.
