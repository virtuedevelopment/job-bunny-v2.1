"use client";
import React, { useState } from "react";
import styles from "./display.module.css";
import {CircleHelp} from 'lucide-react'

export default function FaqDisplay({ faqs }) {
 
  return (
    <div className={styles.faq}>
      <CircleHelp />
      <h4>{faqs.title}</h4>
      <p>{faqs.description}</p>
    </div>
  );
}
