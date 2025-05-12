import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<div>Home Page</div>} />
      <Route path="/catalog" element={<div>Catalog Page</div>} />
      <Route path="/catalog/:id" element={<div>Car Details Page</div>} />
    </Routes>
  );
}

export default App;
