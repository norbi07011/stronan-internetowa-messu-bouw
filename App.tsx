
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import LoadingScreen from './components/LoadingScreen';

// Pages
import Home from './pages/Home';
import Services from './pages/Services';
import ServiceHoutrot from './pages/ServiceHoutrot';
import ServiceTimmerwerk from './pages/ServiceTimmerwerk';
import ServiceGevel from './pages/ServiceGevel';
import ServiceRenovatie from './pages/ServiceRenovatie';
import ServiceInspecties from './pages/ServiceInspecties';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import About from './pages/About';
import NotFound from './pages/NotFound';

// Scroll helper component
const ScrollToTopHelper = () => {
    const { pathname } = useLocation();
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
};

const GenericPage: React.FC<{title: string}> = ({title}) => (
  <div className="pt-32 min-h-screen bg-navy-950 text-center px-4">
    <h1 className="text-4xl font-bold text-white mb-4">{title}</h1>
    <p className="text-slate-400">Deze pagina is in ontwikkeling.</p>
  </div>
);

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <LanguageProvider>
      <Router>
        <ScrollToTopHelper />
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/diensten" element={<Services />} />
              <Route path="/houtrotherstel" element={<ServiceHoutrot />} />
              <Route path="/timmerwerk" element={<ServiceTimmerwerk />} />
              <Route path="/gevelwerk" element={<ServiceGevel />} />
              <Route path="/renovatie" element={<ServiceRenovatie />} />
              <Route path="/inspecties" element={<ServiceInspecties />} />
              <Route path="/projecten" element={<Projects />} />
              <Route path="/over-ons" element={<About />} />
              <Route path="/faq" element={<GenericPage title="FAQ" />} />
              <Route path="/contact" element={<Contact />} />
              {/* 404 Route - must be last */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </LanguageProvider>
  );
};

export default App;
