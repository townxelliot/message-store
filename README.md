# Message store web service

[![Build Status](https://travis-ci.org/townxelliot/message-store.svg?branch=master)](https://travis-ci.org/townxelliot/message-store)

A simple web service to store and retrieve messages (strings of text).

Example usage of the service (see the next section for details
of how to get it running):

    $ curl http://localhost:3000/messages/ -d 'my test message to store'
    {"id":12345}

    $ curl http://localhost:3000/messages/12345
    my test message to store

# Running the application

The application can be run from a git clone of the project. After cloning
it, install the node dependencies with:

    npm install .

To start the application (including the HTTP server and the database 
access layer) on Linux (or similar *nix system), do:

    ./bin/message-store

On Windows you can try:

    node .\src\main.js

(I haven't tested this yet.)

By default, the application runs at http://localhost:3000.
(I plan to make this configurable later.)

# Development

You can lint the code (src/) with:

    gulp lint

You can lint the tests (test/) with:

    gulp lint-tests

# Running the test suite

To run the integration test suite, do:

    gulp test-integration

This starts the whole application, running the HTTP server (on a random port
higher than 8000) and configuring the database.

Note that the test suite uses an in-memory SQLite database. If you modify the
tests to use a persistent database, you will need to modify the code to
ensure that the database is emptied before each test runs (see the beforeEach()
hook in the integration tests under test/integration/).

# Database configuration

The connection to the database is managed by
[Sequelize](http://docs.sequelizejs.com/en/latest/). See the
[Sequelize docs](http://docs.sequelizejs.com/en/latest/docs/getting-started/)
for further options not covered here.

By default, the application uses an in-memory SQLite database to store
posted messages. However, by creating a JSON configuration file for the
database connection, you can make the message storage persistent.

Database configuration is stored in a JSON file with this format:

    {
      "dialect": "sqlite|mysql|postgres|mssql",

      # only for SQLite
      "storage": "/path/to/sqlite/file",

      # only for non-SQLite
      "database": "databasename",
      "username": "username",
      "password": "password",
      "host": "host",

      # alternative to "host" if using a socket for MySQL
      "socketPath": "/path/to/mysql/socket"
    }

You can tell message-store where the database configuration is by setting
the `MESSAGE_STORE_DB_CONFIG` environment variable, e.g.

    MESSAGE_STORE_DB_CONFIG=/home/me/my-config.json ./bin/message-store

Note that if you are using mysql, postgres or mssql as the dialect, you will
also need to install additional npm packages (message-store only installs the
SQLite package):

* Postgres: npm install pg pg-hstore
* MySQL: npm install mysql
* MSSQL: npm install tedious

## Examples

SQLite persisting to a file:

    {
      "dialect": "sqlite",
      "storage": "/home/me/message-storage.sqlite"
    }

MySQL configuration (using XAMPP socket):

    {
      "dialect": "mysql",
      "database": "message-store",
      "username": "message-store",
      "password": "password",
      "socketPath": "/opt/lampp/var/mysql/mysql.sock"
    }

NB you will need to create the database and user as per usual for a MySQL-backed
web application before running message-store.

# TODO

* add licence headers to all source files
* make server settings configurable by file or env
* unit tests for models, endpoints
* coverage reporting for unit tests
* automatic server reload when code changes
* proper logging, instead of just logging to console
* instructions to install as a service on Linux

# Bugs

Please report bugs to the github bug tracker at
https://github.com/townxelliot/message-store/issues

# Author

Elliot Smith &lt;elliot@townx.org&gt;

# Licence

Distributed under the MIT licence (see LICENCE-MIT.txt)
