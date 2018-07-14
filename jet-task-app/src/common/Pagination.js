import React from 'react';
import { Button, Pagination } from 'react-bootstrap';

// let active = 1;
// let items = [];
// for (let number = 1; number <= 7; number++) {
//   items.push(
//     <Pagination.Item key={number} active={number === active}>{number}</Pagination.Item>
//   );
// }

const pagination = (props) => {
  return (
    <div>
      {/* <Pagination bsSize="medium" onClick={props.pageNext}>{items}</Pagination> */}
      <Button type="button" bsStyle="primary" onClick={props.pageNext}>Next page</Button>
    </div>
  )
}

export default pagination;