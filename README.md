This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## App Features

### Conditional Logic and JavaScript Array Methods

This app uses conditional logic and JavaScript array methods to sort throught he Amiibo API and return the relevant information in cards. This code can be found in the [Amiibo.js](/src/Content/Amiibo/Amiibo.js) file.

### Function-based Amiibo Component

This app imports a .json file containing information about all the Amiibos ever realeased and displays the figure's name, game, series, and date of release in North America. The Amiibos are sorted by game.

### Using the useEffect Hook

The primary location of my useEffect code is in the [Amiibo.js](/src/Content/Amiibo/Amiibo.js) file.

### Using the useContext Hook

The primary location of my useContext code is in the [signContext.js](/src/contexts/signContext.js) file and it is then imported to the [Email.js](/src/Content/Email/Email.js) file.

### Using the useState Hook

My useState code is used in the [signContext.js](/src/contexts/signContext.js), [Amiibo.js](/src/Content/Amiibo/Amiibo.js), and [Email.js](/src/Content/Email/Email.js) files.

### User Input and Form Validation

This app uses Formik and Material UI in order to get user input and validate the information given in the form of a subcription box. This code can be found in the [Email.js](/src/Content/Email/Email.js) file.

### Custom Components

The custom components used in this app are [Amiibo.js](/src/Content/Amiibo/Amiibo.js), [ButtonAppBar.js](/src/Content/Bar/ButtonAppBar.js), [Contact.js](/src/Content/Contact/Contact.js), [Email.js](/src/Content/Email/Email.js), [Header.js](/src/Content/Header/header.js), and [Home.js](/src/Content/Home/Home.js).

### CSS Animations and Transitions

CSS animations and transitions are used in the [Header.js](/src/Content/Header/header.js) and [Email.js](/src/Content/Email/Email.js) components. These are animated in the [Header.css](/src/Content/Header/header.css) and [Email.css](/src/Content/Email/Email.css) files.

### Connecting to Server

This app is connected to the Amiibo API using Axios. This code can be found in the [Amiibo.js](/src/Content/Amiibo/Amiibo.js) component.

### React Router

React Router is used for the routing of this app. <code>Route</code> can be found in the [Content.js](/src/Content/Content.js) component. <code>Link</code> can be found in the [ButtonAppBar.js](/src/Content/Bar/ButtonAppBar.js) component.

### Hosted on Netlify

This app is hosted on Netlify and can be found at [https://reverent-poincare-d2d3a4.netlify.app/](https://reverent-poincare-d2d3a4.netlify.app/)

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
