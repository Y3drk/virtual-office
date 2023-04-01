import { Route, Routes } from "react-router-dom";
import { Login, Office } from "./components";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/office" element={<Office />} />
      </Routes>
    </div>
  );
};

export default App;
