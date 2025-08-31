import { createContext, useContext, useState, type ReactNode } from 'react';
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from './AuthContext';

const Backend_Url = import.meta.env.VITE_BACKEND_URL;

export interface Note  {
  _id: string;
  heading: string;
  description: string;
};

interface NotesContextType  {
  notes: Note[];
  addNote: (heading: string, description: string) => void;
  deleteNote: (noteId: string) => void;
  fetchNotes: () => void;   // ✅ new function
  clearNotes: () => void
};


// Notes Context
const NotesContext = createContext<NotesContextType | undefined>(undefined);

export function NotesProvider({ children }: { children: ReactNode }) {
  const [notes, setNotes] = useState<Note[]>([]);
  const { setLoading } = useAuth();

  const fetchNotes = async () => {
    try {
      const result = await axios.get(`${Backend_Url}/note/show-all`,{ withCredentials: true });
      const response = await result.data;
      // console.log(response);
      if (response.success) {
        setNotes(response.allNotes); // ✅ assuming backend sends { success, notes }
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch notes");
    }
  };

  const addNote = async (heading: string, description: string) => {
    try {
      const result = await axios.post(`${Backend_Url}/note/addNote`, { heading, description }, { withCredentials: true });
      const response = result.data;
      if(response.success) {
        toast.success(response.message);
        setNotes((prevNotes) => [...prevNotes, {_id : response.note._id, heading, description}]); // ✅ append new note
      }
    } catch (error : any) {
      console.log(error);
      toast.error(error.response.data.message)
    }
  };

  const deleteNote = async (noteId: string) => {
    try {
      const result = await axios.post(`${Backend_Url}/note/deleteNote`, { noteId }, { withCredentials: true });
      const response = result.data;
      if(response.success) {
        toast.success(response.message);
        setNotes((prevNotes) => prevNotes.filter((note) => note._id !== noteId));
      }
    } catch (error : any) {
      console.log(error);
      toast.error(error.response.data.message)
    }
  };

  const clearNotes = () => {
    setNotes([]);
  };

  const value = {
    notes,
    addNote,
    deleteNote,
    fetchNotes,
    clearNotes
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
