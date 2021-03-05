import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import CompanyCard from "./CompanyCard"
import './CompanyList.css'
import {JoblyApi} from './JoblyApi'
// import { Button, Form, FormGroup, Input } from 'reactstrap';
import SearchBox from './SearchBox'
import 'bootstrap/dist/css/bootstrap.css';


/** Page of all the companies.
 * Loads Companies from API
 *
 * routed at /companies
 *
 * Routes -> { CompanyCard, SearchForm }
 */

function CompanyList() {

  const [companies, setCompanies] = useState(null);

  //grab all the companies
  useEffect(() => {
    async function getAllCompanies() {
      const res = await JoblyApi.getAll('companies');
      setCompanies(res.companies)
    }    
    getAllCompanies();
  }, []);

  /** The function to pass the SearchBox component
   */
  async function companySearch(name) {
    let companies = await JoblyApi.getCompanies(name);
    setCompanies(companies)
  }

  /** builds a list of company cards that are passed info on a company */
  function buildCompanyList(companies) {
    return (
      companies.map(c => 
      <CompanyCard 
        key={c.handle} 
        handle={c.handle} 
        name={c.name} 
        logoUrl={c.logoUrl} 
        description={c.description}
      />)
    )
  }

  return (
    <div className="CompanyList">
      <SearchBox searchInput={companySearch}/>
      {/* <Form onSubmit={companySearch}>
        <FormGroup>
          <Input type="text" />
          <Button>Search</Button>
        </FormGroup>
      </Form> */}
      {companies ? buildCompanyList(companies) : 'loading...'}
    </div>
  );
}

export default CompanyList;

