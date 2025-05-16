import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout.jsx';
// import HomePage from './pages/HomePage/HomePage.jsx';
// import CatalogPage from './pages/CatalogPage/CatalogPage.jsx';
// import CarDetails from './pages/CarDetails/CarDetails.jsx';
// import FavoritesPage from './pages/FavoritesPage/FavoritesPage.jsx';
import { lazy, Suspense } from 'react';
import Loader from './components/Loader/Loader.jsx';

const HomePage = lazy(() => import('./pages/HomePage/HomePage.jsx'));
const CatalogPage = lazy(() => import('./pages/CatalogPage/CatalogPage.jsx'));
const CarDetails = lazy(() => import('./pages/CarDetails/CarDetails.jsx'));
const FavoritesPage = lazy(() =>
  import('./pages/FavoritesPage/FavoritesPage.jsx')
);

function App() {
  return (
    <Suspense fallback={<Loader loading={true} />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="catalog" element={<CatalogPage />} />
          <Route path="catalog/:id" element={<CarDetails />} />
          <Route path="favorites" element={<FavoritesPage />} />
          <Route path="*" element={<HomePage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
