# Cesium "Materials" Demo Application

### Starting the application
Before starting the application ensure that you have the LTS version of NodeJS installed on your machine. 
Take the following steps to start the application:

1. Install dependencies with npm. Use the command `npm install` to download all dependencies via npm.
2. Compile the sever TypeScript code. Use the command `npm run build:server` to compile the NodeJS server code, written in TypeScript, to JavaScript. The compiled JavaScript will be saved in the `dist` folder and is used to run the server.
3. After compiling the server TypeScript, start the server with the command `npm run start:server`
4. Start the React app with the command `npm run start`

### Unit Tests
The unit tests are implemented using the Jest test runner that is bundled with Create React App. For this project I was only able to create unit tests for the server side in a reasonable time window. These tests were valuable in ensuring the REST API is reliable and for reducing overall application risk. I focused my testing strategy on the server side unit tests due to the nature of REST APIs and because I consider the API to be the foundation of the application. The Unit tests allowed me to front end React code base with confidence knowing the server has been tested with unit test cases for happy path scenarios and bad input data.

To run the unit tests use the command `npm run test:server`.

There is a separate command for running React unit tests, also using the Jest test runner, `npm run test`. However I did not have enough time to implement a testing strategy for the React components. If there was more time to develop this application I would have added several unit tests for each reusable component, mainly testing any conditional rendering functionalities and ensuring that the rendering of each component was tested in various scenarios.

### Server
I used the Express implementation of a NodeJS server for to create the REST API. I chose the Express framework because of it's simple and robust features. Express servers are easy to create, and flexible enough to create applications with scalable and testable architecture. Express servers allow for various middleware that came in handy when quickly creating NodeJS REST API that could be thoroughly test and even scaled to larger applications. 

The server architecture is designed to be testable and scalable. There are four layers of architecture to this application: 

1. Request handlers responsible for incoming HTTP requests
2. A repository layer that is an abstract layer between the requests and the data fetching
3. A Data layer that fetches the data from data sources
4. A domain model layer that is an abstract representation of the business entity, in this case a Material.

For a small demo appliation like this, it would have been faster to combine everything inside of the request handler functions and still build a functioning REST API that follows REST conventions. However, for a little bit of extra planning time I was able to create testable components to the Express server that would reduce the overall risk of quickly creating a REST API application. For example, the repository layer allows the engineers to easily substitute data providers without changing the application code. This is demonstrated through usingn in-memory simulation of generic CRUD database applications in the class `InMemoryTestAdapter`. I originally created this class as a way to write unit tests. We could have easily swapped out the `InMemoryTestAdapter` class with another one that is responsible for directly interfacing with a database or some other form of persistant storage. I also started working on a `SqliteAdapter` that would have implemented actual database operations but I did not have enough time to finish. So the application is using this in-memory simulation of a database, but a real database could be substituted without a major refactor of the server.

### React App
Create React App is fantastic bootstrapping tool used to get a React application up and running very quickly. I used Create React App because it was fast and I'm very familiar with its tools. Create React App includes options to bootstrap an application with TypeScript and Redux Toolkit built-in, so it was very easy for me to get those complicated tools integrated into the application. This is why I used complicated tools like Redux and TypeScript, because Create React App makes it easy. Throughout the app I leaned on Redux because of the recent innovations via Redux Toolkit and because it easy to get started with Create React App. These tools make the front end application very scalable.

### Areas for improvement
In this section I am just going to mention a few things that I would have liked to include with the app but I did not have enought time. I spent about 4 hours total working on the application. It was hard for me to pry myself away from working on the app because I enjoy building out these types of applications and designing systems in a testable and scalable way.

#### Optimistic UI
Currently the app makes a couple of API request any time a form input is changed on the `<MaterialForm />` component. The requirments indicated that this was the desired effect, to have the UI update and the data be saved as the user inputs, and not have explicit save or cancel buttons. If I had more time I would have introduced some sort of caching or debouncing system that would have prevented so many requests from being made. I would really have loved to optimize the requests / user interface that would minimize the number of network calls while still using the desired optimistic UI design.

#### Client unit tests
I like to include React component unit tests but in this case did not get to work on them. Normally I would have included at the very least some tests for the conditional rendering logic within the components. If there was more logic in the front-end I might have prioritized the front end test more. Another candidate for front-end unit tests would be related to the form.

#### Client side validation
While I made an attempt to validate and test incoming data on the REST API, I was not able to create a system for validating the form in the `<MaterialForm />` component. I used Formik to manage the form state, and it supports data validation, I just did not get to finish that.

#### Styling
I included Bootstrap classes and components to speed things up and get a close representation of the design specs. However I did not have enough time to go back and update the css classes to match the colors, font, padding, spacing...etc provided in the design documents. I'm comfortable creating component styling using CSS or SASS or using frameworks like bootrap. I chose to use bootstrap because it's a framework I am familiar with.


### Summary
I enjoyed working on this project and made an effort to demonstrate good architectural design, testing, and meeting the requirements. Some I took some extra time to add some features that may not be necessary in a demo app, but features that I think are valuable to software applications. I included an extensive amount of logging on the server side because I believe logging is one of the most valuable tools for debugging in a production environment. I also tried to add as much documentation to my functions and components.