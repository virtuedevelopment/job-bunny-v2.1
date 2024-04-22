import React from "react";
import styles from "./terms.module.css";

export default function page() {
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <h1>Terms and Conditions</h1>

        <div className={styles.term}>
          <h3>Introduction</h3>
          <p>
            Welcome to Job Bunny! These Terms and Conditions outline the rules
            and regulations for the use of Job Bunnys Website, located at
            www.jobbunny.com. By accessing this website, we assume you accept
            these terms and conditions. Do not continue to use Job Bunny if you
            do not agree to take all of the terms and conditions stated on this
            page.
          </p>
        </div>

        <div className={styles.term}>
          <h3>Intellectual Property Rights</h3>
          <p>
            Other than the content you own, under these Terms, Job Bunny and/or
            its licensors own all the intellectual property rights and materials
            contained in this Website. You are granted a limited license only
            for purposes of viewing the material contained on this Website.
          </p>
        </div>

        <div className={styles.term}>
          <h3>Intellectual Property Rights</h3>
          <ul>
            <li>Publishing any Website material in any other media;</li>
            <li>
              Selling, sublicensing, and/or otherwise commercializing any
              Website material;
            </li>
            <li>Publicly performing and/or showing any Website material;</li>
            <li>
              Using this Website in any way that is or may be damaging to this
              Website;
            </li>
            <li>
              Using this Website in any way that impacts user access to this
              Website;
            </li>
            <li>
              Using this Website contrary to applicable laws and regulations, or
              in a way that causes, or may cause, harm to the Website, or to any
              person or business entity;
            </li>
            <li>
              Engaging in any data mining, data harvesting, data extracting, or
              any other similar activity in relation to this Website.
            </li>
          </ul>
        </div>

        <div className={styles.term}>
          <h3>Your Content</h3>
          <p>
            In these Website Standard Terms and Conditions,Your Content shall
            mean any audio, video text, images, or other material you choose to
            display on this Website. By displaying Your Content, you grant Job
            Bunny a non-exclusive, worldwide irrevocable, sub-licensable license
            to use, reproduce, adapt, publish, translate and distribute it in
            any and all media. Your Content must be your own and must not be
            invading any third-partys rights. Job Bunny reserves the right to
            remove any of Your Content from this Website at any time without
            notice.
          </p>
        </div>

        <div className={styles.term}>
          <h3>No Warranties</h3>
          <p>
            This Website is provided as is, with all faults, and Job Bunny
            expresses no representations or warranties, of any kind related to
            this Website or the materials contained on this Website.
          </p>
        </div>

        <div className={styles.term}>
          <h3>Limitation of Liability</h3>
          <p>
            In no event shall Job Bunny, nor any of its officers, directors and
            employees, be held liable for anything arising out of or in any way
            connected with your use of this Website whether such liability is
            under contract. Job Bunny, including its officers, directors and
            employees shall not be held liable for any indirect, consequential
            or special liability arising out of or in any way related to your
            use of this Website.
          </p>
        </div>

        <div className={styles.term}>
          <h3>Indemnification</h3>
          <p>
            You hereby indemnify to the fullest extent Job Bunny from and
            against any and/or all liabilities, costs, demands, causes of
            action, damages and expenses arising in any way related to your
            breach of any of the provisions of these Terms.
          </p>
        </div>

        <div className={styles.term}>
          <h3>Severability</h3>
          <p>
            If any provision of these Terms is found to be invalid under any
            applicable law, such provisions shall be deleted without affecting
            the remaining provisions herein.
          </p>
        </div>

        <div className={styles.term}>
          <h3>Variation of Terms</h3>
          <p>
            Job Bunny is permitted to revise these terms at any time as it sees
            fit, and by using this Website you are expected to review these
            terms on a regular basis.
          </p>
        </div>

        <div className={styles.term}>
          <h3>Assignment</h3>
          <p>
            Job Bunny is allowed to assign, transfer, and subcontract its rights
            and/or obligations under these Terms without any notification.
            However, you are not allowed to assign, transfer, or subcontract any
            of your rights and/or obligations under these terms.
          </p>
        </div>

        <div className={styles.term}>
          <h3>Entire Agreement</h3>
          <p>
            These Terms constitute the entire agreement between Job Bunny and
            you in relation to your use of this Website, and supersede all prior
            agreements and understandings.
          </p>
        </div>

        <div className={styles.term}>
          <h3>Governing Law & Jurisdiction</h3>
          <p>
            These Terms will be governed by and interpreted in accordance with
            the laws of the State/Country of [Your Location], and you submit to
            the non-exclusive jurisdiction of the state and federal courts
            located in [Your Location] for the resolution of any disputes.
          </p>
        </div>
      </section>
    </main>
  );
}
