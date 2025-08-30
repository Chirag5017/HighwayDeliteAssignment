import { Trash2, Plus, Eye, Sparkles, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNotes, type Note } from '../context/NoteContext';
import { useAuth } from '../context/AuthContext';



export function Dashboard() {
  const { user, logout } = useAuth();
  const { notes, deleteNote, fetchNotes } = useNotes();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [viewingNote, setViewingNote] = useState<Note | null>(null);

  useEffect(() => {
    fetchNotes(); // ✅ load notes when dashboard mounts
  }, []);

  const handleDeleteNote = (noteId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    deleteNote(noteId);
  };

  const handleViewNote = (note: Note) => {
    setViewingNote(note);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile */}
      <div className="sm:hidden">
        <div className="bg-white px-4 py-3 flex items-center justify-between border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-500" />
            <span className="text-lg font-medium text-gray-900">Dashboard</span>
          </div>
          <button onClick={logout} className="text-blue-500 text-sm cursor-pointer font-medium">
            Sign Out
          </button>
        </div>
        <div className="px-4 py-6 space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Welcome, {user?.name}!</h2>
            <p className="text-sm text-gray-600">Email: {user?.email}</p>
          </div>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="w-full bg-blue-500 text-white cursor-pointer py-4 rounded-xl font-medium text-base flex items-center justify-center gap-2 hover:bg-blue-600"
          >
            <Plus className="w-5 h-5" />
            Create Note
          </button>
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Notes ({notes.length})</h3>
            <div className="space-y-3">
              {notes.length === 0 ? (
                <div className="bg-white rounded-xl p-6 shadow-sm text-center">
                  <p className="text-gray-500">No notes yet. Create your first note!</p>
                </div>
              ) : (
                notes.map((note) => (
                  <div
                    key={note.id}
                    className="bg-white rounded-xl p-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => handleViewNote(note)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <h4 className="text-base font-medium text-gray-900 truncate">{note.heading}</h4>
                      </div>
                      <div className="flex items-center gap-2 ml-3">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewNote(note);
                          }}
                          className="text-blue-500 hover:text-blue-600"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => handleDeleteNote(note.id, e)}
                          className="text-gray-400 hover:text-red-500"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          <div className="fixed bottom-2 left-1/2 transform -translate-x-1/2">
            <div className="w-32 h-1 bg-black rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden sm:block">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white px-8 py-6 flex items-center justify-between border-b border-gray-100">
            <div className="flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-blue-500" />
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
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <h2 className="text-3xl font-semibold text-gray-900 mb-4">Welcome, {user?.name}!</h2>
              <p className="text-base text-gray-600">Email: {user?.email}</p>
            </div>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="bg-blue-500 text-white cursor-pointer py-4 px-8 rounded-xl font-medium text-base hover:bg-blue-600 transition-colors flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Create Note
            </button>
            <div>
              <h3 className="text-2xl font-medium text-gray-900 mb-6">Notes ({notes.length})</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {notes.length === 0 ? (
                  <div className="col-span-full bg-white rounded-xl p-8 shadow-sm text-center">
                    <p className="text-gray-500 text-lg">No notes yet. Create your first note!</p>
                  </div>
                ) : (
                  notes.map((note) => (
                    <div
                      key={note.id}
                      className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => handleViewNote(note)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <h4 className="text-lg font-medium text-gray-900 truncate mb-2">{note.heading}</h4>
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleViewNote(note);
                            }}
                            className="text-blue-500 hover:text-blue-600"
                          >
                            <Eye className="w-5 h-5" />
                          </button>
                          <button
                            onClick={(e) => handleDeleteNote(note.id, e)}
                            className="text-gray-400 hover:text-red-500"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <CreateNoteModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
      <ViewNoteModal note={viewingNote} isOpen={!!viewingNote} onClose={() => setViewingNote(null)} />
    </div>
  );
}

interface CreateNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateNoteModal({ isOpen, onClose }: CreateNoteModalProps) {
  const { addNote } = useNotes();
  const [heading, setHeading] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (heading.trim() && description.trim()) {
      addNote(heading.trim(), description.trim()); // ✅ uses context
      setHeading('');
      setDescription('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Create New Note</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Heading</label>
            <input
              type="text"
              value={heading}
              onChange={(e) => setHeading(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter note heading"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter note description"
              required
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Create Note
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

interface ViewNoteModalProps  {
  note: Note | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ViewNoteModal({ note, isOpen, onClose }: ViewNoteModalProps) {
  const { deleteNote } = useNotes();

  const handleDelete = () => {
    if (note) {
      deleteNote(note.id);
      onClose();
    }
  };

  if (!isOpen || !note) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Note Details</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Heading</label>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-gray-900">{note.heading}</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <div className="p-3 bg-gray-50 rounded-lg min-h-[100px]">
              <p className="text-gray-900 whitespace-pre-wrap">{note.description}</p>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={handleDelete}
              className="flex items-center gap-2 py-2 px-4 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
            <button
              onClick={onClose}
              className="flex-1 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
