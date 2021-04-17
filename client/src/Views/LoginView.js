import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import FormField from '../components/molecules/FormField/FormField';
import { Button } from '../components/atoms/Button/Button';
import { ReactComponent as ManLogo } from '../assets/images/Group.svg';
import { ReactComponent as WomenLogo } from '../assets/images/Group-1.svg';
import { Alert } from '@material-ui/lab';

import useLoginForm from '../hooks/useLoginForm';

const LoginView = () => {
  const { handleInputChange, handleLogin, handleValidData, formValues, isValid } = useLoginForm();

  const history = useHistory();

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
