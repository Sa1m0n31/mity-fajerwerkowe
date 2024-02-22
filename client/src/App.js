import './static/style/style.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import ChooseArgumentsPage from "./pages/ChooseArgumentsPage";
import ResponsePage from "./pages/ResponsePage";

function App() {
  return <Router>
    <Routes>
      <Route exact path={'/'} element={<Homepage />} />
      <Route path={'/wybierz-argumenty'} element={<ChooseArgumentsPage />} />
      <Route path={'/odpowiedz/*'} element={<ResponsePage />} />
    </Routes>
  </Router>
}

export default App;
