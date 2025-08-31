import { createContext, useContext, useState, type ReactNode, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "./AuthContext";

export interface Note {
  _id: string;
  heading: string;
  description: string;
}

interface NotesContextType {
  notes: Note[];
  addNote: (heading: string, description: string) => void;
  deleteNote: (noteId: string) => void;
  fetchNotes: () => void;
  clearNotes: () => void;
}

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export function NotesProvider({ children }: { children: ReactNode }) {
  const [notes, setNotes] = useState<Note[]>([]);
  const { setLoading, user } = useAuth();

  const fetchNotes = async () => {
    try {
      const { data } = await axios.get("/note/show-all");
      if (data.success) {
        setNotes(data.allNotes);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch notes");
    }
  };

  // 3) fetch only after user is known (cookie ready)
  useEffect(() => {
    if (user) fetchNotes();
  }, [user]);

  const addNote = async (heading: string, description: string) => {
    try {
      const { data } = await axios.post("/note/addNote", { heading, description });
      if (data.success) {
        toast.success(data.message);
        setNotes((prev) => [...prev, { _id: data.note._id, heading, description }]);
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to add note");
    }
  };

  const deleteNote = async (noteId: string) => {
    try {
      const { data } = await axios.post("/note/deleteNote", { noteId });
      if (data.success) {
        toast.success(data.message);
        setNotes((prev) => prev.filter((n) => n._id !== noteId));
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to delete note");
    }
  };

  const clearNotes = () => setNotes([]);

  return (
    <NotesContext.Provider value={{ notes, addNote, deleteNote, fetchNotes, clearNotes }}>
      {children}
    </NotesContext.Provider>
  );
}

export function useNotes() {
  const ctx = useContext(NotesContext);
  if (!ctx) throw new Error("useNotes must be used within a NotesProvider");
  return ctx;
}
