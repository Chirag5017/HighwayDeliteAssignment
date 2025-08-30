import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Dashboard } from './components/Dashboard';
import { AuthProvider, useAuth } from './context/AuthCOntext';
import { SignUp } from './components/SignUp';
import { SignIn } from './components/SignIn';
import { OTPVerification } from './components/OTPVerification';


function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  return user ? <>{children}</> : <Navigate to="/signup" replace />;
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  return !user ? <>{children}</> : <Navigate to="/dashboard" replace />;
}

function AppRoutes() {
  return (
    <Routes>
      <Route 
        path="/signup" 
        element={
          <PublicRoute>
            <SignUp />
          </PublicRoute>
        } 
      />
      <Route 
        path="/signin" 
        element={
          <PublicRoute>
            <SignIn />
          </PublicRoute>
        } 
      />
      <Route 
        path="/otp" 
        element={
          <PublicRoute>
            <OTPVerification />
          </PublicRoute>
        } 
      />
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
      <Route path="/" element={<Navigate to="/signup" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;