import styled from 'styled-components';

export const MainWrapper = styled.div`
  display: grid;
  grid-template-rows: 0.5fr 0.5fr 1fr 5fr;
  grid-template-columns: 1fr;
  height: 90vh;
`;

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 2fr 2fr 2fr 2fr 0.5fr 2fr;
  grid-row-start: 2;
  place-items: center;
  padding: 20px;
`;

export const Button = styled.button`
  padding: 7px 20px;
  margin-top: 25px;
  height: 30px;
  font-size: 14px;
  background-color: ${({ theme }) => theme.colors.lightPurple};
  border-radius: 20px;
  border: none;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.darkGrey};
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`;

export const TableWrapper = styled.div`
  display: grid;
  font-size: 20px;
  grid-row-start: 3;
  place-items: center;
  color: #1f1b1b;
`;

export const Header = styled.h1``;

export const EmployeesTable = styled.div`
  grid-row-start: 4;
`;

export const PaginationWrapper = styled.div`
  grid-row-start: 5;
`;
