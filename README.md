# Sample order-service
This project is a sample Node/Express RESTful service, also deployed on: https://sample-order-service.herokuapp.com/orders-data/
It contains controllers for querying users, 

## Development server

Run `npm start` for a dev server at `http://localhost:5000/`. Run `mongod` from the same directory to init the db connection. 
The app utilizes live reload if for any source files.

## Layout
- client (minimal HTML)
- data (data/db) for data
- server: app.js*, db-connection, model (Mongoose), routes controllers, utils(todo)

##TODOs
- Unit testing & CI
- Abstract any req processing to utils
- restrict CORS
- Add additional routes: e.g., subsets of orders, users.

- -->(Moving towards websockets): support status updates check (read on DB).
     Upon successful DB write, attempt to send message to a subscribed socketId.

