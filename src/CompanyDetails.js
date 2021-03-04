import React, {useEffect, useState} from "react";
import {JoblyApi} from './JoblyApi'
import { useParams } from 'react-router-dom';
import {
  Card, CardText, CardBody,
  CardTitle
} from 'reactstrap';
import JobCard from './JobCard'
import 'bootstrap/dist/css/bootstrap.css';
import './CompanyDetails.css'

/** Shows details of a specific company.
 *
 * On mount, loads companies from API.
 * Re-loads filtered companies on submit from search form.
 *
 * This is routed to at /companies
 *
 * Routes -> { CompanyCard, SearchForm }
 */

function CompanyDetails() {
  const {handle} = useParams();

  const [company, setCompany] = useState(null);

  useEffect(() => {
    async function getCompany() {
      setCompany(await JoblyApi.getCompany(handle))
    }    
    getCompany();
  }, [handle]);

  function buildCompany(company) {
    console.log(company.jobs)
    return (
      <div className="CompanyDetails">
        <Card className="CompanyDetails-card">
          <CardBody>
            <div className="CompanyDetails-card-top">
              <CardTitle tag="h5">{company.name}</CardTitle>
            </div>
            <CardText>{company.description}</CardText>
          </CardBody>
        </Card>
        {company.jobs.map(j =>(
          <JobCard 
            key={j.id} 
            id={j.id} 
            title={j.title}
            salary={j.salary}
            equity={j.equity}
          />
        ))}
      </div>
    )
  }
  
  return(
    <div>
      {company ? buildCompany(company) : "loading.."}
      {/* We made it: {handle} */}
    </div>

  )
}

export default CompanyDetails;