import React,{Component} from 'react';
import {Modal,Button,Row,Col,Form} from 'react-bootstrap';
//import Snackbar from '@material-ui/core/Snackbar';
//import IconButton from '@material-ui/core/IconButton';
export class AddStudentModal extends Component{
    constructor(props){
        super(props);
        //
       //this.state ={snackbaropen:false,snackbarmsg:''};
        //
        this.state = {deps:[]};
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    snackbarClose = (event)=>{
      this.setState({snackbaropen:false});
  }
    componentDidMount(){
        fetch('http://localhost:58304/api/department')
            .then(response => response.json())
            .then(data => {
                this.setState({deps:data});
            });
        
    }

    handleSubmit(event){
      event.preventDefault();
      //alert(event.target.DeptName.value);
      fetch('http://localhost:58304/api/student',{
          method:'POST',
          headers:{
              'Accept':'application/json',
              'Content-Type':'application/json'
          },
          body:JSON.stringify({
              StudentID :null ,
              StudentName :event.target.StudentName.value,
              FatherName : event.target.FatherName.value,
              Department : event.target.Department.value
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
              Add Student
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
           <Row>
              <Col sm={6}>
              <Form onSubmit={this.handleSubmit}>
                  <Form.Group controlId="StudentName">
                      <Form.Label>Student Name</Form.Label>
                      <Form.Control 
                      type ="text" 
                      name="StudentName" 
                      required 
                      placeholder='Student Name'
                      />                
                  </Form.Group>
                  <Form.Group controlId="FatherName">
                      <Form.Label>Student Name</Form.Label>
                      <Form.Control 
                      type ="text" 
                      name="FatherName" 
                      required 
                      placeholder='Father Name'
                      />                
                  </Form.Group>
                  <Form.Group controlId="Department">
                      <Form.Label>Department</Form.Label>
                      <Form.Control as="select">
                        {this.state.deps.map(dep =>
                           <option key ={dep.DeptID}>{dep.DeptName}</option> 
                        )}
                      </Form.Control>                    
                                      
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