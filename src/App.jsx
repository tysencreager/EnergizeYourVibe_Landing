import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Pillars from './pages/Pillars.jsx';
import EyvMethod from './pages/EyvMethod.jsx';
import Faq from './pages/Faq.jsx';
import Events from './pages/Events.jsx';
import Shop from './pages/Shop.jsx';
import Membership from './pages/Membership.jsx';
import Terms from './pages/Terms.jsx';
import Privacy from './pages/Privacy.jsx';
import Cookies from './pages/Cookies.jsx';
import Login from './pages/Login.jsx';
import AuthCallback from './pages/AuthCallback.jsx';
import Portal from './pages/Portal.jsx';
import PortalPillar from './pages/PortalPillar.jsx';
import PortalInactive from './pages/PortalInactive.jsx';
import Assessment from './pages/Assessment.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/pillars" element={<Pillars />} />
        <Route path="/eyv-method" element={<EyvMethod />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/events" element={<Events />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/membership" element={<Membership />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/cookies" element={<Cookies />} />

        <Route path="/login" element={<Login />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route
          path="/portal/inactive"
          element={
            <ProtectedRoute requireMembership={false}>
              <PortalInactive />
            </ProtectedRoute>
          }
        />
        <Route
          path="/portal"
          element={
            <ProtectedRoute>
              <Portal />
            </ProtectedRoute>
          }
        />
        <Route
          path="/portal/assessment"
          element={
            <ProtectedRoute>
              <Assessment />
            </ProtectedRoute>
          }
        />
        <Route
          path="/portal/:pillarKey"
          element={
            <ProtectedRoute>
              <PortalPillar />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}
