import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-slate-50 flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              
              {/* Protected Routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/" element={<Dashboard />} />
              </Route>
              
              {/* Catch all - redirect to dashboard if logged in, otherwise ProtectedRoute takes care of it */}
              <Route path="*" element={<Dashboard />} />
            </Routes>
          </main>
          <footer className="py-8 text-center text-slate-400 text-sm border-t border-slate-100 bg-white">
            <p>&copy; {new Date().getFullYear()} TaskFlow SaaS. All rights reserved.</p>
          </footer>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
