import React from "react";

const StatusCounts = ({ jobsList }) => {
  
  const counts = (jobsList || []).reduce(
    (acc, job) => {

      if (job.status_rejected && Date.parse(job.status_rejected)) {
        acc.rejectedCount++;
      }
      if (job.status_interviewed && Date.parse(job.status_interviewed)) {
        acc.interviewedCount++;
      }
      if (job.status_technical && Date.parse(job.status_technical)) {
        acc.technicalCount++;
      }
      if (job.status_offer && Date.parse(job.status_offer)) {
        acc.offerCount++;
      }
      return acc;
    },
    {
      rejectedCount: 0,
      interviewedCount: 0,
      technicalCount: 0,
      offerCount: 0,
    }
  );

  // console.log('status counts:', counts);

  return (
    <div className="status-counts">
      <h1 className="statuses">Rejected: {counts.rejectedCount}</h1>
      <h1 className="statuses">Interviewed: {counts.interviewedCount}</h1>
      <h1 className="statuses">Technical: {counts.technicalCount}</h1>
      <h1 className="statuses">Offer: {counts.offerCount}</h1>
    </div>
  );
};

export default StatusCounts;
