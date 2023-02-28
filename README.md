# Setting up Job tracker

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Install PostgreSQL and clone project


### Setting up frontend

Navigate into project and run:\
	`npm install`

To start app, run:\
	`npm start`


### Setting up backend

Navigate into server folder and run:\
	`npm install` OR `npm init` and step through default options

Install Express PG and CORS:\
	`npm i express pg cors`

Install nodemon globally to automatically refresh server when there are changes to database:\
	`npm install -g nodemon`

`sever/index.js` contains server info and database calls.

To start server, open a separate terminal and run:\
	`nodemon index`


### Setting up PostgreSQL

Create and set database name and password

Create table and run following script:

`CREATE TABLE companies (
    id integer NOT NULL UNIQUE,
    company_name varchar(50),
    job_role varchar(50),
    date_applied date,
    app_status varchar(50)
);`

Connect to database:\
Replace pool configurations in `server/job_appsDB.js` with your corresponding info.

Verify calls on Postman
