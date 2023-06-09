import './App.css';
import { BrowserRouter, Route, Routes,Navigate } from 'react-router-dom';
import Auth from './componenets/auth/auth';

import Users from './componenets/User/Users';
import Home from './componenets/Home/Home';
import Navbar from './componenets/navbar/navbar';



function App() {
  
  return (
    <div className="App">
     <BrowserRouter>
    <Navbar>
    </Navbar>
     <switch>
      <Routes>
      <Route exact path="/" element={<Home/>} ></Route>
      <Route exact path="/user/:userId"element={<Users/>}></Route>
      <Route exact  path="/auth"
         element= {localStorage.getItem("currentUser") !=null ? <Navigate  to="/"/> :<Auth/> }
      ></Route>
      
      </Routes>
     </switch>
    
     </BrowserRouter>
    </div>
  );
}

export default App;
