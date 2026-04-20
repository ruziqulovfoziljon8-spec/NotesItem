
import React, { createContext, useState, useContext, type ReactNode} from 'react';

export interface Note {
  id: string;
  title: string;
  text: string;
  category: string;
  tags: string[];
  importance: string;
  date: string;
}

interface NotesContextType {
  notes: Note[];
  addNote: (note: Omit<Note, 'id' | 'date'>) => void;
  updateNote: (id: string, note: Partial<Note>) => void;
  deleteNote: (id: string) => void;
  toggleTag: (noteId: string, tag: string) => void;
}

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export const NotesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [notes, setNotes] = useState<Note[]>([

  ]);

  const addNote = (note: Omit<Note, 'id' | 'date'>) => {
    const newNote: Note = {
      ...note,
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
    };
    setNotes([...notes, newNote]);
  };

  const updateNote = (id: string, updatedNote: Partial<Note>) => {
    setNotes(notes.map(note => 
      note.id === id ? { ...note, ...updatedNote } : note
    ));
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const toggleTag = (noteId: string, tag: string) => {
    setNotes(notes.map(note => {
      if (note.id === noteId) {
        const hasTag = note.tags.includes(tag);
        return {
          ...note,
          tags: hasTag 
            ? note.tags.filter(t => t !== tag)
            : [...note.tags, tag]
        };
      }
      return note;
    }));
  };

  return (
    <NotesContext.Provider value={{ notes, addNote, updateNote, deleteNote, toggleTag }}>
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error('useNotes must be used within NotesProvider');
  }
  return context;
};