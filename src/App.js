import React, { useEffect, useState } from "react";
import './App.css';
import ListJobs from './components/ListJobs';
import NavBar from './components/NavBar';
import AddJob from './components/AddJob';


function App() {

  const [jobsList, setJobsList] = useState([]);

  const refreshJobList = async () => {
    try {
      console.log('Job List is refreshing')
      const res = await fetch("http://localhost:5000/job");
      const jsonData = await res.json();
      setJobsList(jsonData);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {refreshJobList()} ,[])  
  useEffect(() => {} ,[jobsList])


  return (
    <div>
      <NavBar />
      <AddJob setJobsList={setJobsList} refreshJobList={refreshJobList} />
      <ListJobs jobsList={jobsList} setJobsList={setJobsList} refreshJobList={refreshJobList} />
    </div>
  )
}

export default App;
