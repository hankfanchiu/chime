# Frontend

As a single-page application, Chime utilizes the React.js framework and follows the Flux architecture to deliver the frontend.

## npm

Node package manager (npm) is used to install all of the frontend dependencies.

A post-install script is configured so that webpack bundles all of the frontend files after the deployment to Heroku is complete.

## Webpack

Webpack conveniently bundles all of the frontend components and Flux parts. The bundled file is located in `/app/assets/javascripts` and included in the main `application.js` file.

## React & Flux

All of the React components, Flux action creators, API utilities, dispatcher, and stores are located in the [frontend](../frontend) directory.

## jQuery

jQuery is only used to make AJAX requests with the Rails server.

## Bootstrap & Sass

Site layout and styling are done with Bootstrap and Sass. React Bootstrap expedited the building out of the React components that utilized Bootstrap.

## Others

Other frontend dependencies are:

- React DOM
- React Router
- React History to manipulating the browser history
- React Linked State Mixin
- Keymirror for app constants (used among the action creators and the stores)
- Babel for transpiling JSX into JavaScript.
