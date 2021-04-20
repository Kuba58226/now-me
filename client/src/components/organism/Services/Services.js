import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectUserToken } from '../../../features/appSlice';

import styled from 'styled-components';

const Services = () => {
  return <Container>Services</Container>;
};

export default Services;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 80vw;
  padding: 20px;
`;
