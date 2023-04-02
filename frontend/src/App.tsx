import { Route, Routes } from "react-router-dom";
import { Admin, Login, Office, Chat, Archive } from "./components";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/office" element={<Office />}>
          <Route path="chat" element={<Chat />} />
          <Route path="archive" element={<Archive />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
