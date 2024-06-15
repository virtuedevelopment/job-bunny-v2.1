import React from "react";
import seo_config from "@/_data/seo";
import styles from "./features.module.css";
import configurations from "@/_data/config";
import RedirectButton from "@/app/Components/(Misc)/RedirectButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCopy } from "@fortawesome/free-solid-svg-icons";
import FeatureCard from "@/app/Components/(Misc)/Cards/FeatureCard";
import Image from "next/image";
import Link from "next/link";

import {Zap} from "lucide-react"

const list = [
  "View Jobs from multiple platforms",
  "Automatically Apply to multiple jobs",
  "Get Access to positions in different countries",
  "Get alerts for updates",
];
export const metadata = {
  title: seo_config.features.title,
  description: seo_config.features.description,
  keywords: seo_config.features.keywords,
  author: seo_config.features.author,
};

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
          <RedirectButton
            prompt={"Get Started"}
            loggedin={"/dashboard"}
            loggedout={"/signup"}
            theme={"primary-button"}
          />

          <p style={{ fontWeight: "500", fontSize: "16px" }}>
            Missing job opportunities is typical, we solve this by pulling job
            listings from the most used platforms.
          </p>
        </div>
      </section>

      <section className={styles.auto}>
        <div className={styles.information}>
          <small>Automatic Applications</small>

          <h2>
            Imagine completing job applications <span>instantly <Zap /> </span>
          </h2>

          <big>Other platforms can take up to 30 minutes.</big>

          <p>
            Job Bunny is introducing an auto-application feature that will
            streamline the job application process by automatically matching
            your profile to suitable job listings and submitting your
            applications for you.
          </p>

          <span style={{ alignSelf: "flex-start" }}>
            <RedirectButton
              prompt={"Get Started"}
              loggedin={"/dashboard"}
              loggedout={"/login"}
              theme={"alt-button-1"}
            />
          </span>
        </div>
        <div className={styles.imagebox}>
          <div className={styles.circle}></div>
          <Image
            src={"/phonexlaptop.svg"}
            width={500}
            height={500}
            alt="image"
          />
        </div>
      </section>

      <section className={styles.advantage}>
        <h2>Various advantages of using Job Bunny</h2>
        <div className={styles.advantageList}>
          <FeatureCard feature={configurations.features[2]} />
          <FeatureCard feature={configurations.features[3]} />
          <FeatureCard feature={configurations.features[4]} />
          <FeatureCard feature={configurations.features[5]} />
        </div>
      </section>
    </main>
  );
}
