import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MainNavigation from "./components/Navigation/MainNavigation";
import HomePage from "./components/HomePage/HomePage";
import NewUser from "./components/FormElement/NewUser";
import UpdateUser from "./components/FormElement/UpdateUser";

function App() {
  return (
    <Router>
      <MainNavigation />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/adduser" element={<NewUser />} />
          <Route path="/user/:userId" element={<UpdateUser />} />
          <Route path="/about" element={<h1>From about Page</h1>} />
          <Route path="/auth" element={<h1>From LOGIN Page</h1>} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
