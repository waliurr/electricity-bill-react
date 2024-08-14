import { HashRouter, Route, Routes } from "react-router-dom";

// pages import
import Home from "./pages/Home";

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
