
import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Layout } from './components/Layout';
import Home from './pages/Home';
import SolarCalculator from './pages/Calculator';
import GroupADiagnosis from './pages/GroupADiagnosis';
import SolarApp from './pages/SolarApp';
import Contact from './pages/Contact';
import Register from './pages/Register';
import Login from './pages/Login';
import About from './pages/About';
import Services from './pages/Services';
import Blog from './pages/Blog';
import { AuthProvider, useAuth } from './context/AuthContext';

// Analytics Tracker Component
const AnalyticsTracker = () => {
  const location = useLocation();

  useEffect(() => {
    if ((window as any).gtag) {
      (window as any).gtag('config', 'G-VTS-PROJECT', {
        page_path: location.pathname + location.search,
        page_title: document.title
      });
    }
  }, [location]);

  return null;
};

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-vts-dark flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-vts-petrol border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="pt-32 pb-20 text-center min-h-screen">
    <h1 className="text-4xl font-bold text-slate-800">{title}</h1>
    <p className="mt-4 text-slate-600">Conteúdo em desenvolvimento.</p>
  </div>
);

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <AnalyticsTracker />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/calculator" element={<SolarCalculator />} />
            <Route path="/group-a" element={<GroupADiagnosis />} />
            <Route path="/app" element={
              <ProtectedRoute>
                <SolarApp />
              </ProtectedRoute>
            } />
            <Route path="/contact" element={<Contact />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/blog" element={<Blog />} />

            <Route path="/portfolio" element={<PlaceholderPage title="Portfólio de Obras" />} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
};

export default App;
