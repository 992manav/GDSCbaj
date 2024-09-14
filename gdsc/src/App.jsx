import { Signup } from './signup'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import { Signin } from './signin';
import { Dashboard } from './dashboard';
import { Home } from './home'
import { Create } from './create'
import { Project } from './projects'

import './App.css';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/signin" element={<Signin/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/dashboard/create" element={<Create/>}/>
          <Route path="/dashboard/projects" element={<Project/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App