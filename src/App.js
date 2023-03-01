import './App.css';
import ListJobs from './components/ListJobs';
import NavBar from './components/NavBar';
import AddJob from './components/AddJob';


function App() {
  return (
      <div>
        <NavBar />
        <AddJob />
        <ListJobs />
      </div>
  )
}

export default App;
