import  { createContext, useContext, useState, type ReactNode } from 'react';

export interface Note  {
  id: number;
  title: string;
  description: string;
};

interface NotesContextType  {
  notes: Note[];
  addNote: (title: string, description: string) => void;
  deleteNote: (noteId: number) => void;
};


// Notes Context
const NotesContext = createContext<NotesContextType | undefined>(undefined);

export function NotesProvider({ children }: { children: ReactNode }) {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: 1,
      title: 'Sample Note 1',
      description: 'This is a sample note description to show how the notes system works.',
    },
    {
      id: 2,
      title: 'Sample Note 2',
      description: 'Another sample note with some content to demonstrate the functionality.',
    },
  ]);

  const addNote = (title: string, description: string) => {
    const newNote: Note = {
      id: Date.now(),
      title,
      description,
    };
    setNotes((prevNotes) => [...prevNotes, newNote]);
  };

  const deleteNote = (noteId: number) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
  };

  const value = {
    notes,
    addNote,
    deleteNote,
  };

  return <NotesContext.Provider value={value}>{children}</NotesContext.Provider>;
}

export function useNotes() {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error('useNotes must be used within a NotesProvider');
  }
  return context;
}