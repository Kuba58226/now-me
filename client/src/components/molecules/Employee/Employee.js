import React from 'react';
import styled from 'styled-components';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const Employee = ({ employees, handleDelete }) => {
  return (
    <List>
      {employees.map(({ id, firstName, lastName, profession }) => (
        <ListItem key={id}>
          <Icon>
            <AccountCircleIcon />
          </Icon>
          <FirstName>
            <span>{firstName}</span>
            <span>{lastName}</span>
          </FirstName>
          <ProffesionName>{profession}</ProffesionName>
          <Button>
            <HighlightOffIcons onClick={() => handleDelete(id)} />
          </Button>
        </ListItem>
      ))}
    </List>
  );
};

const List = styled.ul`
  display: grid;
  list-style: none;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  font-size: 20px;
  // color: ${({ theme }) => theme.colors.grey};
`;

const ListItem = styled.li`
  background-color: #f7f8fa;
  padding: 40px 30px;
  border-radius: 25px;
  box-shadow: 0 5px 15px -10px rgba(0, 0, 0, 0.7);
  margin: 25px;
  display: grid;
  grid-template-rows: 1fr 0.2fr 0.1fr 0.1fr;
  place-items: center;
  color: #2f302f;

  .MuiSvgIcon-root {
    font-size: 40px;
  }
`;

const Icon = styled.div`
  .MuiSvgIcon-root {
    font-size: 150px;
    color: ${({ theme }) => theme.colors.grey};
  }
  display: grid;
  place-items: center;
`;

const FirstName = styled.p`
  display: grid;
  grid-template-columns: 1fr;
  place-items: center;
  grid-row-start: 2;
  span {
    margin: 2px;
  }
`;

const ProffesionName = styled.p`
  padding: 10px;
  display: grid;
  place-items: center;
  grid-row-start: 3;
`;

const HighlightOffIcons = styled(HighlightOffIcon)`
  grid-row-start: 4;
  place-items: center;
  color: #d63333;
`;

const Button = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
`;

export default Employee;
