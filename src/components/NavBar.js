import React from "react";

function NavBar() {
  return (
    <div className="nav">
      <h1>Job Tracker</h1>
      <div className="add-job">
        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#addJobModal"
        >
          Add Job
        </button>
      </div>
    </div>
  )
}

export default NavBar;