import React, { useEffect, useState }from "react";
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
            <div className="jobList">
                {jobs.map(job =>(
                    <div className="job" key={job.id}>
                        <h2>{job.company_name}</h2>
                        <p>{job.job_role}</p>
                        <span>{new Date(job.date_applied).toLocaleDateString()}</span>
                        <p>{job.status}</p>
                        <UpdateJobs job={job}/>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ListJobs;