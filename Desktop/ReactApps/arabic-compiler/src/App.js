
import { useEffect } from 'react';
import { useTranslation } from "react-i18next";
import './App.css';
import {
  BrowserRouter as Router,
  Routes, Route
} from "react-router-dom"
import Navigation from "./Navigation"
import Home from "./Home"
import Lessons from './Lessons';
import Lesson from './Lesson';
import Editor from './Editor';
import SignIn from './SignIn';
function App() {
  const { t, i18n } = useTranslation();
  
  
  
  document.body.dir = i18n.dir();
  return (
    <div>
      <Router>
      <Navigation />
      <Routes>
        <Route path="/home" element={ <Home />}>
        </Route>
        
        <Route path="/lessons" element={ <Lessons />}>
        </Route>

        <Route path="/lesson" element={ <Lesson />}>
        </Route>

        <Route path="/editor" element={ <Editor />}>
        </Route>

        <Route path="/signin" element={ <SignIn />}>
        </Route>
      </Routes>
      </Router>
      
      
    </div>
  );
}

export default App;
