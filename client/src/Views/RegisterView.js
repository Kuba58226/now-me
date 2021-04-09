import React from 'react';
import FormField from '../components/molecules/FormField/FormField';
import styled from 'styled-components';
import { Button } from '../components/atoms/Button/Button';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RegisterView = () => {
  return (
    <Wrapper>
      <FormField label="Name" id="name" name="name" />
      <FormField label="Last Name" id="lastname" name="lastname" />
      <FormField label="Phone Number" id="phonenumber" name="phonenumber" />
      <FormField label="E-mail" id="email" name="email" />
      <FormField label="Password" id="password" name="password" type="password" />
      <FormField label="Password" id="password" name="password" type="password" />
      <Button>Register</Button>
    </Wrapper>
  );
};

export default RegisterView;
