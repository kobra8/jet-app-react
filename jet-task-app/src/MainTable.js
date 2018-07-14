import React, { Component } from 'react';
import API from './common/Api';
import JetTable from './JetTable/JetTable';
import Loader from './common/Loader';
import Pagination from './common/Pagination';
import ModalFormContainer from './common/Modal'
import {Grid, Row, Col, Modal, Button } from 'react-bootstrap';
import './style.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSortAlphaUp, faSortAlphaDown } from '@fortawesome/free-solid-svg-icons';
import JetFilter from './JetFilter/JetFilter';

library.add(faSortAlphaUp, faSortAlphaDown)

class MainTable extends Component {
  constructor(props) {
    super(props);

    this.showModalHandle = this.showModalHandle.bind(this);
    this.closeModalHandle = this.closeModalHandle.bind(this);

    this.state = {
      jets: [],
      isLoading: true,
      isEdited: false,
      showModal: false,
      searchText: '',
      fieldName:'JetName',
      pageOffset: '',
      recordId: '',
      jetNumber: '',
      jetName: '',
      jetType: '',
      operator: '',
      passengersCount: ''
    }
  }

  getList = (params) => {
    API.get(params)
    .then(res => {
      this.setState({
        jets: res.data.records,
        isLoading: false,
        pageOffset: res.data.offset,
      })
    })
  }

  addRecord = (value)=> {
    API.post('',{ fields: value}).then(res => {
      this.closeModalHandle();
      this.getList('?pageSize=25');
    })
  }

  updateRecord = (recordId, value)=> {
    API.patch(recordId,{ fields: value}).then(res => {
      this.closeModalHandle();
      this.getList('?pageSize=25');
      this.setState({
        jetNumber: '',
        jetName: '',
        jetType: '',
        operator: '',
        passengersCount: '',
      })
    })
  }

  deleteRecord = (params) => {
    API.delete(params).then(res => {
     this.getList('?pageSize=25');
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let result = {
      'JetNumber': this.state.jetNumber,
      'JetName': this.state.jetName,
      'JetType': this.state.jetType,
      'OperatorName': this.state.operator,
      'PassengersCount': this.state.passengersCount,
    }
    if(!this.state.isEdited) {
    this.addRecord(result);
    }
    else {
      this.updateRecord(this.state.recordId, result)
    }
}

  onEditRecord = (recordId) => {
    let editedObject = this.state.jets.filter(x => x.id === recordId)[0].fields
    this.setState({
    isEdited: true,
    recordId: recordId,
    jetNumber: editedObject.JetNumber,
    jetName: editedObject.JetName,
    jetType: editedObject.JetType,
    operator: editedObject.OperatorName,
    passengersCount: editedObject.PassengersCount,
    })
    this.showModalHandle();
  }

  onFormControlsChange = (controlName, event) => {
    this.setState({
      [controlName]: event.target.value,
    })
  }
  
  onFilterChange = (fieldName, event) => {
    event.preventDefault();
    const newText = event.target.value;
    this.setState({
      searchText: newText,
      fieldName: fieldName
    })
  }

  pageNext = () => {
    if(this.state.pageOffset) {
    this.getList(`?pageSize=25&offset=${this.state.pageOffset}`);
    }
    else {
      this.getList('?pageSize=25');
    }
  }

  sortAsc = () => {
    this.getList('?sort%5B0%5D%5Bfield%5D=JetName&sort%5B0%5D%5Bdirection%5D=asc');
  }

  sortDesc = () => {
    this.getList('?sort%5B0%5D%5Bfield%5D=JetName&sort%5B0%5D%5Bdirection%5D=desc');
  }

  closeModalHandle() {
    this.setState({ 
      show: false,
      isEdited: false
    });
    }

  showModalHandle() {
    this.setState({ show: true });
  }

  componentDidMount() {
    this.getList('?pageSize=25');
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col sm={12} md={12}>
            <h2>Jet list</h2>
            <Row className="nav-bar">
            <Col sm={3} md={1}>
            <Button bsStyle="primary" bsSize="small" onClick={this.showModalHandle}>
            Add jet data
            </Button>
            </Col>
            <Col sm={3} md={2}>
            <JetFilter placeholder={'Filter by jet name...'} onFilterChange={this.onFilterChange.bind(this,'JetName')}/>
            </Col>
            <Col sm={3} md={2}>
            <JetFilter placeholder={'Filter by jet type...'} onFilterChange={this.onFilterChange.bind(this,'JetType')}/>
            </Col>
            <Col sm={3} md={2}>
            <JetFilter placeholder={'Filter by operator...'} onFilterChange={this.onFilterChange.bind(this,'OperatorName')}/>
            </Col>
            </Row>
            <Loader isLoading={this.state.isLoading}>
            <JetTable
            jets={this.state.jets}
            searchText={this.state.searchText}
            fieldName={this.state.fieldName}
            pageNext={this.pageNext}
            sortAsc={this.sortAsc}
            sortDesc={this.sortDesc}
            deleteRecord={this.deleteRecord}
            editRecord={this.onEditRecord}
            />
            <Row>
            <Col sm={4} md={2} mdOffset={5} className="footer">
             <Pagination pageNext={this.pageNext}></Pagination>
             </Col>
             </Row>
            </Loader>
          </Col>
        </Row>
        <Modal show={this.state.show} onHide={this.closeModalHandle}>
         <ModalFormContainer
          jetNumber={this.state.jetNumber}
          jetName={this.state.jetName}
          jetType={this.state.jetType}
          operator={this.state.operator}
          passengersCount={this.state.passengersCount}
          isEdited={this.state.isEdited}
          handleSubmit={this.handleSubmit}
          onFormControlsChange={this.onFormControlsChange}
          closeModalHandle={this.closeModalHandle.bind(this)}
         />
        </Modal>
      </Grid>
    );
  }
}

export default MainTable;
