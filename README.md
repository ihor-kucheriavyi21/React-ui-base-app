# React-ui-base-app
## React application with CRUD operations for book entity

Create 2 new pages for any entity currently in your database with CRUD (create/update/delete) operations.
The first page will display a list of entities. When hovering over each entity, the "Delete" and "Edit" buttons will appear. At the very top of the list of entities there will be a "Create" button.
When you click on the "Delete" button, a request should be sent to the CU to delete an entity by its id (After successful deletion, the entity should disappear from the list of entities)
When you click on the "Edit or Create" button, the page for editing / creating an entity should open. If the "Edit" button was pressed and loads data from the company code by the id of this entity. All data that is loaded from the server should be added to the reducer. If the page did not receive an id - this means that we are in entity creation mode.
At the end of the page for creating/editing an entity, there should be 2 buttons "Cancel" and "Save". When you click on the "Cancel" button, the entity list page should open and reload your data. When you click on the "Save" button, a request should be sent to the BU (create or edit) of the entity, and in case of a successful response, a redirect to the entity list page should be triggered.
