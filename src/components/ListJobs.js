import React, { useEffect, useState, useRef } from "react";
import UpdateJobs from "./UpdateJobs";
import StatusCounts from "./StatusCounts";
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { decodeHTMLEntities } from "./Helper";

const ListJobs = ({ refreshJobList, jobsList }) => {
  const [selectedCompany, setSelectedCompany] = useState('');
  const [filteredJobsList, setFilteredJobsList] = useState([]);
  const [isSearchClicked, setIsSearchClicked] = useState(false);

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

  useEffect(() => {
    const filteredList = jobsList.filter(
      (job) => job.company_name === selectedCompany
    );
    setFilteredJobsList(filteredList);
  }, [jobsList, selectedCompany]);

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
      <div className="sticky-count">
        <h1 className="list-header">Applications: {jobsList.length}</h1>
        <StatusCounts 
          jobsList={jobsList}
        />
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
      </div>
      <div className="job-list">
        {jobsToRender.map((job) => (
          <div className="job" key={job.id}>
            <a 
              className="company-name"
              href={job.job_link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {decodeHTMLEntities(job.company_name)}
            </a>
            <p className="job-role">{job.job_role}</p>
            <p className="job-salary">{job.job_salary}</p>
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
              refreshJobList={refreshJobList}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListJobs;
