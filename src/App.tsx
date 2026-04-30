import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { KursoversiktPage } from './pages/Kursoversikt/KursoversiktPage';
import { EmneoversiktPage } from './pages/Emneoversikt/EmneoversiktPage';
import { EmneinnholdPage } from './pages/Emneinnhold/EmneinnholdPage';
import './App.css';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/kursoversikt" replace />} />
        <Route path="/kursoversikt" element={<KursoversiktPage />} />
        <Route path="/kapittel/:id" element={<EmneoversiktPage />} />
        <Route path="/kapittel/:kapitelId/emne/:emneId" element={<EmneinnholdPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;

