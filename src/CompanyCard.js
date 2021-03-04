import React from "react";
import {
  Card, CardImg, CardText, CardBody,
  CardTitle
} from 'reactstrap';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import './CompanyCard.css'

function CompanyCard({handle, name, logoUrl, description}) {
  return (
    <Link to={`/companies/${handle}`}>
      <Card className="CompanyCard">
        <CardBody>
          <div className="CompanyCard-card-top">
            <CardTitle tag="h5">{name}</CardTitle>
            {logoUrl && <CardImg width="10%" src={logoUrl} alt="image"/> }
          </div>
          <CardText>{description}</CardText>
        </CardBody>
      </Card>
    </Link>
  );
}

export default CompanyCard;