import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Company from './components/Company';
import Form from 'react-bootstrap/Form';
import FormGroup from './components/FormGroup';
import Row from 'react-bootstrap/Row';

const App = () => {
  const [companies, setCompanies] = useState([]);
  const [newCompany, setNewCompany] = useState({
    name: '',
    website: '',
    pointOfContact: { person: '', email: '', phone: '' },
    workOptions: '',
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    console.log('Fetching companies...');
    axios
      .get('http://localhost:3001/companies')
      .then((response) => {
        console.log('Data fetched:', response.data);
        setCompanies(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (['person', 'email', 'phone'].includes(name)) {
      setNewCompany((prev) => ({
        ...prev,
        pointOfContact: { ...prev.pointOfContact, [name]: value },
      }));
    } else {
      setNewCompany((prev) => ({ ...prev, [name]: value }));
    }
  };

  const addCompany = (event) => {
    event.preventDefault();

    const companyObject = {
      ...newCompany,
      id: String(companies.length + 1),
    };

    axios.post('http://localhost:3001/companies', companyObject)
      .then(response => {
        setCompanies([...companies, companyObject]);
        console.log('Data posted:', response.data);
        setNewCompany({
          name: '',
          website: '',
          pointOfContact: { person: '', email: '', phone: '' },
          workOptions: ''
        });
      })
      .catch(error => {
        console.error('Error adding company:', error);
      });
    
    setNewCompany({
      name: '',
      website: '',
      pointOfContact: { person: '', email: '', phone: '' },
      workOptions: '',
    });
  };

  const deleteCompany = (id) => {setCompanies(companies.filter((company) => company.id !== id))}


  const filteredCompanies = companies.filter((company) =>
    company.workOptions.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <>
      <h2>Curated HitList</h2>

      <section>
        <FormGroup 
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Search by work options"
          type="text"
          value={filter}
        />
      </section>

        <Row xs={1} md={2} className="g-4">
          {filteredCompanies.map((company) => (
            <Col key={company.id}>.
              <Company key={company.id} company={company} onDelete={deleteCompany} />
            </Col>
          ))}
        </Row>

          <h3>Add a New Company</h3>
          <Form onSubmit={addCompany}>
            <FormGroup 
              controlId="name"
              label="Company Name"
              onChange={handleChange}
              required
              type="text"
              value={newCompany.name}
            />
            <FormGroup 
              controlId="website"
              label="Website URL"
              onChange={handleChange}
              required
              type="text"
              value={newCompany.website}
            />
            <FormGroup 
              controlId="person"
              label="Contact Person"
              onChange={handleChange}
              required
              type="text"
              value={newCompany.pointOfContact.person}
            />
            <FormGroup 
              controlId="email"
              label="Email Address"
              onChange={handleChange}
              type="email"
              value={newCompany.pointOfContact.email}
            />
            <FormGroup 
              controlId="phone"
              label="Phone Number"
              onChange={handleChange}
              type="text"
              value={newCompany.pointOfContact.phone}
            />
            <Form.Select 
              name="workOptions"
              value={newCompany.workOptions}
              onChange={handleChange}
            >
              <option>Select Work Options</option>
              <option value="remote">Remote</option>
              <option value="hybrid">Hybrid</option>
              <option value="inPerson">In Person</option>
            </Form.Select>
            <Button 
              as="input" 
              size="lg" 
              type="submit" 
              value="Submit Form"
              variant="primary" 
            />
          </Form>
    </>
  );
};

export default App;
