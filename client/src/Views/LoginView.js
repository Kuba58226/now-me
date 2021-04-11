import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import FormField from '../components/molecules/FormField/FormField';
import styled from 'styled-components';
import { Button } from '../components/atoms/Button/Button';
import axios from 'axios';

import { ReactComponent as ManLogo } from '../assets/images/Group.svg';
import { ReactComponent as WomenLogo } from '../assets/images/Group-1.svg';

import { useSelector, useDispatch } from 'react-redux';
import { selectUserToken } from '../features/appSlice';
import { enterUserToken } from '../features/appSlice';

const initialFormState = {
  email: '',
  password: '',
};

const LoginView = () => {
  const [user, setUser] = useState([]);
  const [formValues, setFormValues] = useState(initialFormState);

  const dispatch = useDispatch();
  const history = useHistory();

  const handleInputChange = (event) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
  };

  const handleLogin = () => {
    axios
      .post('http://127.0.0.1:8000/api/auth/login', user)
      .then((response) => {
        if (response.status === 200) {
          dispatch(
            enterUserToken({
              userToken: response.data.access_token,
            })
          );
          history.push('/homepage');
        } else {
          alert('coś poszło nie tak');
        }
      })
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
    <Container>
      <Wrapper>
        <LeftSide>
          <h2>Now You !</h2>
          <Form as="form" onSubmit={handleSubmitRegister}>
            <FormField label="Email" id="email" name="email" onChange={handleInputChange} />
            <FormField label="Password" id="password" name="password" type="password" onChange={handleInputChange} />
            <Button type="submit">Login</Button>
          </Form>
          <p>Forgot password ? </p>
          <Register>
            <p>Not Our Member?</p>
            <h4>SIGN UP</h4>
          </Register>
        </LeftSide>

        <RightSide>
          <Women />
          <Man />
        </RightSide>
      </Wrapper>
    </Container>
  );
};

export default LoginView;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: whitesmoke;
`;

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  height: 90vh;
  background-color: #5163a1;
  border-radius: 100px;
  margin: 0 30px;
`;

const LeftSide = styled.div`
  display: flex;
  flex: 0.6;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > h2,
  h4,
  p {
    color: white;
  }

  > p {
    cursor: pointer;
    font-size: 15px;
    :hover {
      opacity: 0.8;
    }
  }
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Register = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h4 {
    margin-left: 10px;
    cursor: pointer;
    :hover {
      opacity: 0.8;
    }
  }
`;

const RightSide = styled.div`
  display: flex;
  flex: 0.4;
  justify-content: center;
  align-items: center;
  padding-right: 50px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Man = styled(ManLogo)`
  height: 300px;
`;

const Women = styled(WomenLogo)`
  height: 300px;
`;
