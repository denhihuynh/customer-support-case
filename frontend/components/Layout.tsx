import React from 'react';
import Head from 'next/head';

const Layout = ({ children }) => (
  <>
    <Head>
    <title>Customer Support Center</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta name="description" content="Welcome to Our Customer Support Center!" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <main id="app" className="d-flex flex-column h-100" data-testid="layout">
    {children}
    </main>
  </>
);

export default Layout;
