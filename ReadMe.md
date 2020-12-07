# MERN eCommerce Project - TelePhono

TelePhono is a mock eCommerce website designed to provide a shop interface for users to purchase phones. Users can browse new or popular phones, or search the database for products based on category, price range, or name. Once signed up, they can add products to their cart and confirm a purchase by Visa or Paypal with BrainTree's sandbox implementation, and they receive a confirmation email to their registered address after the database has confirmed their order. 

Futhermore, a user can sign up to be an administrator. This allows them to manage products (adding new products or updating current products), product categories, and updating current order statuses.  

The current version is live! [Check it out here](https://telephono.netlify.app/)

## How to use

### Browsing products

When the application is running in the browser, the user is presented with the site description and the most recently added product in the splash page. Immediately below is a search bar, where the user can immediately search by keywords and categories. At the bottom of the main page are two lists of the top three most popular (most purchased) and most recent products. 

At the top of the navigation is easy access to a 'shop' page, where products are filtered (by price and category) and listed by user input. Next to it is a 'Cart' link, which shows the user what products they have added to their cart, or redirects them to sign up if they haven't done so already. 

Last in the top navigation bar is the button which reveals more options. These options are presented depending on the state of user authentication - not signed in, signed in, or administrator. A signed-in user will have the options of reviewing their account details, reviewing their order details, and logging out. An administrator will have access to an administrative page, where they can manage and update products, product categories, and current order statuses. 

If a user successfully confirms a purchase throught their cart checkout, the order will be saved to the database and made visible to administrators to be updated. The user (and myself, personally) will recieve an email from the server with a 'thank you!' their order details.  

If the administrator successfully adds a new product, it will appear in the front page, and will be able to found by the search features of the application.   

## Dependancies

### Client

- react
- react-dom
- react-router-dom
- react-lazy-load-image-component
- jest
- axios
- material-ui
- braintree
- node-sass
- query-string

### Server

- express
- express-jwt
- express-validator
- mongoose
- crypto
- bcryptjs
- cookie-parser
- body-parser
- uuid
- formidable
- jsonwebtoken
- braintree
- sendgrid
- jest
- sinon
- supertest

## Installation

**Note** Sensitive material such as passwords and keys to the APIs that I use are omitted. If you want to run the full application in development mode, you will need to make accounts with the variety of services used. If this is in your interest, let me know and I will happily help set you up in your local environment. If you're here to see it being implemented, [check it out live here](https://telephono.netlify.app/). 


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

## Objectives

- Construct an API using Node and Express that will handle CRUD operations for users, products, categories, and orders with our MongoDB database. Use a sandbox payment system, send emails to the user on order confirmation.

- Construct a React client that will provide an interface for users to sign up, log in, view products, and purchase products through our API. Allow for administrators to create, update, and delete relevant material. Have two levels of private routes; one for administrators, one for registered users.

- Once a first version is completed, review todo's for obvious improvements and bugs to fix

## User stories

As a user, I would like to...

- [x] See a collection of phones for purchase
- [x] Be able to search for a phone by name
- [x] Be able to search for a phone by category
- [x] Be able to create an account

- [x] Be able to have an account so that I...
  - [x] Can review my cart when I last visited the website if I didn't confirm a purchase
  - [x] Can confirm the details of my purchase once made
  - [x] Can be able to add a product to my cart
  - [x] Can be able to pay by credit card
  - [x] Can recieve a confirmation email of my order
  - [ ] Be alerted of new inventory
  - [ ] Be informed if this product is or isn't in stock before they can add it to their cart

As an administrator, I would like to...

- [x] Have private routes exclusive to myself and other administrators

- [ ] Be able to manage products

  - [x] Add a new product
  - [x] Update an existing product
  - [ ] Delete an existing product

- [x] Be able to manage product categories

  - [x] Add a new product category
  - [x] Update an existing category
  - [x] Delete an existing category

- [x] Be able to manage orders
  - [x] View all orders
  - [x] Update an order's shipping status
  - [x] Receive an email informing me of a new order (to my own email, for the purposes of this project)

## Todos (server):

- [ ] Each model and service should have their own tests
- [ ] Routes, though working, feel a bit messy / non-uniform. Refactor after test coverage.
- [ ] Error Handling: while the server works if as intended if it recieves ideal conditions, the responses it gives when requests are lacking are unclear and are not conducive for user experience. Fix that.
- [ ] Endpoints need to have their tests

## Todos (client):

### General

- [ ] Revert from BEM to a more readable practice of intuitive attributes and nesting with SCSS

### Content

- [x] Make some dummy products for the app across several categories and price ranges
- [ ] Update the price ranges to reflect the spectrum of these products

### Components and features

- [x] Product card: text block moves and varies in size depending on content. Change it so that it always has the same size and positioning.
- [x] Make address manditory in validation for checkout
- [ ] Reroute to 'my orders' page when an order is made (user)
- [ ] Reroute to home page when a new product is made (admin)
- [ ] Reroute to categories page when a new category is made (admin)
- [ ] Buttons: make a reusable component and use only that one (including styling)
- [ ] Selectors: make a reusable component and use only that one (including styling)
- [ ] Success/error messages need their styling finished
- [ ] There's no option to delete existing products
- [ ] There's no error message when a new product form is lacking information, or when the image is above 1 MB in size

- [ ] Research and use react memo to prevent needless rerendering
- [ ] Desktop: CTA above seach should be aligned with the input field
- [ ] Mobile: 'administrative control' should be center-aligned
- [ ] Utility function to clean those brutal timestrings
- [ ] Test coverage

### Bugs

- [x] The category filter in the shop page isn't functioning properly (inverted?)
- [ ] The 'load more' feature doesn't wor



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
