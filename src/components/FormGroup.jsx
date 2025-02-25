import Form from 'react-bootstrap/Form';

const FormGroup = ({ label, type, placeholder, value, onChange}) => {
  return (
    <>
      <Form.Group className="mb-3" controlId={type}>
        <Form.Label>{label}</Form.Label>
        <Form.Control 
          type={type} 
          placeholder={placeholder} 
          value={value}
          onChange={onChange} 
          required
        />  
      </Form.Group>
    </>
  );
}

export default FormGroup;