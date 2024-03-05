import React from "react";
import styles from "./features.module.css";
import configurations from "@/_data/config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCopy } from "@fortawesome/free-solid-svg-icons";
import FeatureCard from "@/app/Components/(Misc)/Cards/FeatureCard";
import Image from "next/image";
import Link from "next/link";

const list = [
  "View Jobs from multiple platforms",
  "Automatically Apply to multiple jobs",
  "Get Access to positions in different countries",
  "Get alerts for updates",
];

export default function Features() {
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <div>
          <h1>Focus on maximizing your employment opportunities.</h1>
          <p>We simplify the manual work by 100x.</p>
          <div className={styles.list}>
            {list.map((item) => (
              <small key={item}>
                {" "}
                <FontAwesomeIcon icon={faCheck} /> {item}{" "}
              </small>
            ))}
          </div>
          <Link href={"/signup"} className="primary-button">
            Get Started
          </Link>

          <p style={{fontWeight:'500', fontSize:'16px'}} >Missing job opportunities is typical, we solve this by pulling job listings from the most used platforms.</p>
        </div>
      </section>

      <section className={styles.auto}>
        <div>
          <FontAwesomeIcon icon={faCopy} />
          <h2>It can take up to 30 minutes to complete a job application.</h2>
          <p>Imagine spending no time at all.</p>
          <Link href={"/dashboard/search"} className="primary-button">
            Search Engine
          </Link>
        </div>

        <div>
          <Image src={'/jobs.svg'} width={500} height={500} alt="jobs" />
        </div>
      </section>

      <section className={styles.advantage}>
        <h2>Our Other Advantages</h2>
        <div className={styles.advantageList} >
              <FeatureCard feature={configurations.features[2]} />
              <FeatureCard feature={configurations.features[3]} />
              <FeatureCard feature={configurations.features[4]} />
              <FeatureCard feature={configurations.features[5]} />
        </div>
      </section>
    </main>
  );
}
