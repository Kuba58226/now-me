import React from 'react';
import styled from 'styled-components';

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <List>
      {pageNumbers.map((number) => (
        <ListItem key={number}>
          <Link onClick={() => paginate(number)} href="#">
            {number}
          </Link>
        </ListItem>
      ))}
    </List>
  );
};

const List = styled.ul`
  display: flex;
  justify-content: center;
  flex-direction: row;
  list-style: none;
`;
const ListItem = styled.li`
  padding: 10px;
`;

const Link = styled.a`
  text-decoration: none;
  color: black;
`;

export default Pagination;
