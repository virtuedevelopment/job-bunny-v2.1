import React from "react";
import styles from "../terms/terms.module.css";
import seo_config from "@/_data/seo";

export const metadata = {
  title: seo_config.privacy.title,
  description: seo_config.privacy.description,
  keywords: seo_config.privacy.keywords,
  author: seo_config.privacy.author,
};

export default function page() {
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <h1>Privacy Policy</h1>

        <div className={styles.term}>
          <h3>Privacy Policy</h3>
          <p>
            At Job Bunny, accessible from www.jobbunny.com, one of our main
            priorities is the privacy of our visitors. This Privacy Policy
            document contains types of information that is collected and
            recorded by Job Bunny and how we use it. If you have additional
            questions or require more information about our Privacy Policy, do
            not hesitate to contact us.
          </p>
        </div>

        <div className={styles.term}>
          <h3>Consent</h3>
          <p>
            By using our website, you hereby consent to our Privacy Policy and
            agree to its terms.
          </p>
        </div>

        <div className={styles.term}>
          <h3>Information we collect</h3>
          <p>
            The personal information that you are asked to provide, and the
            reasons why you are asked to provide it, will be made clear to you
            at the point we ask you to provide your personal information. If you
            contact us directly, we may receive additional information about you
            such as your name, email address, phone number, the contents of the
            message and/or attachments you may send us, and any other
            information you may choose to provide.
          </p>
        </div>

        <div className={styles.term}>
          <h3>How we use your information</h3>
          <p>
            We use the information we collect in various ways, including to:
            <ul>
              <li>Provide, operate, and maintain our website</li>
              <li>Improve, personalize, and expand our website</li>
              <li>Understand and analyze how you use our website</li>
              <li>
                Develop new products, services, features, and functionality
              </li>
              <li>
                Communicate with you, either directly or through one of our
                partners, including for customer service, to provide you with
                updates and other information relating to the website, and for
                marketing and promotional purposes
              </li>
              <li>Send you emails</li>
              <li>Find and prevent fraud</li>
            </ul>
          </p>
        </div>
      </section>
    </main>
  );
}
