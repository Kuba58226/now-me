import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectUserToken } from '../../../features/appSlice';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Swal from 'sweetalert2';

const Service = ({ service: { id, employee_id, name, price, service_length }, setIsLoading, sLoading }) => {
  const token = useSelector(selectUserToken);
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const handleDeleteService = () => {
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
          .delete(`http://127.0.0.1:8000/api/service/${id}`, config)
          .then((response) => {
            if (response.status === 201) {
              setIsLoading((prevState) => !prevState);
              Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
            }
          })
          .catch((err) => console.log(err));
      }
    });
  };

  return (
    <Wrapper>
      <Header>
        <h4>{name}</h4>
      </Header>
      <Info>
        <h3>Price</h3>
        {price} zł
        <h3>Time</h3>
        {service_length / 60} min
        <DeleteIcon onClick={() => handleDeleteService(id)} />
      </Info>
    </Wrapper>
  );
};

export default Service;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 240px;
  width: 160px;
  box-shadow: -2px 4px 10px rgba(115, 124, 142, 0.5);
  border-radius: 20px;
  margin: 5px;
`;

const Header = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Info = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > h3 {
    margin: 5px;
  }
`;

const DeleteIcon = styled(HighlightOffIcon)`
  margin-top: 3px;
  cursor: pointer;
  :hover {
    opacity: 0.5;
  }
`;
