import React from 'react';
import { Modal, Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

const modalFormContainer = (props) => {

  return (
    <div>
    <Modal.Header closeButton>
    { props.isEdited ? (
      <Modal.Title>Edit jet data</Modal.Title>
    ) : (
      <Modal.Title>Add jet data</Modal.Title>
    )
    }
    </Modal.Header>
    <form onSubmit={props.handleSubmit}>
      <Modal.Body>
        <FormGroup controlId={'jetForm'}>
          <ControlLabel>Jet number</ControlLabel>
          <FormControl type="text" onChange={props.onFormControlsChange.bind(this,'jetNumber')} value={props.jetNumber}/>
          <ControlLabel>Jet name</ControlLabel>
          <FormControl type="text" onChange={props.onFormControlsChange.bind(this,'jetName')} value={props.jetName}/>
          <ControlLabel>Jet type</ControlLabel>
          <FormControl type="text" onChange={props.onFormControlsChange.bind(this,'jetType')} value={props.jetType}/>
          <ControlLabel>Operator</ControlLabel>
          <FormControl type="text" onChange={props.onFormControlsChange.bind(this,'operator')} value={props.operator}/>
          <ControlLabel>Passanger count</ControlLabel>
          <FormControl type="text" onChange={props.onFormControlsChange.bind(this,'passengersCount')} value={props.passengersCount}/>
        </FormGroup>
      </Modal.Body>
      <Modal.Footer>
        { props.isEdited ? (
          <Button type="submit">Save changes</Button>
        ) : (
          <Button type="submit">Submit</Button>
        )
        }
        <Button onClick={props.closeModalHandle}>Cancel</Button>
      </Modal.Footer>
    </form>
  </div>
  )
}

export default modalFormContainer;