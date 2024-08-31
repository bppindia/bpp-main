import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/Home/Home';
import PageNotFound from './pages/NotFound/PageNotFound';

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  </Router>
  );
}

export default App;
