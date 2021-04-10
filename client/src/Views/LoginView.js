import React, { useState, useEffect } from 'react';
import FormField from '../components/molecules/FormField/FormField';
import styled from 'styled-components';
import { Button } from '../components/atoms/Button/Button';
import axios from 'axios';
import Alert from '@material-ui/lab/Alert';

import { ReactComponent as ManLogo } from '../assets/images/Group.svg';
import { ReactComponent as WomenLogo } from '../assets/images/Group-1.svg';

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

  const handleLogin = async () => {
    await axios
      .post('http://127.0.0.1:8000/api/auth/login', user)
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  };

  useEffect(() => handleLogin, [user]);

  const handleSubmitRegister = (event) => {
    event.preventDefault();
    const newUser = {
      email: formValues.email,
      password: formValues.password,
    };
    setUser(newUser);
  };

  return (
    <Wrapper>
      <LeftSide as="form" onSubmit={handleSubmitRegister}>
        <FormField label="Email" id="email" name="email" onChange={handleInputChange} />
        <FormField label="Password" id="password" name="password" type="password" onChange={handleInputChange} />
        <Button type="submit">Login</Button>
      </LeftSide>
      <RightSide>
        <Women />
        <Man />
      </RightSide>
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
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Man = styled(ManLogo)`
  height: 200px;
`;

const Women = styled(WomenLogo)`
  height: 200px;
`;
