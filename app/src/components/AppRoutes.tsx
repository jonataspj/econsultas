import { Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import HomePage from '../pages/HomePage';
import Page404 from '../pages/Page404';
import ClosedConsultations from '../pages/ClosedConsultations';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path='/closedconsultations' element={<ClosedConsultations />} />
        <Route path="*" element={<Page404 />} />
      </Route>
    </Routes>
  )
}