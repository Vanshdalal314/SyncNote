import './App.css';
import { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import Navbar from './components/navbar'
import Home from './components/home'
import About from './components/about'
import NoteState from './context/notes/NoteState';
import Login from './components/Login';
import Signup from './components/Signup';
import Alert from './components/Alert';


function App() {
  const [alert, setAlert] = useState(null)
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null)
    }, 1500);
  }

  return (
    <>
      <NoteState>
        <Router>
          <Navbar showAlert={showAlert}/>
          <Alert alert={alert}></Alert>
          <div className="container">
            <Routes>
              <Route exact path="/"
                element={<Home showAlert={showAlert}/>}
              />
              <Route exact path="/about"
                element={<About />}
              />
              <Route exact path="/login"
                element={<Login showAlert={showAlert}/>}
              />
              <Route exact path="/signup"
                element={<Signup showAlert={showAlert}/>}
              />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
