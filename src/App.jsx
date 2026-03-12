import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Toaster } from "sonner";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import DashboardLayout from "./components/DashboardLayout";

// Pages
import Login from "./pages/Login";
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Enquiries = lazy(() => import("./pages/Enquiries"));
const Clients = lazy(() => import("./pages/Clients"));
const ChangePassword = lazy(() => import("./pages/ChangePassword"));
const Services = lazy(() => import("./pages/Services"));
const Work = lazy(() => import("./pages/Work"));
const Career = lazy(() => import("./pages/Career"));
const Contact = lazy(() => import("./pages/Contact"));

const Loading = () => (
  <div className="h-screen w-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
      <p className="text-gray-500 font-medium animate-pulse">Loading AYANSH Admin...</p>
    </div>
  </div>
);

const AppContent = () => {
  const { isLoggedIn, loading } = useAuth();

  if (loading) return <Loading />;

  return (
    <Router>
      <Toaster position="top-right" richColors />
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={isLoggedIn ? <Navigate to="/dashboard" replace /> : <Login />} />

        {/* Protected Routes */}
        <Route path="/" element={isLoggedIn ? <DashboardLayout /> : <Navigate to="/login" replace />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={
            <Suspense fallback={<Loading />}>
              <Dashboard />
            </Suspense>
          } />
          <Route path="enquiries" element={
            <Suspense fallback={<Loading />}>
              <Enquiries />
            </Suspense>
          } />
          <Route path="clients" element={
            <Suspense fallback={<Loading />}>
              <Clients />
            </Suspense>
          } />
          <Route path="change-password" element={
            <Suspense fallback={<Loading />}>
              <ChangePassword />
            </Suspense>
          } />
          <Route path="services" element={
            <Suspense fallback={<Loading />}>
              <Services />
            </Suspense>
          } />
          <Route path="work" element={
            <Suspense fallback={<Loading />}>
              <Work />
            </Suspense>
          } />
          <Route path="career" element={
            <Suspense fallback={<Loading />}>
              <Career />
            </Suspense>
          } />
          <Route path="contact" element={
            <Suspense fallback={<Loading />}>
              <Contact />
            </Suspense>
          } />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} replace />} />
      </Routes>
    </Router>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
