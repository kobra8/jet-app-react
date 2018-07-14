import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import JetRow from '../JetRow/JetRow';
import { Table } from 'react-bootstrap';

const jetTable = (props) => {

  const rows = [];
  const searchText = props.searchText;
  const fieldName = props.fieldName;
 
  props.jets.forEach(jet => {
    if(jet.fields[fieldName].toLowerCase().indexOf(searchText) === -1) {
      return
    }
    rows.push( <JetRow key={jet.id} rowId={jet.id} fields={jet.fields} deleteRecord={props.deleteRecord} editRecord={props.editRecord}/>)
  });

  return (
    <Table responsive striped hover>
      <thead>
        <tr>
          <th>Jet number</th>
          <th>Jet name 
            <FontAwesomeIcon className="sort-icon" icon="sort-alpha-down" onClick={props.sortAsc} /> 
            <FontAwesomeIcon className="sort-icon" icon="sort-alpha-up" onClick={props.sortDesc}/>
          </th>
          <th>Jet type</th>
          <th>Operator</th>
          <th>Passengers count</th>
          <th>Action</th>
        </tr>  
      </thead>
      <tbody>
        {rows}
      </tbody>
    </Table>
  )
}

export default jetTable;