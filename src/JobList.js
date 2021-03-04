import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import JobCard from "./JobCard"
import {JoblyApi} from './JoblyApi'
// import { Button, Form, FormGroup, Input } from 'reactstrap';
import SearchBox from './SearchBox'
import 'bootstrap/dist/css/bootstrap.css';
import './JobList.css'


/** Page of all the jobs.
 * Loads Jobs from API
 *
 * routed at /jobs
 *
 * Routes -> { JobCard, SearchForm }
 */

function JobList() {

  const [jobs, setJobs] = useState(null);

  useEffect(() => {
    async function getAllJobs() {
      const res = await JoblyApi.getAll('jobs');
      setJobs(res.jobs)
    }    
    getAllJobs();
  }, []);

  async function jobSearch(title) {
    let jobs = await JoblyApi.getJobs(title);
    console.log(jobs)
    setJobs(jobs)
  }

  
  function buildJobList(jobs) {
    return (
      jobs.map(j => 
        <JobCard 
        key={j.id} 
        id={j.id} 
        title={j.title}
        salary={j.salary}
        equity={j.equity}
      />)
    )
  }

  return (
    <div className="JobList">
      <SearchBox searchInput={jobSearch}/>
      {/* <Form onSubmit={companySearch}>
        <FormGroup>
          <Input type="text" />
          <Button>Search</Button>
        </FormGroup>
      </Form> */}
      {jobs ? buildJobList(jobs) : 'loading...'}
    </div>
  );
}

export default JobList;

