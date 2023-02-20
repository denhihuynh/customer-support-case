# customer-support-platform

This project contains code for a code test for creating a customer support platform.

## The assignment

### Requirements

- The Customer Support Center wants to add, edit and remove Support Agents.
- Customers want to be able to report a case for returning a product.
- Your software should assign an available Support Agent to handle a case automatically
- Support Agents should be able to list and resolve all the current active cases and Customers can add a new case. An agent can have only one case at a time. When the case is resolved, it should be marked so - and the Support Agent should be free to take a new case

### Your goal

- Create a Fullstack application (Frontend + Backend + Database) to solve the above problem
- Simple UI where a Customer can report a case and the Customer Support Center can add a new Support Agent and/or resolve a case Show that you care for Software design and architecture
- Show your knowledge beyond boilerplate endpoints!
  
### Tech recommendations

Typescript, JS
ReactJS, NextJS
NodeJS
Any DB is okay (In-memory, NoSQL, SQL)

### Bonus

Validations (UI, API, DB) Tests
Attention to CI/CD
The expected deliverable is the source code published on github with instructions on how to execute and test it.

## The solution

I have split up the solution into two directories, frontend and backend. The frontend directory contains a nextJS application. The backend directory contains google cloud functions and is deployed via cloud functions. Check the readmes in the frontend and backend directory to see how to run / deploy.

### Current state

- It is possible to run the frontend locally. But it only contains logic to create a customer case for now.
- The backend can be deployed using Terraform and provides endpoints for creating, updating, and retrieving customer cases. Additionally, it includes endpoints for creating and removing support agents. In addition to these HTTP endpoints, there is another endpoint that is triggered when a new customer case is created in Firestore. This endpoint executes a cloud function to assign a support agent to the case if one is available.
