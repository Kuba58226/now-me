import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import FormField from '../components/molecules/FormField/FormField';
import { Button } from '../components/atoms/Button/Button';

import { ReactComponent as ManLogo } from '../assets/images/Group.svg';
import { ReactComponent as WomenLogo } from '../assets/images/Group-1.svg';

import { useDispatch } from 'react-redux';
import { enterUserToken, enterUserRole } from '../features/appSlice';

import { Alert } from '@material-ui/lab';
import Swal from 'sweetalert2';

const initialFormState = {
  email: '',
  password: '',
};

const initialValidState = {
  email: true,
  password: true,
};

const LoginView = () => {
  const [formValues, setFormValues] = useState(initialFormState);
  const [isValid, setIsValid] = useState(initialValidState);

  const dispatch = useDispatch();
  const history = useHistory();

  const handleInputChange = (event) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (isValid.email === true && formValues.email.length > 0 && isValid.password === true && formValues.password.length > 0) {
      axios
        .post('http://127.0.0.1:8000/api/auth/login', {
          email: formValues.email,
          password: formValues.password,
        })
        .then((response) => {
          console.log(response.data.user.role);
          if (response.status === 200) {
            dispatch(
              enterUserToken({
                userToken: response.data.access_token,
              })
            );
            dispatch(
              enterUserRole({
                userRole: response.data.user.role,
              })
            );

            Swal.fire({
              icon: 'success',
              title: 'Successful login',
              confirmButtonText: `Ok`,
            }).then((result) => {
              if (result.isConfirmed) {
                {
                  history.push('/');
                }
              }
            });
          }
        })
        .catch((err) => {
          Swal.fire({
            icon: 'error',
            title: 'Wrong username or password',
            confirmButtonText: `Ok`,
          });
        });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        footer: '<a href>Why do I have this issue?</a>',
      });
    }
  };

  const handleValidData = (e) => {
    if (e.target.name === 'email') {
      if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(formValues.email)) {
        setIsValid({
          ...isValid,
          [e.target.name]: true,
        });
      } else {
        if (formValues.email.length === 0) {
          setIsValid({
            ...isValid,
            email: true,
          });
        } else {
          setIsValid({
            ...isValid,
            [e.target.name]: false,
          });
        }
      }
    } else if (e.target.name === 'password') {
      if (formValues.password.length < 8) {
        if (formValues.password.length === 0) {
          setIsValid({
            ...isValid,
            password: true,
          });
        } else {
          setIsValid({
            ...isValid,
            [e.target.name]: false,
          });
        }
      } else {
        setIsValid({
          ...isValid,
          [e.target.name]: true,
        });
      }
    }
  };

  return (
    <Container>
      <Wrapper>
        <LeftSide>
          <h2>Now You !</h2>
          <Form as="form" onSubmit={handleLogin}>
            <FormField label="Email" id="email" name="email" onChange={handleInputChange} onBlur={handleValidData} />
            {isValid.email === false ? (
              <Alert variant="filled" severity="error" style={{ marginTop: '10px' }}>
                Entered Email address is Invalid
              </Alert>
            ) : null}
            <FormField label="Password" id="password" name="password" type="password" onChange={handleInputChange} onBlur={handleValidData} />
            {isValid.password === false ? (
              <Alert variant="filled" severity="error" style={{ marginTop: '10px' }}>
                Password is too short !
              </Alert>
            ) : null}
            <Button type="submit">Login</Button>
          </Form>
          <p>Forgot password ? </p>
          <Register>
            <p>Not Our Member?</p>
            <h4 onClick={() => history.push('/sign-in')}>SIGN UP</h4>
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
