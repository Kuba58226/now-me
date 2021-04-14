import styled from 'styled-components';

export const Input = styled.input`
  padding: 12px 55px;
  border: 1px solid ${({ theme }) => theme.colors.grey};
  box-sizing: border-box;
  box-shadow: -2px 4px 10px rgba(115, 124, 142, 0.09);
  border-radius: 10px;
  &:focus {
    outline: none;
    box-shadow: -2px 4px 10px rgba(115, 124, 142, 0.3);
  }

  @media screen and (max-width: 480px) {
    padding: 8px 35px;
  }
`;
