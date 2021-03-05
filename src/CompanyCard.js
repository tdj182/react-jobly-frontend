import React from "react";
import {
  Card, CardText, CardBody,
  CardTitle
} from 'reactstrap';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import './CompanyCard.css'
import logo from './logos/logo1.png'


function CompanyCard({handle, name, logoUrl, description}) {
  return (
    <Link to={`/companies/${handle}`}>
      <Card className="CompanyCard">
        <CardBody>
          <div className="CompanyCard-card-top">
            <CardTitle tag="h5">{name}</CardTitle>
            {logoUrl && <img width="100%" src={logo} alt=""/> }
          </div>
          <CardText>{description}</CardText>
        </CardBody>
      </Card>
    </Link>
  );
}

export default CompanyCard;