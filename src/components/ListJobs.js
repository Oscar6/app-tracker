import React, { useEffect, useState } from "react";
import UpdateJobs from "./UpdateJobs";


const ListJobs = () => {
    const [jobs, setJobs] = useState([]);
  
    useEffect(() => {
      const fetchAllJobs = async () => {
        try {
          const res = await fetch("http://localhost:5000/job");
          const jsonData = await res.json();
          setJobs(jsonData);
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchAllJobs();
    }, []);
  
    const sortJobs = jobs
      .sort((a, b) => b.date_applied.localeCompare(a.date_applied))
      .reduce((acc, job) => {
        const date = job.date_applied;
        acc[date] = acc[date] || [];
        acc[date].push(job);
        return acc;
      }, {});
  
    const jobsList = Object.values(sortJobs).flatMap((jobsDate) =>
      jobsDate.sort((a, b) => b.id - a.id)
    );
  
    return (
      <div>
        <h1 className="list-header">Applications: {jobs.length}</h1>
        <div className="job-list">
          {jobsList.map((job) => (
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
              <UpdateJobs job={job} />
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default ListJobs;
  