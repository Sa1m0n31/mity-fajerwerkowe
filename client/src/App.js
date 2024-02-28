import './static/style/style.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import ChooseArgumentsPage from "./pages/ChooseArgumentsPage";
import ResponsePage from "./pages/ResponsePage";
import {useEffect, useState} from "react";

const ArgumentsContext = React.createContext([]);

function App() {
  const [argumentsSelected, setArgumentsSelected] = useState([]);

  useEffect(() => {
    const argumentsSelectedCache = localStorage.getItem('argumentsSelected');

    if(argumentsSelectedCache) {
      setArgumentsSelected(JSON.parse(argumentsSelectedCache));
    }
  }, []);

  useEffect(() => {
    if(argumentsSelected) {
      localStorage.setItem('argumentsSelected', JSON.stringify(argumentsSelected));
    }
  }, [argumentsSelected]);

  return <ArgumentsContext.Provider value={{
    argumentsSelected, setArgumentsSelected
  }}>
    <Router>
      <Routes>
        <Route exact path={'/'} element={<Homepage />} />
        <Route path={'/wybierz-argumenty'} element={<ChooseArgumentsPage />} />
        <Route path={'/odpowiedz/*'} element={<ResponsePage />} />
      </Routes>
    </Router>
  </ArgumentsContext.Provider>
}

export default App;
export { ArgumentsContext }
