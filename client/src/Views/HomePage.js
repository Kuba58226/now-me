import React from 'react';
import { ReactComponent as MainLogo } from '../assets/images/MainLogo.svg';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <Wrapper>
      <Header>
        <h1>Book an appointment with your specialist</h1>
        <Link to="specialist">
          <Button>Book</Button>
        </Link>
      </Header>
      <MainImage />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  height: 90vh;
  grid-template-columns: 1.5fr 1.2fr;
  place-items: center;

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Header = styled.div`
  display: grid;
  place-items: center;

  h1 {
    color: #232222;
    font-size: 54px;
    text-align: center;
    padding: 10px;

    @media screen and (max-width: 1210px)  {
      font-size: 40px;
      
    }
    @media screen and (max-width: 480px)  {
      font-size: 30px;
    }
    
`;

const MainImage = styled(MainLogo)`
  width: 658px;
  height: 536px;

  @media screen and (max-width: 1210px) {
    width: 433px;
    height: 335px;
  }
  @media screen and (max-width: 480px) {
    width: 353px;
    height: 255px;
  }
`;

const Button = styled.button`
  border-radius: 50px;
  background: ${({ theme }) => theme.colors.mainColor};
  white-space: nowrap;
  padding: 10px 52px;
  color: ${({ theme }) => theme.colors.white};
  font-size: 16px;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;

  &:hover {
    transition: all 0.2s ease-in-out;
    background: ${({ theme }) => theme.colors.hoverColor};
    color: ${({ theme }) => theme.colors.white};
  }
`;

export default HomePage;
