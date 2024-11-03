import React,{Component} from 'react';
import {Table} from 'react-bootstrap';
import {Button, ButtonToolbar} from 'react-bootstrap';
import {AddDept} from './AddDept';
import {EditDepartmentModal} from './EditDepartmentModal';
export class Department extends Component{

    constructor(props){
        super(props);
       // this.state ={deps:[]}
        this.state ={deps:[],addModelShow : false,editModelShow:false}
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
       fetch('http://localhost:58304/api/Department')
       .then(response => response.json())
       .then(data => {
         this.setState({deps:data})
       })

    }
    
    deleteDepartment(depid){
        if(window.confirm('Are you sure?')){
            fetch('http://localhost:58304/api/Department/'+depid,{
                method:'DELETE',
                header:{'Accept':'application/json',
                    'Content-type': 'application/json'}
                
            })
        }
    }
    render(){
        const {deps,depid,depname} = this.state;
        let addModelClose = ()=> this.setState({addModelShow:false});
        let editModelClose = ()=> this.setState({editModelShow:false});
        return (
            <div>
            <Table className='mt-4' striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Department ID</th>
                        <th>Department Name</th>
                        <th>Option</th>
                    </tr>
                </thead>
                <tbody>
                    {deps.map(dep =>
                        <tr key ={dep.DeptID}>
                            <td>{dep.DeptID}</td>
                            <td>{dep.DeptName}</td>
                            <td>
                                <ButtonToolbar>
                                    <Button
                                    className="mr-2"
                                    variant = "info"
                                    onClick ={()=>this.setState({editModelShow:true,depid:dep.DeptID,depname:dep.DeptName})}
                                    >
                                    Edit
                                </Button>
                                <Button className='mr-2' variant='danger'
                                onClick={() => this.deleteDepartment(dep.DeptID)}
                                >
                                    Delete
                                </Button>
                                <EditDepartmentModal
                                show = {this.state.editModelShow}
                                onHide = {editModelClose}
                                depid ={depid}
                                depname ={depname}
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
                <AddDept
                 show = {this.state.addModelShow}
                 onHide ={addModelClose}
                />
            </ButtonToolbar>
            </div>
        )
    }
}