import React from 'react';
import { Label } from '../../atoms/Label/Label';
import styled from 'styled-components';
import { Select } from '../../atoms/Select/Select';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-right: 10px;

  ${Label} {
    margin-top: 10px;
  }
  ${Select} {
    margin-top: 5px;
  }
`;

const SelectField = ({ tab, value, onChange, label, name, id, type, ...props }) => {
  if (type === 'cabinets') {
    return (
      <Wrapper>
        <Label htmlFor={id}>{label}</Label>
        <Select value={value} name={name} onChange={onChange} id={id}>
          {tab.map((tab) => (
            <option key={tab.id} value={tab.id}>
              {tab.name}
            </option>
          ))}
        </Select>
      </Wrapper>
    );
  } else {
    return (
      <Wrapper>
        <Label htmlFor={id}>{label}</Label>
        <Select value={value} name={name} onChange={onChange} id={id}>
          {tab.map((tab) => (
            <option key={tab.id} value={tab.id}>
              {tab.firstName} {tab.lastName}, {tab.profession}
            </option>
          ))}
        </Select>
      </Wrapper>
    );
  }
};

export default SelectField;
