"use client";
import React, { useState } from "react";
import styles from "./display.module.css";

export default function FaqDisplay({ faqs }) {
  const [display, setDisplay] = useState(false);
  const changeDisplay = () => {
    setDisplay(!display);
  };

  return (
    <div onClick={changeDisplay} className={styles.faq}>
      <h4>{faqs.title}</h4>
      {display && <p>{faqs.description}</p>}
    </div>
  );
}
