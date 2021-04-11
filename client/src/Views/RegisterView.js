import React, {useState,useEffect} from 'react';
import FormField from '../components/molecules/FormField/FormField';
import styled from 'styled-components';
import { Button } from '../components/atoms/Button/Button';
import axios from "axios";
import useRegisterForm from "../hooks/useRegisterForm";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RegisterView = () => {

  const {handleInputChange,handleSubmitRegister,formValues} = useRegisterForm();

  return (
    <Wrapper as="form" onSubmit={handleSubmitRegister}>
      <FormField label="Name" id="name" name="name" value={formValues.name} onChange={handleInputChange} />
      <FormField label="Last Name" id="lastname" name="lastname" value={formValues.lastname} onChange={handleInputChange} />
      <FormField label="Phone Number" id="phone_number" name="phone_number" value={formValues.phone_number} onChange={handleInputChange} />
      <FormField label="E-mail" id="email" name="email" value={formValues.email}  onChange={handleInputChange} />
      <FormField label="Password" id="password" name="password" type="password" value={formValues.password} onChange={handleInputChange} />
      <FormField label="Confirm password" id="password_confirmation" name="password_confirmation" type="password" value={formValues.password_confirmation} onChange={handleInputChange} />
      <Button type="submit">Register</Button>
    </Wrapper>
  );
};

export default RegisterView;
