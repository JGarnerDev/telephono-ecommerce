# MERN Ecommerce Project

An original app, a popular concept. HUA!

## Summary

To show how far along I've come with learning, it's time to create a complete e-commerce project with the MERN stack. Mongo, Express, React, and Node are all familiar territory for me, so the challenges with pulling it all together will be refreshing feather in my cap.

I firmly beleive that test-driven development - while not always a viable option for companies - is a great means for ensuring a stable product. It's in my interest as a developer to implement it, despite it being time consuming. It will be used during this project for both the Node and Express server, as well as the React front end.

Phones are a ubiquitous and visually interesting product, so I will pick them as a subject matter.

## Objectives

- Implement TDD with Jest and Jest-Enzyme to ensure a solid codebase with broad test coverage.

- Construct an API using Node and Express that will handle CRUD operations for users and products with our MongoDB database. Use Mongoose for Schematization. User validation will be done with JSON Web Tokens.

- Construct a React client that will provide an interface for users to sign up, log in, view products, and purchase products through our API. This will be a good opportunity to practice React Hooks.

- Once a first version is completed, add to the primary features

## Primary features

As a user, I would like to...

- See a collection of phones for purchase
- Be able to search for a phone to purchase by name
- Be able to search for a phone to purchase by category
- Be able to add a product to my cart
- Be informed if this product is or isn't in stock
- Be able to pay by credit card
- Be able to have an account so that I...
  - can review my cart when I last visited the website if I didn't confirm a purchase
  - be alerted of new inventory
  - can confirm the details of my purchase once made

## Installation

### Server

To get the server up and running after pulling the root directory, change directories to the server by the client command:

> cd ./server

Then install the required modules:

> npm install

I used nodemon for development, which is initiated by the following command:

> npm start

**Note**: Since it's good practice to hide your API keys and sensitive data, my personal .env file is excluded from the repository. It is necessary to create your own to have it run locally. To do so, follow these steps:

    1. Create a file named '.env' in the server directory
    2. Write in this file 'PORT=<some number>' ex: PORT=3210
    3. Make a remote database on www.mongodb.com, and retain the user name and password for your collection for steps 4 and 5
    4. In the .env file, write 'DB_USER=<username>'  ex: DB_USER=FooBar
    5. In the .env file, write 'DB_PASS=<password>'  ex: DB_USER=sWJSRkdhX92ctOTD
    6. Good to go!

## Testing

In general, I will use the Jest library for testing, with Sinon brought in for mocking and observing data.

Furthermore, the structure of things leans towards a preference of unit over intergration testing. Each test file will have an introductory commentary to state exactly what is being tested, and the sum of all these commentaries hopefully will describe the breadth of the app's functionality (i.e. that this entire application will have all its faculties tested to an extent).

**Tests in the server directory will assume that you have MongoDB Database Server locally installed!**

### Testing Commands

Test packages are separated between server and client. To run all tests pertaining to the back end or the front end, first use the console to change directories...

> cd ./server

or

> cd ./client

Then run this command

> npm test

For easier development, I've made custom commands to initiate Jest in watch mode for particular modules. You can see them made explicitly in the package.json of either client or server directory, and here's an example of the format:

To test the express app endpoints:

> cd ./server
> npm run test:app

To test the user model CRUD operations (in the same directory):

> npm run test:user_model

## Todo List

1. Setting up the server

   - ~~Create a new MongoDB database~~
   - ~~Create a baseline server for testing purposes~~
   - ~~Sketch out primary features of application as they relate to the database and server~~
   - ~~Install Jest, conduct a sanity test on the express app and both users and products routes~~

   - ~~ Code the user model using mongoose and ensure that CRUD operations work properly ~~

     - ~~Add typed properties (name, email, etc) to the model that will ensure that user objects, when saved to the db, will be consistent.~~
     - ~~Add methods to the user model so that sensitive data is encripted and that user can be authenticated. ( use sha1 for now, test sha256 later)~~

   - Code the product model using mongoose and ensure that CRUD operations work properly

     - ~~Basic shape of the user model~~

   - ~~Code and test utility functions for server-side validation of...~~

     - ~~User name and password (must be string, 0 < length < 32)~~
     - ~~Email (use regex to get a loose pattern (ex: a@a.com is acceptable))~~

2. Endpoints

   - ~~ Create and test protected users list endpoint ~~
   - ~~ Create and test user sign up, sign in, and sign out endpoints~~
   - Create and test authentication middleware 
     - ~~Manual tests to confirm authentication through JWT cookie is working~~
     - Intergration test to confirm authentication and sign in is working  
   - Create and test protected routes
