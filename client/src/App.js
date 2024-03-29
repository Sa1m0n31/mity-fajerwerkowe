import './static/style/style.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import ChooseArgumentsPage from "./pages/ChooseArgumentsPage";
import ResponsePage from "./pages/ResponsePage";
import {useState} from "react";

const ArgumentsContext = React.createContext([]);

function App() {
  const [argumentsSelected, setArgumentsSelected] = useState([]);

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
