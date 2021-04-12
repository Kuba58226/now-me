import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useHistory } from 'react-router-dom';

const initialFormState = {
  name: '',
  lastname: '',
  phone_number: '',
  email: '',
  password: '',
  password_confirmation: '',
};

const initialValidState = {
  name: true,
  lastname: true,
  phone_number: true,
  email: true,
  password: true,
  password_confirmation: true,
};

const useRegisterForm = () => {
  const [formValues, setFormValues] = useState(initialFormState);
  const [isValid, setIsValid] = useState(initialValidState);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();

  const fetchData = async () => {
    await axios
      .post('http://127.0.0.1:8000/api/auth/register', formValues)
      .then((response) => {
        if (response.status === 201) {
          Swal.fire({
            icon: 'success',
            title: 'Your work has been saved',
            confirmButtonText: `Confirm`,
          }).then((result) => {
            if (result.isConfirmed) {
              {
                history.push('about');
              }
            }
          });
        }
      })
      .catch((err) => console.log(err));
  };

  const handleInputChange = (event) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
  };

  const handleValidateFormValue = (e) => {
    if (e.target.name === 'name') {
      formValues.name.trim() ? setIsValid({ ...isValid, [e.target.name]: true }) : setIsValid({ ...isValid, [e.target.name]: false });
    } else if (e.target.name === 'lastname') {
      formValues.lastname.trim() ? setIsValid({ ...isValid, [e.target.name]: true }) : setIsValid({ ...isValid, [e.target.name]: false });
    } else if (e.target.name === 'phone_number') {
      /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{3})/.test(formValues.phone_number)
        ? setIsValid({ ...isValid, [e.target.name]: true })
        : setIsValid({ ...isValid, [e.target.name]: false });
    } else if (e.target.name === 'email') {
      /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(formValues.email) && formValues.email.trim()
        ? setIsValid({ ...isValid, [e.target.name]: true })
        : setIsValid({ ...isValid, [e.target.name]: false });
    } else if (e.target.name === 'password') {
      formValues.password.length > 6 ? setIsValid({ ...isValid, [e.target.name]: true }) : setIsValid({ ...isValid, [e.target.name]: false });
    } else if (e.target.name === 'password_confirmation') {
      formValues.password_confirmation === formValues.password && formValues.password_confirmation.length > 6
        ? setIsValid({ ...isValid, [e.target.name]: true })
        : setIsValid({ ...isValid, [e.target.name]: false });
    }
  };

  const handleSubmitRegister = (event) => {
    event.preventDefault();
    if (
      isValid.name === true &&
      formValues.name.length > 0 &&
      isValid.lastname === true &&
      formValues.lastname.length > 0 &&
      isValid.phone_number === true &&
      formValues.phone_number.length > 0 &&
      isValid.email === true &&
      formValues.email.length > 0 &&
      isValid.password === true &&
      formValues.password.length > 0 &&
      isValid.password_confirmation === true &&
      formValues.password_confirmation.length > 0
    ) {
      setIsLoading(true);
      fetchData();
      setFormValues(initialFormState);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      });
    }
  };

  return { handleInputChange, handleSubmitRegister, handleValidateFormValue, formValues, isValid, isSubmit, isLoading };
};

export default useRegisterForm;
