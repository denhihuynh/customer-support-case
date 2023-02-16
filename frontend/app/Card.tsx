import React, { FC } from "react";
import styles from "./Card.module.css";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: FC<CardProps> = ({ children, className }) => {
  return (
    <div className={[styles.card, className].join(" ")}>
      <div className={styles.content}>{children}</div>
    </div>
  );
};
