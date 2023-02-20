# Backend Directory

This directory contains the backend code and infrastructure configuration for the application. It is responsible for handling the server-side logic, including the implementation of cloud functions, which are triggered by http events or changes that occur in the Firestore database.

## Running the Code

Clone the repository to your local machine. Navigate to the backend directory. Export google credentials to the service account used for deployment.

```bash
export GOOGLE_APPLICATION_CREDENTIALS=<path-to-service-account-json-file>
Replace <path-to-service-account-json-file> with the path to the JSON file containing your Google Cloud service account credentials.
```

Deploy the code to Google Cloud by changing directory to desired cloud function directory and run:

```makefile
make init
make apply #press yes when prompted
 ```

This will deploy the backend code and infrastructure to Google Cloud, including the necessary configuration to run cloud functions. Please note that the resources in iac needs to be deployed prior to cloud functions since it contains the creation of the bucket where terraform state (.tfstate files) is stored for the rest of the cloud functions.

## Cloud Functions

The backend code includes several cloud functions, which are described below:

- support-agent-assign-to-case: Assigns a support agent to a new customer case if one is available. Triggered by customer case (firestore document) created.
- support-agent-create: creates a support agent. Triggered by http.
- support-agent-remove: removes a support agent. Triggered by http.
- customer-case-create: creates a new customer case. Triggered by http.
- customer-case-update: updates properties for customer. Triggered by http.
- customer-case-get: gets all customer cases, alternatively one of them. Triggered by http.
  