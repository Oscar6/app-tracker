import React, { useEffect, useState } from "react";
import UpdateJobs from "./UpdateJobs";


const ListJobs = () => {
    const [jobsList, setJobsList] = useState([]);
  
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
  
    return (
      <div>
        <h1 className="list-header">Applications: {jobsList.length}</h1>
        <div className="job-list">
          {sortedJobsList.map((job) => (
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
              <UpdateJobs job={job} jobsList={jobsList} setJobsList={setJobsList} />
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default ListJobs;
  