import React from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./index.module.css";
import HomepageFeatures from "../components/HomepageFeatures";
import "../css/react-patro.css";
function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      {/* <NepaliCalendar
        defaultValue="2021-07-09"
        showExtra={true}
        calendarType={"AD"}
        // dateFormat="yyyy-mm-dd"
        // value={selectedDate}
        disablePast
        // showMonthDropdown={true}
        // showMonthDropdown={true}
        // showYearDropdown={true}
        // maxDate="2021-07-10"
        // minDate="07-03-2021"
        // disablePast
        // disableDate={(date) => date === "07-03-2021"}
        onSelect={(formattedDate, adDate, bsDate, date) => {
          // setSelectedDate(formattedDate);
        }}
      /> */}
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro"
          >
            Tutorial - 5min{" "}
            <span role="img" aria-label="timer">
              ⏱️
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
