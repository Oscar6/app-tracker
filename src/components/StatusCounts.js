import React from "react";

const StatusCounts = ({ jobs }) => {
  
  let rejectedCount = 0;
  let initialCount = 0;
  let technicalCount = 0;
  let offerCount = 0;

  jobs?.forEach(job => {

    if (job.status_rejected !== null && job.status_rejected !== undefined && job.status_rejected !== "") {
      rejectedCount++;
    }
    if (job.status_initial !== null && job.status_initial !== undefined && job.status_initial !== "") {
      initialCount++;
    }
    if (job.status_technical !== null && job.status_technical !== undefined && job.status_technical !== "") {
      technicalCount++;
    }
    if (job.status_offer !== null && job.status_offer !== undefined && job.status_offer !== "") {
      offerCount++;
    }
  });

  return (
    <div className="status-counts">
      <h1 className="statuses">Rejected: {rejectedCount}</h1>
      <h1 className="statuses">Initial: {initialCount}</h1>
      <h1 className="statuses">Technical: {technicalCount}</h1>
      <h1 className="statuses">Offer: {offerCount}</h1>
    </div>
  );
};

export default StatusCounts;