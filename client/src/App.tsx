import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Dashboard } from './components/Dashboard';
import { AuthProvider, useAuth } from './context/AuthContext';
import { SignUp } from './components/SignUp';
import { SignIn } from './components/SignIn';
import { OTPVerification } from './components/OTPVerification';
import { Toaster } from 'react-hot-toast';
import { Loader } from './components/Loader';
import { NotesProvider, useNotes } from './context/NoteContext';


function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const { notes } = useNotes();
  const [delayed, setDelayed] = useState(true);

  useEffect(() => {
    let timer = setTimeout(() => setDelayed(false), 1000); // hold loader for ~0.8s
    return () => clearTimeout(timer);
  }, []);

  if (loading || delayed) return <Loader />;

  return user ? <>{children}</> : <Navigate to="/signin" replace />;
}



function PublicRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  return !user ? <>{children}</> : <Navigate to="/dashboard" replace />;
}

function AppRoutes() {
  return (
    <>
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
    <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
       <NotesProvider>
          <AppRoutes />
       </NotesProvider>
    </AuthProvider>
  );
}

export default App;