https://github.com/Oscar6/app-tracker/assets/7444980/02cd4071-5488-40df-bd92-5f228ab88238


# Setting up Job tracker

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Install PostgreSQL and clone project


### Setting up frontend

Navigate into project and run:\
	`npm install`

To start app, run:\
	`npm start`


### Setting up backend

To connect database, make a file in your server folder that contains your DB properties:\
	Ex. jobs_db.js

Apply the following properties with your DB info to the file:

```
	const Pool = require("pg").Pool;
	const pool = new Pool({
		user: "{username}",
		password: "{password}",
		host: "localhost",
		port: 5432,
		database: "{name_given_to_db}"
	});

	module.exports = pool;
```

Navigate into server folder and run:\
	`npm install` OR `npm init` and step through default options

Install Express, PG and CORS:\
	`npm i express pg cors`

Install nodemon globally to automatically refresh server when there are changes to database:\
	`npm install -g nodemon`

`server/index.js` contains server info and database calls.

To start server, open a separate terminal and run:\
	`nodemon index`


### Setting up PostgreSQL

Create and set database name and password

Create table and run following script:

```
CREATE TABLE companies (
    id integer NOT NULL UNIQUE,
    company_name varchar(50),
    job_role varchar(50),
    date_applied date,
    app_status varchar(50)
);
```

Verify calls on Postman

****** ****** ****** ******
Send tacos if this app is helping


[<img alt="alt_text" width="50px" src="https://github.com/Oscar6/app-tracker/blob/main/public/images/venmo_Oscar-M.png?raw=true" />](https://account.venmo.com/u/Oscar-M) [<img alt="alt_text" width="50px" src="https://github.com/Oscar6/app-tracker/blob/main/public/images/paypal_dumbdumbdev.png?raw=true" />](https://www.paypal.me/dumbdumbdev)
