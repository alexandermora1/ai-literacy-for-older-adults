import { HashRouter, Routes, Route } from 'react-router-dom';
import { WelcomePage } from './pages/Welcome/WelcomePage';
import { KursoversiktPage } from './pages/Kursoversikt/KursoversiktPage';
import { EmneoversiktPage } from './pages/Emneoversikt/EmneoversiktPage';
import { EmneinnholdPage } from './pages/Emneinnhold/EmneinnholdPage';
import { QuizPage } from './pages/Quiz/QuizPage';
import { QuizResultatPage } from './pages/QuizResultat/QuizResultatPage';
import { NyttMerkePage } from './pages/NyttMerke/NyttMerkePage';
import { HjelpPage } from './pages/Hjelp/HjelpPage';
import { MinFremgangPage } from './pages/MinFremgang/MinFremgangPage';
import './App.css';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/kursoversikt" element={<KursoversiktPage />} />
        <Route path="/kapittel/:id" element={<EmneoversiktPage />} />
        <Route path="/kapittel/:kapitelId/emne/:emneId" element={<EmneinnholdPage />} />
        <Route path="/kapittel/:kapitelId/quiz/:quizId" element={<QuizPage />} />
        <Route path="/kapittel/:kapitelId/quiz/:quizId/resultat" element={<QuizResultatPage />} />
        <Route path="/merke" element={<NyttMerkePage />} />
        <Route path="/hjelp" element={<HjelpPage />} />
        <Route path="/fremgang" element={<MinFremgangPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;

