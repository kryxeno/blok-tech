# Application Structure

All of the website routes are defined in the server.js
I have all of the API's in a separate file, to organize the routing.

All my database queries go through a database file, which organizes the queries (and allows for better testing).

The client gets served the database at load and it can use these objects in clientside js.

I dont really have any cleaning of data, I just make sure it gets inserted correctly. I could use mongoose or prisma to make a couple models but for this project I did not find that necessary.
