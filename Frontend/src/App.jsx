import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchNotes, createNote, updateNote, deleteNote } from './utils/api';  // Assuming these are API functions
import NoteSidebar from './components/NoteSidebar';
import NoteDetail from './components/NoteDetail';
import Header from './components/Header';
import NoteEditor from './components/NoteEditor';

function App() {
  const [selectedNote, setSelectedNote] = useState(null);
  const [isCreatingNote, setIsCreatingNote] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const queryClient = useQueryClient();

  // React Query - Fetch notes
  const { data: notes, isLoading, isError } = useQuery({
    queryKey: ['notes'],
    queryFn: fetchNotes,
  });

  // React Query - Create a new note
  const mutationCreate = useMutation({
    mutationFn: createNote,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['notes']);
      // After creating a note, select it to keep the editor open
      setSelectedNote(data);
    },
  });

  // React Query - Update a note
  const mutationUpdate = useMutation({
    mutationFn: updateNote,
    onSuccess: () => {
      queryClient.invalidateQueries(['notes']);
      // Don't close the editor when updating
    },
  });

  // React Query - Delete a note
  const mutationDelete = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries(['notes']);
    },
  });

  const handleNoteSelect = (note) => {
    setSelectedNote(note);
    setIsCreatingNote(false);
  };

  const handleCreateNote = () => {
    setIsCreatingNote(true);
    setSelectedNote(null);
  };

  const handleSaveNote = (newNote, isAutoSave = false) => {
    if (selectedNote) {
      mutationUpdate.mutate({ ...newNote, id: selectedNote._id });
      // Don't close the editor when it's an auto-save
      if (!isAutoSave) {
        setIsCreatingNote(false);
      }
    } else {
      mutationCreate.mutate(newNote);
      // Keep creating mode active during auto-save
      if (!isAutoSave) {
        setIsCreatingNote(false);
      }
    }
  };

  const handleDeleteNote = (id) => {
    mutationDelete.mutate(id);  // Trigger delete mutation
    setSelectedNote(null);  // Optionally reset selected note after deletion
  };

  // Handle search functionality
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter notes based on search query
  const filteredNotes = notes ? notes.filter(note => {
    const query = searchQuery.toLowerCase();
    return (
      note.title.toLowerCase().includes(query) ||
      note.content.toLowerCase().includes(query)
    );
  }) : [];

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading notes.</p>;




  return (
    <>
      <Header />
      <div className="flex pt-4  bg-gray-100">
        <div className="w-1/4  text-white">
          <NoteSidebar
            notes={filteredNotes}
            onSelectNote={handleNoteSelect}
            onCreateNote={handleCreateNote}
            onSearchChange={handleSearchChange}
          />
        </div>
        <div className="w-3/4 p-8">
          {isCreatingNote || selectedNote ? (


            // Inside the return statement
            <NoteEditor
              onSaveNote={handleSaveNote}
              selectedNote={selectedNote}
              onDeleteNote={() => handleDeleteNote(selectedNote?._id)} // Pass the delete handler to NoteEditor
            />
          ) : (
            <p>Select a note to view details</p>
          )}
          {/* {selectedNote && (
            <NoteDetail note={selectedNote} onDelete={handleDeleteNote} />
          )} */}
        </div>
      </div>
    </>
  );
}

export default App;