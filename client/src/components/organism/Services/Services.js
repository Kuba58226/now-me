import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { useSelector } from 'react-redux';
import { selectUserToken } from '../../../features/appSlice';
import SelectField from '../../molecules/SelectField/SelectField';

import styled from 'styled-components';
import Service from 'components/molecules/Service/Service';
import Swal from 'sweetalert2';

const initialFormState = {
  serviceName: '',
  price: '',
  time: '',
  employee_id: '',
};

const Services = () => {
  const [formValues, setFormValues] = useState(initialFormState);
  const [employees, setEmployees] = useState([]);
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
    const fetchEmployees = () => {
      axios.get('http://127.0.0.1:8000/api/employees').then((response) => setEmployees(response.data.employees));
    };
    fetchEmployees();
  }, []);

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/api/services')
      .then((response) => setServices(response.data.services))
      .catch((err) => console.log(err));
  }, [formValues.employee_id, isLoading]);

  const handleAddServicePopup = () => {
    Swal.mixin({
      input: 'text',
      confirmButtonText: 'Next &rarr;',
      showCancelButton: true,
      progressSteps: ['1', '2', '3'],
    })
      .queue([
        {
          title: 'Service name',
          text: 'Chaining swal2 modals is easy',
        },
        'Price in złotych',
        'Time in minutes',
      ])
      .then((result) => {
        if (result.value) {
          axios
            .post(
              'http://127.0.0.1:8000/api/service',
              {
                name: result.value[0],
                price: result.value[1],
                service_length: result.value[2] * 60,
                employee_id: formValues.employee_id,
              },
              config
            )
            .then((response) => {
              if (response.status === 201) {
                setIsLoading((prevState) => !prevState);
                setFormValues({
                  ...formValues,
                  serviceName: '',
                  price: '',
                  time: '',
                });
                Swal.fire('Added!', 'Your new service has been added.', 'success');
              }
            })
            .catch((err) => console.log(err));
        }
      });
  };

  const FilteredServices = services.filter((service) => service.employee_id === parseInt(formValues.employee_id));

  return (
    <Container>
      <Header>
        <Button onClick={handleAddServicePopup}>Add new service</Button>
        <SelectField label="Employees" id="employee_id" name="employee_id" value={formValues.cabinet_id} onChange={handleInputChange} tab={employees} />
      </Header>

      {FilteredServices.length === 0 ? (
        <h3>This employee has no services</h3>
      ) : (
        <ServicesContainer>
          {FilteredServices.map((filteredService) => (
            <Service key={filteredService.id} service={filteredService} setIsLoading={setIsLoading} isLoading={isLoading} />
          ))}
        </ServicesContainer>
      )}
    </Container>
  );
};

export default Services;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80vw;
  padding: 20px;
`;

const Header = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 2fr 1fr;
  place-items: center;
  margin-bottom: 20px;
  @media screen and (max-width: 1246px) {
    grid-template-columns: 1fr;
    grid-row-start: 2;
  }
`;

// const Form = styled.div`
//   margin-top: 20px;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
// `;

const ServicesContainer = styled.div`
  width: 100%;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-auto-rows: max-content;
  place-items: center;
`;

const Button = styled.button`
  margin: 15px 0;
  padding: 7px 20px;
  font-size: 14px;
  background-color: #7b75c5;
  border-radius: 20px;
  border: none;
  font-weight: bold;
  color: white;
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }

  @media screen and (max-width: 1246px) {
    grid-row-start: 2;
  }
`;
