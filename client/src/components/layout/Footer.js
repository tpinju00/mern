import React from "react";
import styles from "./styles.module.css";

export default function Footer() {
  return (
    <footer className={styles.footerBar}>
      Copyright &copy; {new Date().getFullYear()} Repete.hr
    </footer>
  );
}
