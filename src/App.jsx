import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/Home/Home';
import PageNotFound from './pages/NotFound/PageNotFound';
import WhyBpp from './pages/About/WhyBpp';

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/why-bpp" element={<WhyBpp />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  </Router>
  );
}

export default App;
