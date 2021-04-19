import styled from 'styled-components';

export const Cabinet = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
  width: 100%;
  background-color: #4288dd;
  border-radius: 10px;
  background-image: radial-gradient(circle 346px at 0.3% 100%, #3e4ca7 0%, #ea6dff 100.7%);
  font-weight: bold;
  font-family: -system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
  font-size: 20px;
  color: #fff;
  cursor: pointer;
  &:hover {
    transform: scale(1.02);
  }
`;
