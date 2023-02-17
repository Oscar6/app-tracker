import React, { useEffect, useState }from "react";

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
                console.error(error)
            }
        }

        fetchAllJobs();
    }, []);

    console.log(jobs);

    return (
        <div>
            <h1>Applications</h1>
            <div className="jobs">
                {jobs.map(job =>(
                    <div className="job">
                        <h2>{job.company_name}</h2>
                        <h3>{job.job_role}</h3>
                        <span>{new Date(job.date_applied).toLocaleDateString()}</span>
                        <h4>{job.status}</h4>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ListJobs;