const Company = ({ company, onDelete }) => {
  return (
    <section>
      <h3>{company.name}</h3>
      <p>
        Website: <a href={company.website} target="_blank" rel="noopener noreferrer">{company.website}</a>
      </p>
      <p>Contact: {company.pointOfContact.person}</p>
      <p>Email: {company.pointOfContact.email}</p>
      <p>Phone: {company.pointOfContact.phone}</p>
      <p>Work Options: {company.workOptions}</p>
      <button onClick={() => onDelete(company.id)}>Delete</button>
    </section>
  );
};

export default Company;
