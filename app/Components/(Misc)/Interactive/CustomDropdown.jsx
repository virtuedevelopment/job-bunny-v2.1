"use client";
import React, { useState, useEffect } from "react";
import styles from "./interactive.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleChevronUp,
  faCircleChevronDown,
} from "@fortawesome/free-solid-svg-icons";

export default function CustomDropdown({
  title,
  list,
  icon,
  update,
  isCurrent,
  onToggle,
}) {
  const [current, setCurrent] = useState(null); // for current selection
  const [options, setOptions] = useState([]); // list used for selection
  const [toggled, setToggled] = useState(false); //toggling the dropdown
  // Check if the options array contains at least one object
  const containsObjects = list.some(
    (option) => typeof option === "object" && option !== null
  );

  //util
  const setToggle = () => {
    setToggled((prev) => !prev);
    onToggle();
  };

  //useEffects
  useEffect(() => {
    if (list) {
      setOptions(list);
    }
  }, [list]);

  useEffect(() => {
    if (current && update) {
      // Directly call update with either the current.value or current itself
      update(current.value ? current.value : current);
    }
  }, [current, update, containsObjects]);

  useEffect(() => {
    if (!isCurrent) {
      setToggled(false);
    }
  }, [isCurrent]);

  return (
    <>
      <div className={styles.dropcontainer}>
        <button onClick={setToggle} className={styles.selection}>
          <p>
            {current
              ? typeof current === "object"
                ? current.name
                : current
              : title}
          </p>
          <FontAwesomeIcon
            icon={toggled ? faCircleChevronUp : faCircleChevronDown}
          />
        </button>
        {toggled &&
          (containsObjects ? (
            <div className={styles.dropdown}>
              <button
                className={styles.item}
                onClick={() => {
                  setCurrent({ name: title, value: "remove" });
                  setToggle();
                }}
              >
                <FontAwesomeIcon icon={icon} />
                <p>{title}</p>
              </button>
              {list.map((option, index) => (
                <button
                  key={index}
                  className={styles.item}
                  onClick={() => {
                    setCurrent(option);
                    setToggle();
                  }}
                >
                  <FontAwesomeIcon icon={icon} />
                  <p>{option.name}</p>
                </button>
              ))}
            </div>
          ) : (
            <div className={styles.dropdown}>
              <button
                className={styles.item}
                onClick={() => {
                  setCurrent({ name: title, value: "remove" });
                  setToggle();
                }}
              >
                <FontAwesomeIcon icon={icon} />
                <p>{title}</p>
              </button>
              {list.map((option, index) => (
                <button
                  key={index}
                  className={styles.item}
                  onClick={() => {
                    setCurrent(option);
                    setToggle();
                  }}
                >
                  <FontAwesomeIcon icon={icon} />
                  <p>{option}</p>
                </button>
              ))}
            </div>
          ))}
      </div>
    </>
  );
}
