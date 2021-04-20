import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUserToken } from '../features/appSlice';
import axios from 'axios';
import Swal from 'sweetalert2';

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
          .delete(`http://127.0.0.1:8000/api/employee/${id}`, config)
          .then(() => {
            setIsLoading((prevState) => !prevState);
            if (currentEmployees.length === 1) {
              setCurrentPage(currentPage - 1);
            }
          })
          .catch((err) => console.log(err));
      }
    });
    setIsLoading((prevState) => !prevState);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formValues.firstName.length > 0 && formValues.lastName.length > 0 && formValues.profession.length > 0) {
      setIsLoading((prevState) => !prevState);
      axios
        .post('http://127.0.0.1:8000/api/employee', formValues, config)
        .then((response) => {
          setIsLoading((prevState) => !prevState);
        })
        .catch((err) => console.log(err));
      setFormValues(initialFormState);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Complete the data',
      });
    }
  };

  return { handleSubmit, handleDelete, handleInputChange, paginate, currentEmployees, postsPerPage, cabinets, employees, formValues };
};

export default useSpecialistForm;
