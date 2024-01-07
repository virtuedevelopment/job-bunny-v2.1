import configurations from "@/_data/config";
import styles from "./home.module.css";
import Link from "next/link";
import Image from "next/image";
import StaticSearch from "@/app/Components/(Misc)/Static Search/StaticSearch";

export default function Home() {
  return (
    <main>
      <section className={styles.hero}>

        <div className={styles.heroInteraction}>
          <div className={styles.heroPrompt} >
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
                <div className={styles.item} key={search}> {search} </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.heroImageBox}>
          <Image
            src={"/heroImage.svg"}
            width={100}
            height={100}
            alt="Computer displaying Job Bunny Application"
          />
        </div>
        
      </section>

      <section className={styles.jobBoards}></section>
    </main>
  );
}
