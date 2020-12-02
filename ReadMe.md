# MERN Ecommerce Project

An original app, a popular concept. HUA!

The current version is live! [Check it out here](https://telephono.netlify.app/)

## Summary

Hey there! This is TelePhono.

This project is a full-stack eCommerce website from scratch; the directory contains both a React client application and a Node server.

Why did I make it? While I feel versed with each of the elemental parts of web development when it comes to fetching and rendering, it is absolutely important to have first-hand knowledge of the challenges of combining all the necessary constituents that make a modern application that needs to connect to a database. There's logistics, planning, coordination, and problem solving unique to doing a project like this that can only be understood in the doing of it.

## Objectives

- Construct an API using Node and Express that will handle CRUD operations for users, products, categories, and orders with our MongoDB database. Use a sandbox payment system, send emails to the user on order confirmation.

- Construct a React client that will provide an interface for users to sign up, log in, view products, and purchase products through our API. Allow for administrators to create, update, and delete relevant material. Have two levels of private routes; one for administrators, one for registered users.

- Once a first version is completed, review todo's for obvious improvements and bugs to fix

## Primary features

As a user, I would like to...

- [x] See a collection of phones for purchase
- [x] Be able to search for a phone to purchase by name
- [x] Be able to search for a phone to purchase by category
- [x] Be able to add a product to my cart
- [] Be informed if this product is or isn't in stock before they can add it to their cart
- [x] Be able to pay by credit card
- [x] Be able to have an account so that I...
  - [x] can review my cart when I last visited the website if I didn't confirm a purchase
  - [x] be alerted of new inventory
  - [x] can confirm the details of my purchase once made

## Installation

### Server

To get the Node server up and running after pulling the root directory, change directories to the server by the client command:

> cd ./server

Then install the required modules:

> npm install

I used nodemon for development, which is initiated by the following command:

> npm start

### Client

The client is done with React and has some modules to install. From the root directory, get into the client folder with this command:

> cd ./client

Then install the required modules:

> npm install

React will run the development version with this command:

> npm start

**Note** The environmental variables are not included in this repository, so local development will attempt requests to an undefined address. To get a full experience, [check it out live here](https://telephono.netlify.app/). Otherwise, send me a message and I'll explain to you how to get these missing values through a process of subscriptions and setups.

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

## Todos (server):

### Done

### Big

- [] Each model and service should have their own tests
- [] Routes, though working, feel a bit messy / non-uniform. Refactor after test coverage.
- [] Error Handling: while the server works if as intended if it recieves ideal conditions, the responses it gives when requests are lacking are unclear and are not conducive for user experience. Fix that.

### Small

- [] Endpoints need to have their tests

## Todos (client):

### Done

- [x] Code update user account view
- [x] Code single product full display component
- [x] Product management view can really just be one component. The biggest difference is between adding and updating, which can be managed with conditional rendering.
- [x] Make an order component for order history
- [x] Product filter doesn't do the do when there's an empty string input. Make it bring products regardless.
- [x] Refactor product rendering at Home view and Search component

### Big

- [] BEM, as far as I understand it, isn't having the organizational impact that I would like. Write a short essay on it, and clean it up in favor of more legible SASS.
- [] Error messages at Login aren't working (due to the server-side error handling). Fix all of it by revising error handling server-side.
- [] Research and use react memo to prevent needless rerendering
- [] Test coverage
- [] Refactor the drop down selections into a reusable component, you animal
- [] offer reformating for images that are too big (and etc.)

### Small

- [] Mobile: 'administrative control' should be center-aligned;
- [] Make sure the 'load more' feature is working correctly with 7+ products
- [] Make address manditory in validation for checkout
- [] Utility function for those brutal timestrings
