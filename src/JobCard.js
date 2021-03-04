import React from "react";
import {
  Card, Button, CardSubtitle, CardBody,
  CardTitle
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './JobCard.css'

function JobCard({id, title, salary, equity, companyName}) {

  /** Apply for a job */
  async function handleApply(e) {
    console.log(e)
  }

  return (
      <Card className="JobCard">
        <CardBody>
          <CardTitle tag="h5">{title}</CardTitle>
          <CardSubtitle tag="h6" className="mb-2">Salary: {salary}</CardSubtitle>
          <CardSubtitle tag="h6" className="mb-2">Equity: {equity}</CardSubtitle>
          <Button 
            className="JobCard-button"
            onClick={handleApply}
          >
            Apply
          </Button>
        </CardBody>
      </Card>
  );
}

export default JobCard;