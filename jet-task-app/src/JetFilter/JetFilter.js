import React from 'react';
import { FormControl } from 'react-bootstrap';


const jetFilter = (props) => {

  return (
    <div className={props.className}>
        <FormControl 
        type="text"
        placeholder={props.placeholder}
        onChange={props.onFilterChange}
        />
    </div>
    )
}

export default jetFilter;