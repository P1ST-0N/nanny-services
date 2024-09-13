import css from "./NannyItemFeatureList.module.css";

import { calcAge } from "../../utils/dateFunctions";
import { useMemo } from "react";

const featureList = ["age", "experience", "kidsAge", "characters", "education"];

const getFeatures = (item) => {
  return {
    age: {
      title: "Age",
      value: calcAge(new Date(item.birthday)),
      className: css.underline,
    },
    experience: { title: "Experience", value: item.experience },
    kidsAge: { title: "Kids Age", value: item.kids_age },
    characters: {
      title: "Characters",
      value: Object.values(item.characters)
        .map((c) => c.trim().slice(0, 1).toUpperCase() + c.trim().slice(1))
        .join(", "),
    },
    education: { title: "Education", value: item.education },
  };
};

function NannyItemFeatureList({ item = {} }) {
  const featuresData = useMemo(() => {
    const result = [];

    if (Object.keys(item).length === 0) return result;

    const itemFeatures = getFeatures(item);
    featureList.forEach((feature) => {
      if (itemFeatures[feature]?.value) result.push(itemFeatures[feature]);
    });

    return result;
  }, [item]);

  return (
    <ul className={css.list}>
      {featuresData.map((f) => (
        <li key={f.title} className={css.listItem}>
          <p className={css.text}>
            <span className={css.title}>{`${f.title}: `}</span>
            <span className={`${css.value} ${f.className || ""}`}>
              {f.value}
            </span>
          </p>
        </li>
      ))}
    </ul>
  );
}

export default NannyItemFeatureList;
