import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectUserToken } from '../../../features/appSlice';

import styled from 'styled-components';
import FormField from 'components/molecules/FormField/FormField';
import { Button } from 'components/atoms/Button/Button';
import { Cabinet } from 'components/atoms/Cabinet/Cabinet';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Swal from 'sweetalert2';

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
    });
  }, [isLoading]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://127.0.0.1:8000/api/cabinet', { name: formValues.cabinetName }, config)
      .then((response) => {
        if (response.status === 201) {
          setIsLoading((prevState) => !prevState);
          setFormValues({ cabinetName: '' });
          Swal.fire('Added!', 'Your new cabinet has been added.', 'success');
        }
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteCabinet = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://127.0.0.1:8000/api/cabinet/${id}`, config)
          .then((response) => {
            if (response.status === 200) setIsLoading((prevState) => !prevState);
            Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
          })
          .catch((err) => console.log(err));
      }
    });
  };
  return (
    <Container>
      <Form as="form" onSubmit={handleSubmit}>
        <FormField label="New cabinet name" id="cabinet" name="cabinetName" value={formValues.cabinetName} onChange={handleInputChange} />
        <Button type="submit">Add</Button>
      </Form>
      <CabinetsGrid>
        {cabinets.map((cabinet) => (
          <Cabinet key={cabinet.id}>
            {cabinet.name}
            <DeleteIcon onClick={() => handleDeleteCabinet(cabinet.id)} />
          </Cabinet>
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
  padding: 20px;
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

const DeleteIcon = styled(HighlightOffIcon)`
  margin-top: 3px;
  cursor: pointer;
  :hover {
    opacity: 0.5;
  }
`;
