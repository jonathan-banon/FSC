import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./login"; 
import SignIn from "./SignIn"; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/signIn" element={<SignIn />} />
      </Routes>
    </Router>
  );
}

export default App;
