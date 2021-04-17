import React from 'react';
import FormField from '../components/molecules/FormField/FormField';
import styled from 'styled-components';
import { Button } from '../components/atoms/Button/Button';
import useRegisterForm from '../hooks/useRegisterForm';
import { Alert } from '@material-ui/lab';
import { ReactComponent as LoginLogo } from '../assets/images/Login_Image.svg';

const RegisterView = () => {
  const { handleInputChange, handleSubmitRegister, handleValidateFormValue, formValues, isValid } = useRegisterForm();

  return (
    <Wrapper as="form" onSubmit={handleSubmitRegister}>
      <FormWrapper>
        <FormFieldWrapper>
          <FormField label="Name" id="name" name="name" value={formValues.name} onChange={handleInputChange} onBlur={handleValidateFormValue} />
          {!isValid.name ? (
            <Alert variant="outlined" severity="warning" style={{ fontSize: '11px', padding: '5px 10px', marginTop: '15px' }}>
              Name required!
            </Alert>
          ) : null}
        </FormFieldWrapper>
        <FormFieldWrapper>
          <FormField label="Last Name" id="lastname" name="lastname" value={formValues.lastname} onChange={handleInputChange} onBlur={handleValidateFormValue} />
          {!isValid.lastname ? (
            <Alert variant="outlined" severity="warning" style={{ fontSize: '11px', padding: '5px 10px', marginTop: '15px' }}>
              Lastname required
            </Alert>
          ) : null}
        </FormFieldWrapper>
        <FormFieldWrapper>
          <FormField label="Phone Number" id="phone_number" name="phone_number" value={formValues.phone_number} onChange={handleInputChange} onBlur={handleValidateFormValue} />
          {!isValid.phone_number ? (
            <Alert variant="outlined" severity="warning" style={{ fontSize: '11px', padding: '4px 7px', marginTop: '15px' }}>
              Entered phone number is Invalid
            </Alert>
          ) : null}
        </FormFieldWrapper>
        <FormFieldWrapper>
          <FormField label="E-mail" id="email" name="email" value={formValues.email} onChange={handleInputChange} onBlur={handleValidateFormValue} />
          {!isValid.email ? (
            <Alert variant="outlined" severity="warning" style={{ fontSize: '11px', padding: '4px 7px', marginTop: '15px' }}>
              Entered Email address is Invalid
            </Alert>
          ) : null}
        </FormFieldWrapper>
        <FormFieldWrapper>
          <FormField label="Password" id="password" name="password" type="password" value={formValues.password} onChange={handleInputChange} onBlur={handleValidateFormValue} />
          {!isValid.password ? (
            <Alert variant="outlined" severity="warning" style={{ fontSize: '11px', padding: '4px 7px', marginTop: '15px' }}>
              Your password must be at least 6 characters long{' '}
            </Alert>
          ) : null}
        </FormFieldWrapper>
        <FormFieldWrapper>
          <FormField label="Confirm password" id="password_confirmation" name="password_confirmation" type="password" value={formValues.password_confirmation} onChange={handleInputChange} onBlur={handleValidateFormValue} />
          {!isValid.password_confirmation ? (
            <Alert variant="outlined" severity="warning" style={{ fontSize: '11px', padding: '5px 10px', marginTop: '15px' }}>
              Passwords do not match
            </Alert>
          ) : null}
        </FormFieldWrapper>
        <Button type="submit">Register</Button>
      </FormWrapper>
      <LoginImage />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  height: 90vh;
  grid-template-columns: 1fr 1fr;
  place-items: center;

  @media screen and (max-width: 1246px) {
    grid-template-columns: 1fr;
  }
`;

const FormWrapper = styled.div`
  padding: 10px;
  display: grid;
  place-items: center;
`;

const LoginImage = styled(LoginLogo)`
  @media screen and (max-width: 1355px) {
    width: 533px;
    height: 435px;
  }

  @media screen and (max-width: 1246px) {
    display: none;
  }
`;

const FormFieldWrapper = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 200px;
  place-items: center;
  @media screen and (max-width: 1246px) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 45px;
  }
`;

export default RegisterView;
