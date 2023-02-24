import React, { useState } from "react";

const UpdateJobs = ({ job }) => {
    // console.log(job);
    const [jobInfo, setJobInfo] = useState({
        company_name: job.company_name,
        job_role: job.job_role,
        date_applied: job.date_applied,
        app_status: ""
    });

    const changeHandler = (e) => {
        setJobInfo({
          ...jobInfo,
          [e.target.name]: e.target.value
        });
      };

    const updateJobInfo = async e => {
      e.preventDefault();
      try {
          const body = {...jobInfo};
          const response = await fetch(`http://localhost:5000/job/${job.id}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json'},
              body: JSON.stringify(body)
          })
          window.location = "/";
      } catch (error) {
          console.error(error);
      }
    }

    const deleteJob = async (id) => {
        try {
            const deleteJob = await fetch(`http://localhost:5000/job/${job.id}`, {
                method: 'DELETE'
            });
            
            window.location = "/";
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div>
            <div className="modal fade" id={`id${job.id}`} onClick={() => setJobInfo(job)}>
            <div className="modal-dialog">
                <div className="modal-content">

                <div className="modal-header">
                    <h4 className="modal-title">Update Job</h4>
                    <button 
                        type="button" 
                        className="btn-close" 
                        data-bs-dismiss="modal"
                        onClick={() => setJobInfo(job)}
                        >
                    </button>
                </div>

                <div className="modal-body">
                    <label>
                        Company Name:
                        <input
                            onChange={changeHandler} 
                            type="text"
                            name="company_name"
                            className="form-control" 
                            value={jobInfo.company_name} 
                        />
                    </label>

                    <label>
                        Job Role:
                        <input
                            onChange={changeHandler} 
                            type="text"
                            name="job_role"
                            className="form-control" 
                            value={jobInfo.job_role} 
                        />
                    </label>

                    <label>
                        Date:
                        <input
                            onChange={changeHandler} 
                            type="date"
                            name="date_applied"
                            className="form-control"
                            value={new Date(jobInfo.date_applied).toISOString().slice(0, 10)}
                        />
                    </label>

                    <div className="dropdown">
                        Application Status:
                        <select className="form-select" aria-label="status" name="app_status" onChange={changeHandler}>
                            <option hidden={true}>Select Status</option>
                            <option disabled="disabled" default={true}>Select Status</option>
                            <option>Applied</option>
                            <option>Rejected</option>
                            <option>Interviewed</option>
                            <option>Technical</option>
                            <option>Offer</option>
                        </select>
                    </div>
                </div>

                <div className="modal-footer">
                    <button 
                        type="button" 
                        className="btn btn-primary" 
                        data-bs-dismiss="modal"
                        onClick={e => updateJobInfo(e)}
                    >
                        Update
                    </button>

                    <button 
                        type="button" 
                        className="btn btn-danger" 
                        data-bs-dismiss="modal"
                        onClick={() => { window.confirm( 'Are you sure you want to delete this Job?', ) && deleteJob(job.id)}}
                    >
                        Delete
                    </button>
                </div>

                </div>
            </div>
            </div>
        </div>
    )
}

export default UpdateJobs;