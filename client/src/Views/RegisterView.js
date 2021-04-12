import React from 'react';
import FormField from '../components/molecules/FormField/FormField';
import styled from 'styled-components';
import { Button } from '../components/atoms/Button/Button';
import useRegisterForm from '../hooks/useRegisterForm';
import { Alert } from '@material-ui/lab';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RegisterView = () => {
  const { handleInputChange, handleSubmitRegister, handleValidateFormValue, formValues, isValid, isSubmit, isLoading } = useRegisterForm();

  return (
    <Wrapper as="form" onSubmit={handleSubmitRegister}>
      <FormField label="Name" id="name" name="name" value={formValues.name} onChange={handleInputChange} onBlur={handleValidateFormValue} />
      {!isValid.name ? (
        <Alert variant="outlined" severity="warning" style={{ marginTop: '10px' }}>
          Name required!
        </Alert>
      ) : null}
      <FormField
        label="Last Name"
        id="lastname"
        name="lastname"
        value={formValues.lastname}
        onChange={handleInputChange}
        onBlur={handleValidateFormValue}
      />
      {!isValid.lastname ? (
        <Alert variant="outlined" severity="warning" style={{ marginTop: '10px' }}>
          Lastname required
        </Alert>
      ) : null}
      <FormField
        label="Phone Number"
        id="phone_number"
        name="phone_number"
        value={formValues.phone_number}
        onChange={handleInputChange}
        onBlur={handleValidateFormValue}
      />
      {!isValid.phone_number ? (
        <Alert variant="outlined" severity="warning" style={{ marginTop: '10px' }}>
          Entered phone number is Invalid
        </Alert>
      ) : null}
      <FormField label="E-mail" id="email" name="email" value={formValues.email} onChange={handleInputChange} onBlur={handleValidateFormValue} />
      {!isValid.email ? (
        <Alert variant="outlined" severity="warning" style={{ marginTop: '10px' }}>
          Entered Email address is Invalid
        </Alert>
      ) : null}
      <FormField
        label="Password"
        id="password"
        name="password"
        type="password"
        value={formValues.password}
        onChange={handleInputChange}
        onBlur={handleValidateFormValue}
      />
      {!isValid.password ? (
        <Alert variant="outlined" severity="warning" style={{ marginTop: '10px' }}>
          Your password must be at least 6 characters long{' '}
        </Alert>
      ) : null}
      <FormField
        label="Confirm password"
        id="password_confirmation"
        name="password_confirmation"
        type="password"
        value={formValues.password_confirmation}
        onChange={handleInputChange}
        onBlur={handleValidateFormValue}
      />
      {!isValid.password_confirmation ? (
        <Alert variant="outlined" severity="warning" style={{ marginTop: '10px' }}>
          Passwords do not match
        </Alert>
      ) : null}
      <Button type="submit">Register</Button>
    </Wrapper>
  );
};

export default RegisterView;
