import configurations from "@/_data/config";
import UserExample from "./UserExample";
import styles from "./home.module.css";
import Link from "next/link";
import Image from "next/image";
import StaticSearch from "@/app/Components/(Misc)/Static Search/StaticSearch";
import GraphicCard from "@/app/Components/(Misc)/Cards/GraphicCard";
import RedirectButton from "@/app/Components/(Misc)/RedirectButton";
import JobFeatureCard from "@/app/Components/(Misc)/Cards/JobFeatureCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const exampleUser = {
  name: "David",
  age: 34,
  location: "Canada",
  position: "Cloud Solutions Architect",
  url: "/david.png",
};
const exampleUser2 = {
  name: "Fernanda",
  age: 28,
  location: "Spain",
  position: "Human Resources Specialist",
  url: "/fernanda.png",
};
const steps = [
  {
    step: "Build and upload resume",
    graphic: "/step1.svg",
    url: "/",
    message:
      "Upload your resume to unlock personalized job recommendations tailored just for you. Our advanced algorithms analyze your skills and experience to match you with the perfect positions",
  },
  {
    step: "Update your preferences",
    graphic: "/step2.svg",
    url: "/",
    message:
      "Update your preferences to help us understand your unique skills and career goals. By doing so, we can match you with the perfect job opportunities that align with your aspirations. ",
  },
  {
    step: "Start your job search",
    graphic: "/step3.svg",
    url: "/",
    message:
      "Start your search now! Explore our premium job search engine to discover the perfect opportunities manually. Take charge of your job hunt and find the ideal fit for your skills and aspirations.",
  },
];

export default function Home() {
  return (
    <main>
      <section className={styles.hero}>
        <div className={styles.heroInteraction}>
          <div className={styles.heroPrompt}>
            <h1>
              Search for jobs. <span>Automate applications</span>. Get instant
              alerts. Track all applications.
            </h1>

            <StaticSearch />

            <div className={styles.popularBox}>
              <p>Popular Searches:</p>
              <div className={styles.popular}>
                {configurations.popSearches.map((search) => (
                  <JobFeatureCard
                    key={search.text}
                    text={search.text}
                    icon={search.icon}
                  />
                ))}
              </div>
            </div>

            <RedirectButton
              prompt={"Get Started"}
              loggedin={"/dashboard"}
              loggedout={"/signup"}
              theme={"main-button"}
            />
          </div>
        </div>

        <div className={styles.heroImageBox}>
          <Image
            className={styles.desktopImg}
            src={"/heroImage.svg"}
            width={1750}
            height={1750}
            alt="Computer displaying Job Bunny Application"
          />

          <Image
            className={styles.mobileImg}
            src={"/desktop.svg"}
            width={1750}
            height={1750}
            alt="Computer displaying Job Bunny Application"
          />
        </div>
      </section>

      <section className={styles.jobBoards}>
        <div>
          {configurations.job_Boards.map((board) => (
            <span key={board.name}>
              <Image
                src={board.icon}
                width={150}
                height={100}
                alt="Logos"
              ></Image>
            </span>
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
        <h3>How It Works</h3>
        <div className={styles.graphicDisplay}>
          {steps.map((step) => (
            <GraphicCard
              key={step.step}
              graphic={step.graphic}
              title={step.step}
              url={step.url}
              message={step.message}
            />
          ))}
        </div>
        <p>Maximize your employment opportunities by using our app</p>
        <RedirectButton
          prompt={"Get Started"}
          loggedin={"/dashboard"}
          loggedout={"/signup"}
          theme={"main-button"}
        />
      </section>

      <section className={styles.features}>
        <div className={styles.displays}>
          <Image
            src={"/jobApply.svg"}
            width={450}
            height={450}
            alt="Job Apply"
          />
          <Image src={"/joblist.svg"} width={450} height={450} alt="Job List" />
        </div>

        <h3>
          Get on step closer to your <span>future job</span>
        </h3>

        <div className={styles.featuresList}>
          {configurations.features.map((feature) => (
            <div key={feature.name}>
              <FontAwesomeIcon className={styles.icon} icon={feature.icon} />
              <small>{feature.name}</small>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
