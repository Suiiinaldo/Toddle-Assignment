This is a base node js project template, which anyone can use as it has beenprepared, by keeping some of the most important code principles and project management recommendations. Feel free to change anything.

`src` -> Inside the src folder all the actual source code regarding the project will reside, this will not include any kind of tests. (You might want to make separate tests folder)

Lets take a look inside the `src` folder

 - `config` -> In this folder anything and everything regarding any configurations or setup of a library or module will be done. For example: setting up `dotenv` so that we can use the environment variables anywhere in a cleaner fashion, this is done in the `server-config.js`. One more example can be setup your logging library that can help you to prepare meaningful logs, so configuration for this library should also be done here.

 - `routes` -> In the routes folder, we register a route and the corresponding middleware and controllers to it.

 - `middlewares` -> They are just going to intercept the incoming requests where we can write our validators, authenticators, etc.

 - `controllers` -> They are kind of the last middlewares as post them you call business layer to execute the business logic. In controllers we just recieve the incoming requests and data and the pass it to the business layer, and once business layer returns an output, we structure the API response in controllers and send the output.
 
 - `repositories` -> This folder contains all the logic using which we interact the DB by writing queries, all the raw queries or ORM queries will go here.

 - `services` -> Contains all the business logic and interacts with the repositories for data from the database.

 - `utils` -> Contains Helper methods, error classes, etc.

### Setup the Project
 - Download this template from github and open it in your favourite text editor.
 - Go inside the folder path and execute the following command:
    ```
        npm install
    ```
 - In the root directory create a `.env` file and add the following env variable
    ```
        PORT = <port number of your choice>
    ```
    example:
    ```
        PORT = 3000
    ```
 - Go inside  the `src` folder and execute the following command:
    ```
        npx sequelize init
    ```
 - By executing the following command you will get the migrations and seeders folder along with a config.json file inside the config folder.
 - Inside the `src/config.json` folder create a file named `config.json` and write the following code:
    ```
        {
            "development": {
                "username": "root",
                "password": "mypassword",
                "database": "database_development",
                "host": "127.0.0.1",
                "dialect": "mysql"
            },
            "test": {
                "username": "root",
                "password": null,
                "database": "database_test",
                "host": "127.0.0.1",
                "dialect": "mysql"
            },
            "production": {
                "username": "root",
                "password": null,
                "database": "database_production",
                "host": "127.0.0.1",
                "dialect": "mysql"
            }
        }

    ```
 - If you are setting up your development environment, then write the usename of your db, password of your db and in dialect mention whatever db you are using for ex: mysql, sqlite, mariadb, etc.
 - If you are setting up your test or prod environment, make sure you also replace the hosted db url.
 - To run the server execute the following command :
    ```
        npm run dev
    ```