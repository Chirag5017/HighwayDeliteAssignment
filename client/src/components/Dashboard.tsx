import { LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthCOntext';
import { Logo } from './Logo';

export function Dashboard() {
  const { user, logout } = useAuth();

  const dummyData = [
    { label: 'Task 1', value: 8 },
    { label: 'Task 2', value: 12 },
    { label: 'Task 3', value: 5 }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Layout */}
      <div className="md:hidden">
        <div className="bg-white p-6 border-b">
          <div className="flex items-center justify-between mb-4">
            <Logo />
            <button
              onClick={logout}
              className="text-gray-500 hover:text-gray-700"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">Dashboard</h1>
            <p className="text-sm text-gray-500">Welcome, {user?.name}!</p>
            <p className="text-xs text-gray-400">Your account is set up successfully</p>
          </div>
        </div>
        
        <div className="p-6">
          <button className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg font-medium mb-6">
            Go to Dashboard
          </button>
          
          <div className="space-y-3">
            {dummyData.map((item, index) => (
              <div key={index} className="flex justify-between items-center py-2">
                <span className="text-gray-700">{item.label}</span>
                <span className="text-gray-900 font-medium">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:block">
        <div className="flex items-center justify-between p-8">
          <Logo />
          <button
            onClick={logout}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-700"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
        
        <div className="max-w-4xl mx-auto px-8">
          <div className="bg-white rounded-lg p-8 shadow-sm">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Dashboard</h1>
            <p className="text-xl text-gray-600 mb-2">Welcome, {user?.name}!</p>
            <p className="text-gray-500 mb-8">Your account is set up successfully</p>
            
            <button className="bg-blue-500 text-white py-3 px-6 rounded-lg font-medium mb-8 hover:bg-blue-600 transition-colors">
              Go to Dashboard
            </button>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {dummyData.map((item, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">{item.label}</span>
                    <span className="text-2xl font-bold text-gray-900">{item.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}