"use client";
import React, { useEffect, useState } from "react";
import styles from "./search.module.css";
import CustomDropdown from "@/app/Components/(Misc)/Interactive/CustomDropdown";
import CustomLocationSearch from "@/app/Components/(Misc)/Interactive/CustomLocationSearch";
import {
  faBriefcase,
  faFile,
  faBuilding,
  faMoneyBill,
  faCalendar,
  faPlane,
} from "@fortawesome/free-solid-svg-icons";

//set filter options
const boards = ["Indeed", "LinkedIn", "Glassdoor", "Zip Recruiter"];
const experienceList = [
  "Internship",
  "Entry level",
  "Associate",
  "Mid-Senior level",
  "Director",
  "Executive",
];
const job_type = [
  "Full-time",
  "Part-time",
  "Contract",
  "Temporary",
  "Volunteer",
  "Internship",
  "Other",
];
const job_type_cat = ["On-site", "Hybrid", "Remote"];
const salary = [
  { name: "$20,000 USD", value: 20000 },
  { name: "$30,000 USD", value: 30000 },
  { name: "$40,000 USD", value: 40000 },
  { name: "$50,000 USD", value: 50000 },
  { name: "$60,000 USD", value: 60000 },
  { name: "$70,000 USD", value: 70000 },
  { name: "$80,000 USD", value: 80000 },
  { name: "$90,000 USD", value: 90000 },
  { name: "$100,000 USD", value: 100000 },
  { name: "$110,000 USD", value: 110000 },
  { name: "$120,000 USD", value: 120000 },
  { name: "$130,000 USD", value: 130000 },
  { name: "$140,000 USD", value: 140000 },
  { name: "$150,000 USD", value: 150000 },
  { name: "$160,000 USD", value: 160000 },
  { name: "$170,000 USD", value: 170000 },
  { name: "$180,000 USD", value: 180000 },
  { name: "$190,000 USD", value: 190000 },
  { name: "$200,000 USD", value: 200000 },
  { name: "$210,000 USD", value: 210000 },
  { name: "$220,000 USD", value: 220000 },
  { name: "$230,000 USD", value: 230000 },
  { name: "$240,000 USD", value: 240000 },
  { name: "$250,000 USD", value: 250000 },
  { name: "$260,000 USD", value: 260000 },
  { name: "$270,000 USD", value: 270000 },
  { name: "$280,000 USD", value: 280000 },
  { name: "$290,000 USD", value: 290000 },
  { name: "$300,000 USD", value: 300000 },
];
const date_range = [
  { name: "Last 7 Days", value: 1 },
  { name: "Last 14 Days", value: 2 },
  { name: "Last 30 Days", value: 3 },
];
const visa_sponsored = [
  { name: "No sponsorship required", value: 0 },
  { name: "Sponsorship required", value: 1 },
];

//gets empty filter object from parent function
//mutliple filter states defined initally as null
//once new filter state is selected, adds filter state to filter parent object

export default function FilterBox({ filter, update }) {
  //initialize states
  const [jobSite, setJobSite] = useState();
  const [experience, setExperience] = useState();
  const [jobType, setJobType] = useState();
  const [jobTypeCat, setJobTypeCat] = useState();
  const [VisaSponsored, setVisaSponsored] = useState();
  const [dateRange, setDateRange] = useState();
  const [minSalary, setMinSalary] = useState();
  const [location, setLocation] = useState({});

  useEffect(() => {
    // Define a helper to conditionally call update for each state
    const updateFilter = (filterName, stateValue) => {
      // Check if the value has changed or if it's an initial update you want to perform
      if (stateValue !== filter[filterName]) {
        update({ name: filterName, value: stateValue });
      }
    };

    // Now, manually call updateFilter for each piece of state
    updateFilter("job_site", jobSite);
    updateFilter("experience", experience);
    updateFilter("job_type", jobType);
    updateFilter("job_type_cat", jobTypeCat);
    updateFilter("visa_sponsored", VisaSponsored);
    updateFilter("date_range", dateRange);
    updateFilter("min_salary", minSalary);
    updateFilter("location", location);
  }, [
    filter,
    jobSite,
    experience,
    jobType,
    jobTypeCat,
    VisaSponsored,
    dateRange,
    minSalary,
    update,
    location,
  ]); // Include all states and 'update' in the dependency array

  return (
    <div className={styles.filters}>
      <CustomDropdown
        title={"Select Job Board"}
        list={boards}
        icon={faBriefcase}
        update={setJobSite}
      />
      <CustomDropdown
        title={"Select Experience"}
        list={experienceList}
        icon={faFile}
        update={setExperience}
      />
      <CustomDropdown
        title={"Select Contract"}
        list={job_type}
        icon={faBuilding}
        update={setJobType}
      />
      <CustomDropdown
        title={"Select Job Type"}
        list={job_type_cat}
        icon={faBriefcase}
        update={setJobTypeCat}
      />
      <CustomDropdown
        title={"Set Visa Preference"}
        list={visa_sponsored}
        icon={faPlane}
        update={setVisaSponsored}
      />
      <CustomDropdown
        title={"Select Date Range"}
        list={date_range}
        icon={faCalendar}
        update={setDateRange}
      />
      <CustomDropdown
        title={"Select Salary"}
        list={salary}
        icon={faMoneyBill}
        update={setMinSalary}
      />

      <CustomLocationSearch update={setLocation} />
    </div>
  );
}
