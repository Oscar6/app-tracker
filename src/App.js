import React, { useState } from "react";
import './App.css';
import ListJobs from './components/ListJobs';
import NavBar from './components/NavBar';
import AddJob from './components/AddJob';


function App() {

  const [jobsList, setJobsList] = useState([]);

  return (
      <div>
        <NavBar />
        <AddJob setJobsList={setJobsList}/>
        <ListJobs jobsList={jobsList} setJobsList={setJobsList}/>
      </div>
  )
}

export default App;
