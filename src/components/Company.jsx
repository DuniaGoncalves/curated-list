import Button from "react-bootstrap/Button";
import Card from 'react-bootstrap/Card';

const Company = ({ company, onDelete }) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>{company.name}</Card.Title>
        <Card.Text>Website: <a href={company.website} target="_blank" rel="noopener noreferrer">{company.website}</a>
        </Card.Text>
        <Card.Text>Contact: {company.pointOfContact.person}</Card.Text>
        <Card.Text>Email: {company.pointOfContact.email}</Card.Text>
        <Card.Text>Phone: {company.pointOfContact.phone}</Card.Text>
        <Card.Text>Work Options: {company.workOptions}</Card.Text>
        <Button 
          as="input" 
          onClick={() => onDelete(company.id)}
          size="lg" 
          value="Delete"
          variant="danger" 
        />
      </Card.Body>
    </Card>
  );
}

export default Company;