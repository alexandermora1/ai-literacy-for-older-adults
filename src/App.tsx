import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { KursoversiktPage } from './pages/Kursoversikt/KursoversiktPage';
import { EmneoversiktPage } from './pages/Emneoversikt/EmneoversiktPage';
import { EmneinnholdPage } from './pages/Emneinnhold/EmneinnholdPage';
import { QuizPage } from './pages/Quiz/QuizPage';
import { QuizResultatPage } from './pages/QuizResultat/QuizResultatPage';
import './App.css';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/kursoversikt" replace />} />
        <Route path="/kursoversikt" element={<KursoversiktPage />} />
        <Route path="/kapittel/:id" element={<EmneoversiktPage />} />
        <Route path="/kapittel/:kapitelId/emne/:emneId" element={<EmneinnholdPage />} />
        <Route path="/kapittel/:kapitelId/quiz/:quizId" element={<QuizPage />} />
        <Route path="/kapittel/:kapitelId/quiz/:quizId/resultat" element={<QuizResultatPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;

