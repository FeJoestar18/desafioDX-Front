import { Layout } from './components/Layout';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { CadastroIntegrantes } from './pages/CadastroIntegrantes';
import { CadastroTimes } from './pages/CadastroTimes';
import { Times } from './pages/Times';
import { Dashboard } from './pages/Dashboard';
import { Estatisticas } from './pages/Estatisticas';
import { TimePorData } from './pages/TimePorData';
import { Cargos } from './pages/Cargos';
import { CadastroCargos } from './pages/CadastroCargos';

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/times" element={<Times />} />
          <Route path="/cargos" element={<Cargos />} />
          <Route path="/cadastro-times" element={<CadastroTimes />} />
          <Route path="/cadastro-times/:id" element={<CadastroTimes />} />
          <Route path="/cadastro-integrantes" element={<CadastroIntegrantes />} />
          <Route path="/cadastro-cargos" element={<CadastroCargos />} />
          <Route path="/cadastro-cargos/:id" element={<CadastroCargos />} />
          <Route path="/estatisticas" element={<Estatisticas />} />
          <Route path="/time-por-data" element={<TimePorData />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
