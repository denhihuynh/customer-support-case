# Frontend directory

The frontend directory contains the code to run a Next.js application. The application includes a page for creating customer cases, which can be accessed at localhost:3000, as well as a page for support agents, which is not fully implemented yet, and can be accessed at localhost:3000/supportagent. The support agent endpoint is protected by authentication using Auth0.

## Getting Started

Create a `.env.local` file following the `.env.example` file. To fill in the values, an auth0 account is required and an application on the auth0 managed service.

Install all dependencies:

```bash
npm install
```

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.