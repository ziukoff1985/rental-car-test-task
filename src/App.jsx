import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { fetchBrandsThunk } from "./redux/cars/operations.js";
import { useDispatch } from "react-redux";
import Layout from "./components/Layout/Layout.jsx";
import HomePage from "./pages/HomePage/HomePage.jsx";
import CatalogPage from "./pages/CatalogPage/CatalogPage.jsx";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBrandsThunk());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="catalog" element={<CatalogPage />} />
        <Route path="catalog/:id" element={<div>Car Details Page</div>} />
      </Route>
    </Routes>
  );
}

export default App;
