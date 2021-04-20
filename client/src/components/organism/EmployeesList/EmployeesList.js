import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectUserToken } from '../../../features/appSlice';
import FormField from '../../molecules/FormField/FormField';
import SelectField from '../../molecules/SelectField/SelectField';
import { Wrapper, Button, TableWrapper, Header, MainWrapper, EmployeesTable, PaginationWrapper } from './EmployeesList.style';
import Employee from '../../molecules/Employee/Employee';
import Pagination from '../../molecules/Pagination/Pagination';

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
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(4);

  const token = useSelector(selectUserToken);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentEmployees = employees.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  useEffect(() => {
    const fetchEmployees = async () => {
      await axios.get('http://127.0.0.1:8000/api/employees').then((response) => setEmployees(response.data.employees));
    };
    fetchEmployees();
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
  const handleDelete = (id) => {
    setIsLoading((prevState) => !prevState);
    axios
      .delete(`http://127.0.0.1:8000/api/employee/${id}`)
      .then(() => {
        setIsLoading((prevState) => !prevState);
      })
      .catch((err) => console.log(err));
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
    <MainWrapper>
      <Wrapper as="form" onSubmit={handleSubmit}>
        <FormField label="Name" id="firstName" name="firstName" value={formValues.firstName} onChange={handleInputChange} />
        <FormField label="Last Name" id="lastName" name="lastName" value={formValues.lastName} onChange={handleInputChange} />
        <FormField label="Profession" id="profession" name="profession" value={formValues.profession} onChange={handleInputChange} />
        <SelectField label="Cabinets" id="cabinet_id" name="cabinet_id" value={formValues.cabinet_id} onChange={handleInputChange} tab={cabinets} />
        <Button type="submit">Add</Button>
      </Wrapper>
      <TableWrapper>
        <Header>List of Specialist</Header>
      </TableWrapper>
      <EmployeesTable>
        <Employee employees={currentEmployees} handleDelete={handleDelete} />
      </EmployeesTable>
      <PaginationWrapper>
        <Pagination postsPerPage={postsPerPage} totalPosts={employees.length} paginate={paginate} />
      </PaginationWrapper>
    </MainWrapper>
  );
};

export default EmployeesList;
