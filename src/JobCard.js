import React, {useContext, useEffect, useState} from "react";
import UserContext from "./UserContext";
import {
  Card, Button, CardSubtitle, CardBody,
  CardTitle
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './JobCard.css'

function JobCard({id, title, salary, equity, companyName}) {

  const { hasAlreadyApplied, applyToJob } = useContext(UserContext);
  const [isApplied, setIsApplied] = useState();

  useEffect(() => {
    setIsApplied(hasAlreadyApplied(id))
  }, [id, hasAlreadyApplied])


  /** Apply for a job */
  async function handleClick(e) {
    if (!hasAlreadyApplied(id)) {
      applyToJob(id);
      setIsApplied(true)
    }
  }

  return (
      <Card className="JobCard">
        <CardBody>
          <CardTitle tag="h5">{title}</CardTitle>
          <CardSubtitle tag="h6" className="mb-2">{companyName}</CardSubtitle>
          <CardSubtitle tag="h6" className="mb-2">Salary: {salary}</CardSubtitle>
          <CardSubtitle tag="h6" className="mb-2">Equity: {equity}</CardSubtitle>
          <Button 
            className="JobCard-button"
            onClick={handleClick}
            disabled={isApplied}
            color='danger'
          >
            {isApplied ? "Applied" : "Apply"}
          </Button>
        </CardBody>
      </Card>
  );
}

export default JobCard;