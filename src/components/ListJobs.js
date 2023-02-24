import React, { useEffect, useState } from "react";
import AddJob from "./AddJob";
import UpdateJobs from "./UpdateJobs";


const ListJobs = () => {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        const fetchAllJobs = async () => {
            try {
                const res = await fetch("http://localhost:5000/job")
                const jsonData = await res.json();

                // console.log(jsonData);
                setJobs(jsonData);
            } catch (error) {
                console.error(error);
            }
        }

        fetchAllJobs();
    }, []);

    console.log(jobs);

    return (
        <div>
            <h1>Applications</h1>
            <AddJob />
            <div className="job-list">
                {jobs.map(job => (
                    <div className="job" key={job.id}>
                        <p className="company-name">{job.company_name}</p>
                        <p className="job-role">{job.job_role}</p>
                        <span>Applied on: {new Date(job.date_applied).toLocaleDateString()}</span>
                        <p className="status-style">Status: {job.app_status}</p>
                        <div className="update-button">
                            <button
                                type="button"
                                className="btn btn-primary"
                                data-bs-toggle="modal"
                                data-bs-target={`#id${job.id}`}
                            >
                                Update
                            </button>
                        </div>
                        <UpdateJobs job={job} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ListJobs;