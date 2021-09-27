import React from "react";
import clsx from "clsx";
import styles from "./HomepageFeatures.module.css";

const FeatureList = [
  {
    title: "Ready to use functions",
    description: (
      <>
        React patro provides ready to use functions for date manipulations for
        both bs and ad dates. You can simply import them from react-patro and
        use them per your use.
      </>
    ),
  },
  {
    title: "React hooks for customization",
    description: (
      <>
        React patro provides performant hooks for populating your own calendar
        design and carry out other ad to bs conversion
      </>
    ),
  },
  {
    title: "AD & BS Calendar functionality",
    description: (
      <>
        Now you don't need to use two different packages for ad and bs calendar
        rendering.
      </>
    ),
  },
];

function Feature({ Svg, title, description }) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
