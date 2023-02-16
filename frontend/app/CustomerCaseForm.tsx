"use client";

import React, { FC, useState } from "react";
import styles from "./CustomerCaseForm.module.css";
import { CustomerCaseFormData } from "./page";

interface CustomerCaseFormProps {}

const validateCustomerCaseFormData = (data: CustomerCaseFormData): boolean => {
  if (!data.message || !data.email) {
    return false;
  }
  return true;
};

export const CustomerCaseForm: FC<CustomerCaseFormProps> = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [orderId, setOrderId] = useState("");
  const [productId, setProductId] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData: CustomerCaseFormData = {
      productId,
      message,
      email,
      name,
      orderId,
    };
    const isValidData = validateCustomerCaseFormData(formData);
    if (!isValidData) {
      console.log("data is not valid");
      return;
    }
    setIsSubmitting(true);

    try {
      const response = await fetch(
        "https://create-customer-case-3e2lrhnaaa-ew.a.run.app",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        setIsSubmitted(true);
        setName("");
        setEmail("");
        setOrderId("");
        setProductId("");
        setMessage("");
      } else {
        setErrorMessage(
          "We're sorry, but we're unable to process your request at this time. Please wait a few moments and try again later."
        );
      }
    } catch (error) {
      setErrorMessage(
        "We're sorry, but we're unable to process your request at this time. Please wait a few moments and try again later."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label className={styles.label}>
        Name:
        <input
          className={styles.input}
          type="text"
          value={name}
          autoComplete="name"
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <br />
      <label className={styles.label}>
        Email:
        <input
          className={styles.input}
          type="text"
          value={email}
          autoComplete="email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <br />
      <label className={styles.label}>
        Order ID:
        <input
          className={styles.input}
          type="text"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
        />
      </label>
      <br />
      <label className={styles.label}>
        Product ID:
        <input
          className={styles.input}
          type="text"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
        />
      </label>
      <br />
      <label className={styles.label}>
        Message:
        <textarea
          className={styles.input}
          rows={4}
          cols={50}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </label>
      <br />
      {isSubmitting ? (
        <button className={styles.button} type="submit" disabled={isSubmitting}>
          Submitting...
        </button>
      ) : (
        <button className={styles.button} type="submit" disabled={isSubmitting}>
          Submit
        </button>
      )}
      {isSubmitted && (
        <p className={styles.success}>
          Thank you for submitting your case. Our team has received your message
          and will get back to you within 24 hours at the email address you
          provided.
        </p>
      )}
      {errorMessage && <p className={styles.failure}>{errorMessage}</p>}
    </form>
  );
};
