import React,{Component} from 'react';
import {Modal,Button,Row,Col,Form} from 'react-bootstrap';
//import Snackbar from '@material-ui/core/Snackbar';
//import IconButton from '@material-ui/core/IconButton';
export class EditDepartmentModal extends Component{
    constructor(props){
        super(props);
        //
       //this.state ={snackbaropen:false,snackbarmsg:''};
        //
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    snackbarClose = (event)=>{
      this.setState({snackbaropen:false});
  }
    handleSubmit(event){
      event.preventDefault();
      //alert(event.target.DeptName.value);
      fetch('http://localhost:58304/api/department',{
          method:'PUT',
          headers:{
              'Accept':'application/json',
              'Content-Type':'application/json'
          },
          body:JSON.stringify({
              DeptID :event.target.DeptID.value,
              DeptName :event.target.DeptName.value
          })

      })
      .then(res => res.json())
      .then((result)=>
      {
        alert(result);
        // this.setState({snackbaropen:true,snackbarmsg:result});
      },
      (error)=>{
          alert('Failed')
          //this.setState({snackbaropen:true,snackbarmsg:'Failed'});
      }
      )
  }
    render(){
      return(    
        <div className='container'>
               
               

          <Modal
          {...this.props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Edit Department
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
           <Row>
              <Col sm={6}>
              <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="DeptID">
                      <Form.Label>Department ID</Form.Label>
                      <Form.Control 
                      type ="text" 
                      name="DeptID" 
                      required 
                      disabled
                      placeholder='Department ID'
                      defaultValue={this.props.depid}
                      />                
                  </Form.Group>

                  <Form.Group controlId="DeptName">
                      <Form.Label>Department Name</Form.Label>
                      <Form.Control 
                      type ="text" 
                      name="DeptName" 
                      required 
                      placeholder='Department Name'
                      defaultValue={this.props.depname}
                      />                
                  </Form.Group>

                  <Form.Group>
                      <Button variant = 'primary' type ='submit'>Save</Button>
                  </Form.Group>
              </Form>
              </Col>
           </Row>
          </Modal.Body>
         
          <Modal.Footer>
            <Button variant ='danger' onClick={this.props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
       </div>
      );
  }

  
}