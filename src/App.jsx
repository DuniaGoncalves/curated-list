import { useState, useEffect } from 'react'
import axios from 'axios'
import { Company } from './components/Company'

// function to add company
// function to delete company
// functiont to filter company

const App = () => {
  const [companies, setCompanies] = useState([])
  const [newCompany, setNewCompany] = useState('')

  useEffect(() => {
    console.log('effect')
    axios.get('http://localhost:3001/companies')
      .then((response) => {
      console.log('promise fulfilled')
      setCompanies(response.data)
    })
    .catch(error => {
      console.error('error fetching data', error)
    })
  }, [])
  console.log('render', companies.length, 'companies')

  const addCompany = (event) => {
    event.preventDefault()
    
    const companyObject = {
      name: newCompany.name,
      website: newCompany.website, 
      pointOfContact: {
        person: newCompany.pointOfContact.person, 
        email: newCompany.pointOfContact.email, 
        phone: newCompany.pointOfContact.phone 
      },
      workOptions: newCompany.workOptions,
      id: String(companies.length + 1),
    }

    axios.post('http://localhost:3001/companies', companyObject)
    .then(response => {
      setCompanies(companies.concat(response.data))
      setNewCompany('')
    })
    .catch(error => {
      console.error('error adding company', error)
    })
  }

  const display = () => console.log(companyObject);
  const handleCompanyChange = (event) => {
    setNewCompany(event.target.value)
  }

  return (
    <>
      <h2>Curated HitList</h2>
      <ul>
        {companies.map(company => 
          <Company key={company.id} company={company} />
        )}
      </ul>
      <form onSubmit={addCompany}>
        <label>Company Name:</label>
        <input 
          value={newCompany.name} 
          onChange={handleCompanyChange}
          placeholder='Company Name'
          name="name"
        />
        <label>Website: </label>
        <input 
          value={newCompany.website} 
          onChange={handleCompanyChange}
          placeholder='Company Website'
          name="website"
        />
        <label>Contact: </label>
        <input 
          value={newCompany.pointOfContact.person} 
          onChange={handleCompanyChange}
          placeholder='Contact Person'
          name="person"
          type='text'
        />
        <input 
          value={newCompany.pointOfContact.email} 
          onChange={handleCompanyChange}
          placeholder='Email Address'
          name='email'
          type='email'
        />
        <input 
          value={newCompany.pointOfContact.phone} 
          onChange={handleCompanyChange}
          placeholder='Phone Number'
          name='phone'
          type='tel'
        />
        <input 
          value={newCompany.workOptions} 
          onChange={handleCompanyChange}
          placeholder='Company Work Option'
          name="workOptions"
        />

        <button onClick={display}>save</button>
      </form>
    </>
  )
}

export default App
