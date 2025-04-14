import Note from '../models/Note.js';

// Get all notes
export const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find();
    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching notes: ' + err.message });
  }
};

// Create a new note
export const createNote = async (req, res) => {
  const { title, content } = req.body;

  const newNote = new Note({
    title,
    content,
  });

  try {
    const savedNote = await newNote.save();
    res.status(201).json(savedNote);
  } catch (err) {
    res.status(400).json({ message: 'Error creating note: ' + err.message });
  }
};

// Update a note by ID
export const updateNote = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  try {
    // Find the note by ID and update it
    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { title, content },
      { new: true }
    );

    if (!updatedNote) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.status(200).json(updatedNote);
  } catch (err) {
    res.status(500).json({ message: 'Error updating note: ' + err.message });
  }
};

// Delete a note by ID
export const deleteNote = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedNote = await Note.findByIdAndDelete(id);
    if (!deletedNote) {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.status(200).json({ message: 'Note deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting note: ' + err.message });
  }
};
