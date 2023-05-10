import React, { useState, useEffect } from "react";
import validator from "validator";

const UpdateJobs = ({ job, setJobsList }) => {
    // console.log(job);
    const [jobInfo, setJobInfo] = useState({
        company_name: job.company_name,
        job_role: job.job_role,
        date_applied: job.date_applied,
        app_status: job.app_status,
        statusDate: "",
        status_rejected: job.status_rejected,
        status_initial: job.status_initial,
        status_technical: job.status_technical,
        status_offer: job.status_offer
    });

    const [errorMessages, setErrorMessages] = useState({
        company_name: "",
        job_role: ""
    });

    const [isDisabled, setIsDisabled] = useState(true);

    const changeHandler = (e) => {
    const { name, value } = e.target;

    if (name === "company_name") {
            if (!validator.isLength(value, { min: 0, max: 50 })) {
              setErrorMessages({
                ...errorMessages,
                company_name: "Max characters allowed reached",
              });
            } else {
              setErrorMessages({
                ...errorMessages,
                company_name: "",
              });
            }
          } else if (name === "job_role") {
            if (!validator.isLength(value, { min: 0, max: 50 })) {
                setErrorMessages({
                ...errorMessages,
                job_role: "Max characters allowed reached",
              });
            } else {
                setErrorMessages({
                ...errorMessages,
                job_role: "",
              });
            }
          };

    if (name === "app_status" && value !== "Applied") {
        setJobInfo((prevJobInfo) => {
            const statusToUpdate = value === "Rejected" ? "status_rejected" :
                value === "Interviewed" ? "status_initial" :
                value === "Technical" ? "status_technical" :
                value === "Offer" ? "status_offer" : null;

            if (statusToUpdate) {
                return {
                    ...prevJobInfo,
                    app_status: value,
                    [statusToUpdate]: new Date().toISOString()
                };
            } else {
                return {
                    ...prevJobInfo,
                    app_status: value
                };
            }
        });
    } else {
        setJobInfo({ ...jobInfo, [name]: value });
    }
};

useEffect(() => {
        if (validator.isLength(jobInfo.company_name, { min: 1, max: 50 }) && validator.isLength(jobInfo.job_role, { min: 1, max: 50 })) {
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
        }
    }, [jobInfo]);

    const updateJobInfo = async e => {
        e.preventDefault();

        const companyName = validator.escape(jobInfo.company_name);
        const jobRole = validator.escape(jobInfo.job_role);
        const dateApplied = validator.escape(jobInfo.date_applied);
        const appStatus = validator.escape(jobInfo.app_status);

      try {
          const body = {
            company_name: companyName,
            job_role: jobRole,
            date_applied: dateApplied,
            app_status: appStatus,
            statusDate: "",
            status_rejected: job.status_rejected,
            status_initial: job.status_initial,
            status_technical: job.status_technical,
            status_offer: job.status_offer
          };
          const response = await fetch(`http://localhost:5000/job/${job.id}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json'},
              body: JSON.stringify(body)
          });
          setJobsList(prevJobsList => prevJobsList.map(prevJob => prevJob.id === job.id ? { ...prevJob, ...jobInfo } : prevJob));
      } catch (error) {
          console.error(error);
      }
    }

    const deleteJob = async (id) => {
        try {
            const deleteJob = await fetch(`http://localhost:5000/job/${job.id}`, {
                method: 'DELETE'
            });
            setJobsList(prevJobsList => prevJobsList.filter(prevJob => prevJob.id !== job.id));
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div>
            <div className="modal fade" id={`id${job.id}`} data-bs-backdrop="static">
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
                                {errorMessages.company_name && (
                                    <p className="text-danger">{errorMessages.company_name}</p>
                                )}
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
                                {errorMessages.job_role && (
                                    <p className="text-danger">{errorMessages.job_role}</p>
                                )}
                            </label>

                            <label className="date-input">
                                Applied On:
                                <input
                                    readOnly
                                    type="text"
                                    name="date_applied"
                                    className="form-control"
                                    value={new Date(jobInfo.date_applied).toLocaleDateString()}
                                />
                            </label>

                            <div className="dropdown">
                                Application Status:
                                <select className="form-select" aria-label="status" name="app_status" onChange={changeHandler} value={jobInfo.app_status}>
                                    <option disabled>Select Status</option>
                                    <option value="Applied">Applied</option>
                                    <option value="Rejected">Rejected</option>
                                    <option value="Interviewed">Interviewed</option>
                                    <option value="Technical">Technical</option>
                                    <option value="Offer">Offer</option>
                                </select>
                                {jobInfo.app_status !== "Applied" && (
                                // Render date input only when status is changed from "Applied" to another option
                                <div>
                                    <label htmlFor="statusDate">on:
                                        <input
                                            type="date"
                                            id="statusDate"
                                            name="statusDate"
                                            className="form-control"
                                            value={jobInfo.statusDate}
                                            onChange={changeHandler}
                                        />
                                    </label>
                                </div>
                                )}
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-primary"
                                data-bs-dismiss="modal"
                                onClick={e => updateJobInfo(e)}
                                disabled={isDisabled}
                            >
                                Update
                            </button>

                            <button
                                type="button"
                                className="btn btn-danger"
                                data-bs-dismiss="modal"
                                onClick={() => { window.confirm('Are you sure you want to delete this Job?',) && deleteJob(job.id) }}
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