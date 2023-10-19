import { Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import HomePage from '../pages/HomePage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<HomePage />} />
      </Route>
    </Routes>
  )
}