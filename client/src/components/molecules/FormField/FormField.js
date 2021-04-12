import React from 'react';
import PropTypes from 'prop-types';
import { Label } from '../../atoms/Label/Label';
import { Input } from '../../atoms/Input/Input';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  ${Label} {
    margin-top: 20px;
  }
  ${Input} {
    margin-top: 5px;
  }
`;
const FormField = ({ value, onBlur, onChange, label, name, id, type = 'text', ...props }) => {
  return (
    <Wrapper>
      <Label htmlFor={id}>{label}</Label>
      <Input onChange={onChange} value={value} name={name} id={id} type={type} onBlur={onBlur} />
    </Wrapper>
  );
};

FormField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string,
};

export default FormField;
