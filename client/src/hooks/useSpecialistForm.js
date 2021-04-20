import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUserToken } from '../features/appSlice';
import axios from 'axios';

const initialFormState = {
  firstName: '',
  lastName: '',
  profession: '',
  cabinet_id: '',
};

const useSpecialistForm = () => {
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
      .delete(`http://127.0.0.1:8000/api/employee/${id}`, config)
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

  return { handleSubmit, handleDelete, handleInputChange, paginate, currentEmployees, postsPerPage, cabinets, employees, formValues };
};

useSpecialistForm.propTypes = {};

export default useSpecialistForm;
