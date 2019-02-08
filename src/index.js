import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import App from './Components/App';

ReactDOM.render(
    
    <App />,document.getElementById('root'));


serviceWorker.unregister();


/*

Doing it this way, we can be assured that Firebase 
is only instantiated once and that it is injected 
via React’s Context API to React’s component tree. Now,
 every component that is interested in using Firebase has 
 access to the Firebase instance with a FirebaseContext.
 Consumer component. Even though you will see it first-hand 
 later for this application,
 the following code snippet shows how it would work:*/