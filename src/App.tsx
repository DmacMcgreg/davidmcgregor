import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { Home } from './pages/Home';
import { Projects } from './pages/Projects';
import { Project } from './pages/Project';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<Project />} />
          {/* Language routes */}
          <Route path="/:lang" element={<Home />} />
          <Route path="/:lang/projects" element={<Projects />} />
          <Route path="/:lang/projects/:slug" element={<Project />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
