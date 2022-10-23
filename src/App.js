import { Route, Routes } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import HomePage from "./pages/home";
import BstationDefaultLayout from "./layout/BstationDefaultLayout";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />}></Route>
        </Route>
        
        <Route path="/chatrender" element={<BstationDefaultLayout />}></Route>
      </Routes>
    </div>
  );
}

export default App;
