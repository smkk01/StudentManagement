import React,{Component} from 'react';
import {Table} from 'react-bootstrap';
import {Button, ButtonToolbar} from 'react-bootstrap';
import {AddStudentModal} from './AddStudentModal';
import {EditStudentModal} from './EditStudentModal';
export class Student extends Component{

    constructor(props){
        super(props);
       // this.state ={deps:[]}
        this.state ={stus:[],addModelShow : false,editModelShow:false}
    }
    componentDidMount(){
        this.refreshList();
    }
    componentDidUpdate(){
        this.refreshList();
    }
    refreshList(){
        //this.setState({
          // deps:[{"DeptID":1,"DeptName":"Math"}]

       // })
       fetch('http://localhost:58304/api/student')
       .then(response => response.json())
       .then(data => {
         this.setState({stus:data})
       })

    }
    
    deleteStudent(stuid){
        if(window.confirm('Are you sure?')){
            fetch('http://localhost:58304/api/student/'+stuid,{
                method:'DELETE',
                header:{'Accept':'application/json',
                    'Content-type': 'application/json'}                
            })
        }
    }
    render(){
        const {stus,stuid,stuname,fathername,department} = this.state;
        let addModelClose = ()=> this.setState({addModelShow:false});
        let editModelClose = ()=> this.setState({editModelShow:false});
        return (
            <div>
            <Table className='mt-4' striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Student ID</th>
                        <th>Student Name</th>
                        <th>Father Name</th>
                        <th>Department</th>
                        <th>Option</th>
                    </tr>
                </thead>
                <tbody>
                    {stus.map(stu =>
                        <tr key ={stu.StudentID}>
                            <td>{stu.StudentID}</td>
                            <td>{stu.StudentName}</td>
                            <td>{stu.FatherName}</td>
                            <td>{stu.Department}</td>
                            <td>
                                <ButtonToolbar>
                                    <Button
                                    className="mr-2"
                                    variant = "info"
                                    onClick ={()=>this.setState({editModelShow:true,stuid:stu.StudentID,
                                        stuname:stu.StudentName,fathername:stu.FatherName,department:stu.Department})}
                                    >
                                    Edit
                                </Button>
                                <Button className='mr-2' variant='danger'
                                onClick={() => this.deleteStudent(stu.StudentID)}
                                >
                                    Delete
                                </Button>
                                <EditStudentModal
                                show = {this.state.editModelShow}
                                onHide = {editModelClose}
                                stuid ={stuid}
                                stuname ={stuname}
                                fathername={fathername}
                                department ={department}
                                />
                                </ButtonToolbar>
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <ButtonToolbar>
                <Button 
                variant='primary'
                onClick ={ () => this.setState({addModelShow:true})}
                >Save</Button>
                <AddStudentModal
                 show = {this.state.addModelShow}
                 onHide ={addModelClose}
                />
            </ButtonToolbar>
            </div>
        )
    }
}