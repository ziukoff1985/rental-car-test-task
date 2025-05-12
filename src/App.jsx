import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { fetchBrandsThunk } from "./redux/cars/operations.js";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBrandsThunk());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<div>Home Page</div>} />
      <Route path="/catalog" element={<div>Catalog Page</div>} />
      <Route path="/catalog/:id" element={<div>Car Details Page</div>} />
    </Routes>
  );
}

export default App;
