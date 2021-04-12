import styled from 'styled-components';

export const Button = styled.button`
  margin: 15px 0;
  padding: 7px 20px;
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
