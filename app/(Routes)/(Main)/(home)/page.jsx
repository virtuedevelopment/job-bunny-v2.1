import configurations from "@/_data/config";
import UserExample from "./UserExample";
import styles from "./home.module.css";
import Link from "next/link";
import Image from "next/image";
import StaticSearch from "@/app/Components/(Misc)/Static Search/StaticSearch";
import {
  faUser,
  faGear,
  faRepeat
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const exampleUser = {
  name: "David",
  age: 34,
  location: "Canada",
  position: "Cloud Solutions Architect",
  url: "https://images.pexels.com/photos/1182238/pexels-photo-1182238.jpeg?auto=compress&cs=tinysrgb&w=600",
};
const exampleUser2 = {
  name: "Fernanda",
  age: 28,
  location: "Spain",
  position: "Human Resources Specialist",
  url: "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=800",
};

const steps = [
  { step: "Create a profile, upload your resume", icon: faUser },
  { step: "Set preferences, answer pre-filled quetions", icon: faGear },
  { step: "Start searching, auto apply and more", icon: faRepeat },
];

export default function Home() {
  return (
    <main>
      <section className={styles.hero}>
        <div className={styles.heroInteraction}>
          <div className={styles.heroPrompt}>
            <Link
              href={"/signup"}
              className={`main-button ${styles.heroButton}`}
            >
              Get Started
            </Link>
            <h1>
              Search for jobs. <span>Automate applications</span>. Get instant
              alerts. Track all applications.
            </h1>
            <StaticSearch />
          </div>

          <div className={styles.popularSearches}>
            <h2>Popular Searches</h2>
            <div className="grid-3x-display">
              {configurations.popSearches.map((search) => (
                <div className={styles.item} key={search}>
                  {" "}
                  {search}{" "}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.heroImageBox}>
          <Image
            src={"/heroImage.svg"}
            width={200}
            height={200}
            alt="Computer displaying Job Bunny Application"
          />
        </div>
      </section>

      <section className={styles.jobBoards}>
        <h2>Job Listings pulled from</h2>
        <div>
          {configurations.job_Boards.map((board) => (
            <small key={board.name}>
              <Image
                src={board.icon}
                width={105}
                height={100}
                alt="Logos"
              ></Image>
            </small>
          ))}
        </div>
      </section>

      <section className={styles.process}>
        <p>
          No matter who you are, or where you are, we <span>simplify</span> the{" "}
          <span>job search process</span>.
        </p>

        <div className={styles.customerExample}>
          <UserExample user={exampleUser} />
          <UserExample user={exampleUser2} />
        </div>
      </section>

      <section className={styles.easySteps}>
        <h3>How it Works</h3>
        <div className="grid-3x-display">
          {steps.map((step, index) => (
            <span key={index}>
              {" "}
              <FontAwesomeIcon icon={step.icon} /> <p>{step.step}</p>{" "}
            </span>
          ))}
        </div>
        <p>You maximize your employment opportunities by using us!</p>
        <Link href={"/signup"} className="main-button">
          Get Started
        </Link>
      </section>

      <section className={styles.features}>
        <div className={styles.displays}>
          <Image src={'/jobApply.svg'} width={450} height={450} alt="Job Apply"  />
          <Image src={'/joblist.svg'} width={450} height={450} alt="Job List"  />
        </div>
        <h3>
          Get on step closer to your <span>Future Job</span>
        </h3>
        <div className={styles.featuresList}>
          {configurations.features.map((feature) => (
            <small key={feature.name}>
              {" "}
              <FontAwesomeIcon
                className={styles.icon}
                icon={feature.icon}
              />{" "}
              {feature.name}
            </small>
          ))}
        </div>
      </section>
    </main>
  );
}
