import { Card } from "../components/Card";
import { CustomerCaseForm } from '../components/CustomerCaseForm'
import styles from "../styles/index.module.css";

export interface CustomerCaseFormData {
  name: string;
  email: string;
  productId?: string;
  orderId?: string;
  message: string;
}

export default function Home() {
  return (
    <main className={styles.main}>
      <header>
        <h1 className={styles.heading}>
          Welcome to Our Customer Support Center!
        </h1>
      </header>
      <Card className={styles.card}>
        <CustomerCaseForm />
      </Card>
      <p className={styles.introText}>
        At [Company Name], we understand that our customers are the lifeblood of
        our business. Our customer support center is designed to make it easy
        for you to get the help you need, when you need it. Whether you&rsquo;re
        encountering an issue with one of our products or services, or you
        simply have a question or concern, our dedicated support team is here to
        assist you.
      </p>
      <p className={styles.introText}>
        Our knowledgeable agents are available to answer your questions and
        provide you with the guidance and support you need to ensure that you
        get the most out of our products and services. If you need help or
        support, don&rsquo;t hesitate to reach out to us using this form.
        We&rsquo;re here to help you every step of the way.
      </p>
    </main>
  );
}
