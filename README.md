# Message store web service

A simple web service to store and retrieve messages (strings of text).

(This is a place for me to keep my work while learning Express + friends.)

Example usage of the service:

    $ curl $domain/messages/ -d 'my test message to store'
    {"id":12345}

    $ curl $domain/messages/12345
    my test message to store

# Development

???

# Running the test suite

???

# Installation

???

# Running the service

???

# TODO

* add licence headers to all source files
* make server settings configurable by file
* make db settings configurable by file
* unit tests - see https://glebbahmutov.com/blog/how-to-correctly-unit-test-express-server/
* use SQLite in memory for unit tests
* coverage reporting for unit tests
* add ORM, default to SQLite
* get server.startServer() to show the IP address the server is running on
* instructions to install as a service on Linux

# Bugs

Please report bugs to the github bug tracker at
https://github.com/townxelliot/message-store/issues

# Author

Elliot Smith &lt;elliot@townx.org&gt;

# Licence

Distributed under the MIT licence (see LICENCE-MIT.txt)
