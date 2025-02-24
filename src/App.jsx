import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Company from './components/Company';

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


    setCompanies([...companies, companyObject]);

    // Reset the form
    setNewCompany({
      name: '',
      website: '',
      pointOfContact: { person: '', email: '', phone: '' },
      workOptions: '',
    });
  };

  // Delete a company
  const deleteCompany = (id) => {setCompanies(companies.filter((company) => company.id !== id))}


  // Filter companies based on the search input
  const filteredCompanies = companies.filter((company) =>
    company.workOptions.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <>
      <h2>Curated HitList</h2>

      {/* Filter input */}
      <input
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Search by work options
      "
      />

      {/* Company list */}
      <section>
        {filteredCompanies.map((company) => (
          <Company key={company.id} company={company} onDelete={deleteCompany} />
        ))}
      </section>

      <h3>Add a New Company</h3>

      {/* Form to add new companies */}
      <form onSubmit={addCompany}>
        <input
          type="text"
          name="name"
          value={newCompany.name}
          onChange={handleChange}
          placeholder="Company Name"
          required
        />
        <input
          type="text"
          name="website"
          value={newCompany.website}
          onChange={handleChange}
          placeholder="Website URL"
          required
        />
        <input
          type="text"
          name="person"
          value={newCompany.pointOfContact.person}
          onChange={handleChange}
          placeholder="Point of Contact Name"
          required
        />
        <input
          type="email"
          name="email"
          value={newCompany.pointOfContact.email}
          onChange={handleChange}
          placeholder="Contact Email"
          required
        />
        <input
          type="text"
          name="phone"
          value={newCompany.pointOfContact.phone}
          onChange={handleChange}
          placeholder="Contact Phone"
          required
          maxLength={10}
        />
        <select
          name="workOptions"
          value={newCompany.workOptions}
          onChange={handleChange}
          required
        >
          <option value="">Select Work Option</option>
          <option value="remote">Remote</option>
          <option value="hybrid">Hybrid</option>
          <option value="inPerson">In Person</option>
        </select>
        <button type="submit">Save</button>
      </form>
    </>
  );
};

export default App;
