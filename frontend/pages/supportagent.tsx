import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import React, { FC } from "react";
import styles from "../styles/index.module.css";

const SupportAgent = ({ user }) => {
  return (
    <main className={styles.main}>
      <header>
        <h1 className={styles.heading}>Support agent dashboard to come</h1>
      </header>
      <h6 className="muted">User prop</h6>
      <p>{JSON.stringify(user, null, 2)}</p>
      <a href="/api/auth/logout">Logout</a>
    </main>
  );
};

export default SupportAgent;
export const getServerSideProps = withPageAuthRequired();
