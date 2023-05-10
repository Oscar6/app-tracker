import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import validator from "validator";

const AddJob = ({ setJobsList }) => {

    const [newJob, setNewJob] = useState({
        company_name: "",
        job_role: "",
        date_applied: "",
        app_status: "",
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
          }
    
        setNewJob({
            ...newJob,
            [name]: value
        });
    };

    useEffect(() => {
        if (validator.isLength(newJob.company_name, { min: 1, max: 50 }) && validator.isLength(newJob.job_role, { min: 1, max: 50 })) {
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
        }
    }, [newJob]);

    const handleSubmitClick = async e => {
        e.preventDefault();
    
        // Sanitizing input values
        const companyName = validator.escape(newJob.company_name);
        const jobRole = validator.escape(newJob.job_role);
        const dateApplied = validator.escape(newJob.date_applied);
        const appStatus = validator.escape(newJob.app_status);
    
        try {
            const body = { 
                company_name: companyName,
                job_role: jobRole,
                date_applied: dateApplied,
                app_status: appStatus,
            };
            const response = await fetch("http://localhost:5000/job", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });
    
            const data = await response.json();
            setJobsList(prevJobsList => [...prevJobsList, data]);
            setNewJob({
                company_name: "",
                job_role: "",
                date_applied: "",
                app_status: "",
            });
            window.location = "/";
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <div className="modal fade" id='myModal' data-bs-backdrop="static">
                <div className="modal-dialog">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h4 className="modal-title">Add Job</h4>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                            >
                            </button>
                        </div>

                        <div className="modal-body">
                            <label>
                                Company Name:
                                <input
                                    type="text"
                                    name="company_name"
                                    className="form-control"
                                    onChange={changeHandler}
                                    value={newJob.company_name}
                                />
                                {errorMessages.company_name && (
                                    <p className="text-danger">{errorMessages.company_name}</p>
                                )}
                            </label>

                            <label>
                                Job Role:
                                <input
                                    type="text"
                                    name="job_role"
                                    className="form-control"
                                    onChange={changeHandler}
                                    value={newJob.job_role}
                                />
                                {errorMessages.job_role && (
                                    <p className="text-danger">{errorMessages.job_role}</p>
                                )}
                            </label>

                            <label className="date-input">
                                Date:
                                <input
                                    type="date"
                                    name="date_applied"
                                    className="form-control"
                                    onChange={changeHandler}
                                    value={newJob.date_applied}
                                />
                            </label>

                            <div className="dropdown">
                                Application Status:
                                <select className="form-select" aria-label="status" name="app_status" onChange={changeHandler} value={newJob.app_status}>
                                    <option hidden={true}>Select Status</option>
                                    <option disabled="disabled" default={true}> Select Status</option>
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
                                className="btn btn-success"
                                data-bs-dismiss="modal"
                                onClick={handleSubmitClick}
                                disabled={isDisabled}
                            >
                                Submit
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
};

AddJob.propTypes = {
    setJobsList: PropTypes.func.isRequired,
  };

export default AddJob;