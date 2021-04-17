import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectUserToken } from '../../../features/appSlice';
import FormField from '../../molecules/FormField/FormField';
import styled from 'styled-components';
import { Button } from '../../atoms/Button/Button';
import { Select } from '../../atoms/Select/Select';
import { Label } from '../../atoms/Label/Label';
import SelectField from '../../molecules/SelectField/SelectField';

const initialFormState = {
  firstName: '',
  lastName: '',
  profession: '',
  cabinet_id: '',
};
const EmployeesList = () => {
  const [formValues, setFormValues] = useState(initialFormState);
  const [employees, setEmployees] = useState([]);
  const [cabinets, setCabinets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const token = useSelector(selectUserToken);

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/employees').then((response) => setEmployees(response.data.employees));
  }, [isLoading]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/cabinets').then((response) => setCabinets(response.data.cabinets));
  }, []);

  const handleInputChange = (event) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading((prevState) => !prevState);
    axios
      .post('http://127.0.0.1:8000/api/employee', formValues, config)
      .then((response) => {
        setIsLoading((prevState) => !prevState);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Wrapper as="form" onSubmit={handleSubmit}>
        <FormField label="Name" id="firstName" name="firstName" value={formValues.firstName} onChange={handleInputChange} />
        <FormField label="Last Name" id="lastName" name="lastName" value={formValues.lastName} onChange={handleInputChange} />
        <FormField label="Profession" id="profession" name="profession" value={formValues.profession} onChange={handleInputChange} />
        <SelectField label="Cabinets" id="cabinet_id" name="cabinet_id" value={formValues.cabinet_id} onChange={handleInputChange} tab={cabinets} />
        <Button type="submit">Add</Button>
      </Wrapper>
      {employees.map((employee) => (
        <p key={employee.id}>{employee.firstName}</p>
      ))}
    </>
  );
};

const Wrapper = styled.div``;

export default EmployeesList;
