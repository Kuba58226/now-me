import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectUserToken } from '../../../features/appSlice';

import styled from 'styled-components';
import FormField from 'components/molecules/FormField/FormField';
import { Button } from 'components/atoms/Button/Button';
import { Cabinet } from 'components/atoms/Cabinet/Cabinet';

const initialFormState = {
  cabinetName: '',
};

const Cabinets = () => {
  const [cabinets, setCabinets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formValues, setFormValues] = useState(initialFormState);

  const token = useSelector(selectUserToken);

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const handleInputChange = (event) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/cabinets').then((response) => {
      setCabinets(response.data.cabinets);
      console.log(response.data.cabinets);
    });
  }, [isLoading]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading((prevState) => !prevState);
    axios
      .post('http://127.0.0.1:8000/api/cabinet', { name: formValues.cabinetName }, config)
      .then((response) => {
        setIsLoading((prevState) => !prevState);
        console.log(response);
      })
      .catch((err) => console.log(err));
  };
  return (
    <Container>
      <Form as="form" onSubmit={handleSubmit}>
        <FormField label="New cabinet name" id="cabinet" name="cabinet" onChange={handleInputChange} />
        <Button type="submit">Add</Button>
      </Form>
      <CabinetsGrid>
        {cabinets.map((cabinet) => (
          <Cabinet key={cabinet.id}>{cabinet.numberOfRoom}</Cabinet>
        ))}
      </CabinetsGrid>
    </Container>
  );
};

export default Cabinets;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 80vw;
`;

const CabinetsGrid = styled.div`
  height: 100vh;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(auto-fill, minmax(255px, 1fr));
  grid-auto-rows: max-content;
  justify-content: center;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
