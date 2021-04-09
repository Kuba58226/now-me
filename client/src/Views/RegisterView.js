import React, {useState,useEffect} from 'react';
import FormField from '../components/molecules/FormField/FormField';
import styled from 'styled-components';
import { Button } from '../components/atoms/Button/Button';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const initialFormState = {
  name: '',
  lastname: '',
  phoneNumber: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const RegisterView = () => {

  const [formValues, setFormValues] = useState(initialFormState);

  const handleInputChange = (event) => {
    console.log(formValues);
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
  };

  const handleSumbitRegister = (event) =>{
    event.preventDefault();
    const newUser = {
      name: formValues.name,
      lastname: formValues.lastname,
      phoneNumber: formValues.phoneNumber,
      email: formValues.email,
      password: formValues.password,
      confirmPassword: formValues.confirmPassword,
    }
  }

  return (
    <Wrapper as="form">
      <FormField label="Name" id="name" name="name" value={formValues.name} onChange={handleInputChange} />
      <FormField label="Last Name" id="lastname" name="lastname" value={formValues.lastname} onChange={handleInputChange} />
      <FormField label="Phone Number" id="phoneNumber" name="phoneNumber" value={formValues.phoneNumber} onChange={handleInputChange} />
      <FormField label="E-mail" id="email" name="email" value={formValues.email}  onChange={handleInputChange} />
      <FormField label="Password" id="password" name="password" type="password" value={formValues.password} onChange={handleInputChange} />
      <FormField label="Confirm password" id="confirmPassword" name="confirmPassword" type="password" value={formValues.confirmPassword} onChange={handleInputChange} />
      <Button type="submit">Register</Button>
    </Wrapper>
  );
};

export default RegisterView;
