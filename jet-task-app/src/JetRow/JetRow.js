import React from 'react';
import { Button } from 'react-bootstrap';

const jetRow = (props) => {
 
  return(
    <tr>
      <td>{props.fields.JetNumber}</td>
      <td>{props.fields.JetName}</td>
      <td>{props.fields.JetType}</td>
      <td>{props.fields.OperatorName}</td>
      <td>{props.fields.PassengersCount}</td>
      <td>
        <Button bsStyle="primary" bsSize="xsmall" className="button-margin" onClick={() => props.editRecord(props.rowId)}>Edit</Button>
        <Button bsStyle="danger" bsSize="xsmall" className="button-margin" onClick={() => props.deleteRecord(props.rowId)}>Delete</Button>
      </td>
    </tr>  
  )
}

export default jetRow;