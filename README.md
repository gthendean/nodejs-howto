nodejs-howto
============

Contains examples of how-to do things with Node.js

## How-to Run examples ##

Each files can be "Run" independently, except indicated below.

Express - 'run index.js'

SimpleHttpServer - `run index.js`

## Unresolved Issues ##

- Express/index.js - request to external resource did not work with the following error

    <pre>
    stream.js:94
          throw er; // Unhandled stream error in pipe.
                ^
    Error: getaddrinfo ENOTFOUND
        at errnoException (dns.js:37:11)
        at Object.onanswer [as oncomplete] (dns.js:124:16)
    </pre>

## Node.js ##

What you can build with Node.js
- Websocket server
- Fast File Upload Client
- Ad Server
- Any real-time data apps (between network servers)

## Useful Modules ##

- [prettyjson](https://www.npmjs.org/package/prettyjson)

## References ##

- [Node.js API documentation] (http://nodejs.org/api/)

- Tutorial NodeJS
   - [Events](https://www.youtube.com/watch?v=5foad8PygGM)
   - [Streams](https://www.youtube.com/watch?v=9Ui3DaNO7lE)
   - [Modules](https://www.youtube.com/watch?v=txW0rKTYVK4)
   - [Express](https://www.youtube.com/watch?v=WkJyEBz0PTY)
   - [Socket.io](https://www.youtube.com/watch?v=mtDK4jf4RS0)

- TBD