# Application Structure

## Route structure

All of the website routes are defined in the server.js (the routes the user is supposed to visit).
I have all of the API's in a separate file, to organize the routing.

## Client / server flow

All my database queries go through a database file, which organizes the queries (and allows for better testing).

The client gets served the database at load and it can use these objects in clientside js.

The client then makes a few API calls, and sometimes uses the response for updating the page.

For example, the user can save an application. The API call takes the id of that application, and adds it to a list of saved applications. To display those, the array of these saved applications will be matched alongside all the applications in the database.

## Processing of data on the server

I dont really have any cleaning of data, I just make sure it gets inserted correctly. I could use mongoose or prisma to make a couple models but for this project I did not find that necessary.

I create new applications with a 3rd party application, which I then insert into the database. I update the current user's viewed and saved applications, as well as removing application when the user deletes them from the list.

I use the following mongo actions (these are not the actual database actions, but instead my database functions to make working with mongo more straightforward):

```
const insertOne = async (database, collection, data) => {

const insertMany = async (database, collection, data) => {

const getAllData = async (database, collection, sort) => {

const updateOne = async (database, collection, field, update) => {

const deleteOne = async (database, collection, field, update) => {
```

I think this is C, R, U and D (if you dont count the deleting as an update). It is technically a pull operation.
