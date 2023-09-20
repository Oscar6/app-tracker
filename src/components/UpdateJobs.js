import React, { useState, useEffect } from "react";
import validator from "validator";
import { decodeHTMLEntities } from "./Helper";

const UpdateJobs = ({ job, refreshJobList }) => {

    const [jobInfo, setJobInfo] = useState({
        company_name: job.company_name,
        job_role: job.job_role,
        date_applied: job.date_applied,
        app_status: job.app_status,
        statusDate: "",
        status_rejected: job.status_rejected,
        status_interviewed: job.status_interviewed,
        status_technical: job.status_technical,
        status_offer: job.status_offer,
        job_link: job.job_link,
        job_salary: job.job_salary
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
                value === "Interviewed" ? "status_interviewed" :
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
    } else if (name === "statusDate") {
        setJobInfo((prevJobInfo) => ({
            ...prevJobInfo,
            statusDate: value.toString(),
            status_rejected:
                prevJobInfo.app_status === "Rejected" ? value.toString() : prevJobInfo.status_rejected,
            status_interviewed:
                prevJobInfo.app_status === "Interviewed" ? value.toString() : prevJobInfo.status_interviewed,
            status_technical:
                prevJobInfo.app_status === "Technical" ? value.toString() : prevJobInfo.status_technical,
            status_offer:
                prevJobInfo.app_status === "Offer" ? value.toString() : prevJobInfo.status_offer
        }));
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

      try {
          const body = {
            company_name: jobInfo.company_name,
            job_role: jobInfo.job_role,
            date_applied: jobInfo.date_applied,
            app_status: jobInfo.app_status,
            statusDate: jobInfo.statusDate,
            status_rejected: jobInfo.app_status === "Rejected" ? jobInfo.statusDate : jobInfo.status_rejected,
            status_interviewed: jobInfo.app_status === "Interviewed" ? jobInfo.statusDate : jobInfo.status_interviewed,
            status_technical: jobInfo.app_status === "Technical" ? jobInfo.statusDate : jobInfo.status_technical,
            status_offer: jobInfo.app_status === "Offer" ? jobInfo.statusDate : jobInfo.status_offer,
            job_link: jobInfo.job_link,
            job_salary: jobInfo.job_salary,
          };
          console.log('updating job')
          await fetch(`http://localhost:5000/job/${job.id}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json'},
              body: JSON.stringify(body)
          });
          refreshJobList();
      } catch (error) {
          console.error(error);
      }
    }

    const deleteJob = async (id) => {
        try {
            await fetch(`http://localhost:5000/job/${job.id}`, {
                method: 'DELETE'
            });
            refreshJobList();
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
                                    value={decodeHTMLEntities(jobInfo.company_name)}
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

                            <label>
                                Job Link: {/* Add Job Link input */}
                                <input
                                type="text"
                                name="job_link"
                                className="form-control"
                                onChange={changeHandler}
                                value={jobInfo.job_link}
                                />
                                {/* Add error message for job_link if needed */}
                            </label>

                            <label>
                                Job Salary: {/* Add Job Salary input */}
                                <input
                                type="text"
                                name="job_salary"
                                className="form-control"
                                onChange={changeHandler}
                                value={jobInfo.job_salary}
                                />
                                {/* Add error message for job_salary if needed */}
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