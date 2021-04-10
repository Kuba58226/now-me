import React, { useState, useEffect } from 'react';
import FormField from '../components/molecules/FormField/FormField';
import styled from 'styled-components';
import { Button } from '../components/atoms/Button/Button';
import axios from 'axios';

const initialFormState = {
  email: '',
  password: '',
};

const LoginView = () => {
  const [user, setUser] = useState([]);
  const [formValues, setFormValues] = useState(initialFormState);

  const handleInputChange = (event) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    axios
      .post('http://127.0.0.1:8000/api/auth/login', user)
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  }, [user]);

  const handleSubmitRegister = (event) => {
    event.preventDefault();
    const newUser = {
      email: formValues.email,
      password: formValues.password,
    };
    setUser(newUser);
  };

  return (
    <Wrapper as="form" onSubmit={handleSubmitRegister}>
      <LeftSide>
        <FormField label="Email" id="email" name="email" onChange={handleInputChange} />
        <FormField label="Password" id="password" name="password" type="password" onChange={handleInputChange} />
        <Button onClick={handleInputChange}>Login</Button>
      </LeftSide>
      <RightSide>Działa</RightSide>
    </Wrapper>
  );
};

export default LoginView;

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  background-color: #5163a1;
  /* flex: 1; */
  /* flex-direction: column; */
  /* align-items: center; */
`;

const LeftSide = styled.div`
  display: flex;
  flex: 0.6;
  flex-direction: column;
  align-items: center;
`;

const RightSide = styled.div`
  display: flex;
  flex: 0.4;
`;
