import React from "react";
import styles from "./contact.module.css";
import ContactForm from "./ContactForm";
import configurations from "@/_data/config";
import FaqDisplay from "@/app/Components/(Misc)/Object Displays/FaqDisplay";
import seo_config from "@/_data/seo";

export const metadata = {
  title: seo_config.contact.title,
  description: seo_config.contact.description,
  keywords: seo_config.contact.keywords,
  author: seo_config.contact.author,
};

export default function Contact() {
  return (
    <main className={styles.main}>
      <h1>Get in touch with us</h1>
      <h2>
        Have a question or inquiry? Get in touch with us and we will get back to
        you as soon as we can!
      </h2>
      <ContactForm />

      <section className={styles.faq}>
        {configurations.faq.map((question) => (
          <FaqDisplay key={question.title} faqs={question} />
        ))}
      </section>
    </main>
  );
}
