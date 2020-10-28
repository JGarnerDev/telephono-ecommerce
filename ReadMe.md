# MERN Ecommerce Project

An original app, a popular concept. HUA!

## Summary

To show how far along I've come with learning, it's time to create a complete e-commerce project with the MERN stack. Mongo, Express, React, and Node are all familiar territory for me, so the challenges with pulling it all together will be refreshing feather in my cap.

Phones are a ubiquitous and visually interesting product, so I will pick them as a subject matter.

## Objectives

- Implement TDD with Jest and Jest-Enzyme to ensure a solid codebase with broad test coverage.

- Construct an API using Node and Express that will handle CRUD operations for users and products with our MongoDB database. User validation will be done with JSON Web Tokens.

- Construct a React client that will provide an interface for users to sign up, log in, view products, and purchase products through our API. This will be a good opportunity to practice React Hooks.

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

## Testing

In general, I will use the Jest library for testing, with Sinon brought in for mocking and observing data.

### Testing Commands

Test packages are separated between server and client. To run all tests pertaining to the back end or the front end, first use the console to change directories...

> cd ./server

or

> cd ./client

Then run this command

> npm test

## Todo List

1. Setting up the server

   - ~~Create a new MongoDB database~~
   - ~~Create a baseline server for testing purposes~~
   - ~~Install Jest, conduct a sanity test on the express app and both users and products routes~~

   - Sketch out primary features of application as they relate to the database and server
   - Plan user and product models according to functionality of the project
   - Create tests for user and product models with criteria established in plan
   - Code user and product models until they pass tests
   - Plan user and product service functions according to functionality of the project
   - Create tests for user and product service functions with criteria established in plan
   - Code user and product service functions until they pass tests
