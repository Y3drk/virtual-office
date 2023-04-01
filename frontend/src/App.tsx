import { Route, Routes } from "react-router-dom";
import { Admin, Login, Office } from "./components";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<Admin />}></Route>
        <Route path="/office" element={<Office />} />
      </Routes>
    </div>
  );
};

export default App;
