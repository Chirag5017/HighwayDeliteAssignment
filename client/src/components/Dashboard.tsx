import { Trash2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function Dashboard() {
  const { user, logout } = useAuth();

  const notes = [
    { id: 1, title: 'Note 1' },
    { id: 2, title: 'Note 2' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Layout */}
      <div className="lg:hidden">
        {/* Header */}
        <div className="bg-white px-4 py-3 flex items-center justify-between border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
            </div>
            <span className="text-lg font-medium text-gray-900">Dashboard</span>
          </div>
          <button 
            onClick={logout}
            className="text-blue-500 text-sm cursor-pointer font-medium"
          >
            Sign Out
          </button>
        </div>

        <div className="px-4 py-6 space-y-6">
          {/* Welcome Card */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold cursor-pointer text-gray-900 mb-3">
              Welcome, Jonas Kahnwald !
            </h2>
            <p className="text-sm text-gray-600">
              Email: xxxxxx@xxxx.com
            </p>
          </div>

          {/* Create Note Button */}
          <button className="w-full bg-blue-500 text-white cursor-pointer py-4 rounded-xl font-medium text-base">
            Create Note
          </button>

          {/* Notes Section */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Notes</h3>
            <div className="space-y-3">
              {notes.map((note) => (
                <div 
                  key={note.id} 
                  className="bg-white rounded-xl p-4 shadow-sm flex items-center justify-between"
                >
                  <span className="text-base text-gray-900">{note.title}</span>
                  <button className="text-gray-400 cursor-pointer hover:text-gray-600">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Home Indicator */}
        <div className="fixed bottom-2 left-1/2 transform -translate-x-1/2">
          <div className="w-32 h-1 bg-black rounded-full"></div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-white px-8 py-6 flex items-center justify-between border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
              </div>
              <span className="text-2xl font-medium text-gray-900">Dashboard</span>
            </div>
            <button 
              onClick={logout}
              className="text-blue-500 text-base cursor-pointer font-medium hover:text-blue-600"
            >
              Sign Out
            </button>
          </div>

          <div className="px-8 py-8 space-y-8">
            {/* Welcome Card */}
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <h2 className="text-3xl font-semibold text-gray-900 mb-4">
                Welcome, Jonas Kahnwald !
              </h2>
              <p className="text-base text-gray-600">
                Email: xxxxxx@xxxx.com
              </p>
            </div>

            {/* Create Note Button */}
            <button className="bg-blue-500 text-white cursor-pointer py-4 px-8 rounded-xl font-medium text-base hover:bg-blue-600 transition-colors">
              Create Note
            </button>

            {/* Notes Section */}
            <div>
              <h3 className="text-2xl font-medium text-gray-900 mb-6">Notes</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {notes.map((note) => (
                  <div 
                    key={note.id} 
                    className="bg-white rounded-xl p-6 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow"
                  >
                    <span className="text-lg text-gray-900">{note.title}</span>
                    <button className="text-gray-400 cursor-pointer hover:text-gray-600">
                      <Trash2 className="w-6 h-6" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}