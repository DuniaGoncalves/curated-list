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
    axios.get('http://localhost:3001/companies').then((response) => {
      console.log('promise fulfilled')
      setCompanies(response.data)
    })
  }, [])
  console.log('render', companies.length, 'companies')

  const addCompany = (event) => {
    event.preventDefault()
    
    const companyObject = {
      name: newCompany,
      website: 'http://example.com', // Add appropriate website URL
      pointOfContact: {
        name: 'John Doe', // Add appropriate point of contact name
        email: 'john.doe@example.com', // Add appropriate point of contact email
        phone: '123-456-7890' // Add appropriate point of contact phone number
      },
      id: String(companies.length + 1),
    }
    setCompanies(companies.concat(companyObject))
    setNewCompany('')
  }

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
        <input value={newCompany} onChange={handleCompanyChange} />
        <button type="submit">save</button>
      </form>
    </>
  )
}

export default App
