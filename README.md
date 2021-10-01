## E-Commerce Back End

```
   ____    __ _   _____   ____     __    __    __ _
  |  _ \  |  __| | ___ | |  _  \  |   \/   |  |  __|
  | |_| | | |__  | |_| | | | \  | | |\  /| |  | |__
  |    /  |  __| |  _  | | |  | | | | \/ | |  |  __|
  | |\ \  | |__  | | | | | |__| | | |    | |  | |__
  |_| \_\ |____| |_| |_| |_____/  |_|    |_|  |____| 
  ```

### Description
This is a small back end for an e-commerce site. It is configured using the Express.js API and Sequelize to interact with a MySQL database.
The database contains four models of: Category (id, category_name), Product (id, product_name, price, stock, category_id), Tag (id, tag_name), and Product Tag (id, product_id, tag_id).
Utilizing an application such as <a href="https://insomnia.rest/products/insomnia" target="_blank">Insomnia Core</a>, once you've initaiated the application and seeded the database (see installation instructions below) you can connect to your database and test API POST, PUT, and DELETE routes and will be able to create, update, and delete data in your database. 

### This is a part of the homework curriculum for the University of Arizona / Trilogy Education Services Coding Bootcamp
Below is an overview of the assignment's criteria.

### User Story
```md
AS A manager at an internet retail company
I WANT a back end for my e-commerce website that uses the latest technologies
SO THAT my company can compete with other e-commerce companies
```

### Acceptance Criteria
```md
GIVEN a functional Express.js API
WHEN I add my database name, MySQL username, and MySQL password to an environment variable file
THEN I am able to connect to a database using Sequelize
WHEN I enter schema and seed commands
THEN a development database is created and is seeded with test data
WHEN I enter the command to invoke the application
THEN my server is started and the Sequelize models are synced to the MySQL database
WHEN I open API GET routes in Insomnia Core for categories, products, or tags
THEN the data for each of these routes is displayed in a formatted JSON
WHEN I test API POST, PUT, and DELETE routes in Insomnia Core
THEN I am able to successfully create, update, and delete data in my database
```

### Project Demo

### Installation Instructions
First, clone the repo. 
```
git clone https://github.com/athaight/e-commerce-backend
```
###
Once the you've cloned the repo and opened it in VS Code you'll want to right click the server.js file and open in integrated terminal. In the terminal enter the following:
###
To install npm and dependenices:
```
npm i
```
###
Once npm has installed completely enter the following command into the terminal:
```
node server.js
```
###
This should begin the application in the terminal and output the connection to localhost PORT:3023 
(default PORT selection in the application is set to PORT 3023) 
###
If you have the program Insomnia then you can use it to listen to PORT 3023 and view the application, however, it may lack in functionality for testing. 
###
Else (and best) open a browser window and direct your browser to http://localhost:3023 and you should be set.