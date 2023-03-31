import React, { useEffect, useState, useRef } from "react";
import UpdateJobs from "./UpdateJobs";
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';

const ListJobs = () => {
  const [jobsList, setJobsList] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState('');
  const [filteredJobsList, setFilteredJobsList] = useState([]);
  const [isSearchClicked, setIsSearchClicked] = useState(false);

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const res = await fetch("http://localhost:5000/job");
        const jsonData = await res.json();
        setJobsList(jsonData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAllJobs();
  }, []);

  useEffect(() => {
    console.log("jobsList state changed");
  }, [jobsList]);

  console.log(jobsList);

  const sortJobs = jobsList
    .sort((a, b) => b.date_applied.localeCompare(a.date_applied))
    .reduce((acc, job) => {
      const date = job.date_applied;
      acc[date] = acc[date] || [];
      acc[date].push(job);
      return acc;
    }, {});

  const sortedJobsList = Object.values(sortJobs).flatMap((jobsDate) =>
    jobsDate.sort((a, b) => b.id - a.id)
  );

  const handleFilter = () => {
    const filteredList = jobsList.filter(
      (job) => job.company_name === selectedCompany
    );
    setFilteredJobsList(filteredList);
    setIsSearchClicked(true);
  };

  const handleClear = () => {
    setSelectedCompany("");
    setIsSearchClicked(false);
    setFilteredJobsList([]);
    typeaheadRef.current.clear();
  };

  const jobsToRender = isSearchClicked ? filteredJobsList : sortedJobsList;

  const typeaheadRef = useRef();

  return (
    <div>
      <h1 className="list-header">Applications: {jobsList.length}</h1>
      <div className="job-filter">
        <Typeahead
          id="company-search"
          labelKey="company_name"
          options={jobsList}
          minLength={1}
          placeholder="Search by company name..."
          onChange={(selected) =>
            setSelectedCompany(selected[0]?.company_name || "")
          }
          ref={typeaheadRef}
        />
        <button 
          className="search-button btn btn-light" 
          type="button"
          onClick={handleFilter}
          >
            <i className="bi bi-search"></i>
          </button>
        {
          isSearchClicked
          &&
          (<button 
            className="clear-button btn btn-light" 
            type="button"
            onClick={handleClear}>Clear</button>)
        }
      </div>
      <div className="job-list">
        {jobsToRender.map((job) => (
          <div className="job" key={job.id}>
            <p className="company-name">{job.company_name}</p>
            <p className="job-role">{job.job_role}</p>
            <span>
              Applied on:
              <br />
              {new Date(job.date_applied).toLocaleDateString()}
            </span>
            <p className="status-style">
              Status:
              <br />
              {job.app_status}
            </p>
            <div className="update-button">
              <button
                type="button"
                className="btn"
                data-bs-toggle="modal"
                data-bs-target={`#id${job.id}`}
              >
                <i className="bi bi-pencil-square"></i>
              </button>
            </div>
            <UpdateJobs
              job={job}
              jobsList={jobsList}
              setJobsList={setJobsList}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListJobs;
