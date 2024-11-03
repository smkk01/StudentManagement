import logo from './logo.svg';
import './App.css';
import Button from 'react-bootstrap/Button'
import {Home} from './components/Home';
import {Department} from './components/Department';
import {Student} from './components/Student';
import {BrowserRouter,Switch,Route} from 'react-router-dom';
import { Navigation } from './components/Navigation';
function App() {
  return (
    <BrowserRouter>
    <div className="container">
      <h3 className='m-3 d-Flex justify-content-center'>React JS With WEB API</h3>
      <h5 className='m-3 d-Flex justify-content-center'>Student Management</h5>
     <Navigation/>
     <Switch>
      <Route path='/' component ={Home} exact/>
      <Route path='/department' component ={Department} />
      <Route path='/student' component ={Student} />
      </Switch>
    </div>
    </BrowserRouter>
  );
} 

export default App;
